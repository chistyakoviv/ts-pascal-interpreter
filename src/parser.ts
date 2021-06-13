import Token, { TokenType } from './token.js';
import ParseError from './errors/parse_error.js';
import Lexer from './lexer.js';
import AST from './ast/ast.js';
import BinOp from './ast/binop.js';
import Num from './ast/num.js';
import UnaryOp from './ast/unaryop.js';
import Compound from './ast/compound.js';
import Assign from './ast/assign.js';
import Var from './ast/var.js';
import NoOp from './ast/noop.js';
import Program from './ast/program';
import Block from './ast/block.js';
import VarDecl from './ast/var_decl.js';
import Type from './ast/type.js';
import ProcedureDecl from './ast/procedure_decl.js';

export default class Parser {
    private lexer: Lexer;
    private currentToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    eat(tokenType: TokenType): void {
        if (!(this.currentToken.getType() & tokenType))
            throw new ParseError();

        this.currentToken = this.lexer.getNextToken();
    }

    program(): Program {debugger;
        this.eat(TokenType.PROGRAM);
        const varNode = this.variable();
        const progName = varNode.getValue() as string;
        this.eat(TokenType.SEMI);
        const blockNode = this.block();
        const programNode = new Program(progName, blockNode);
        this.eat(TokenType.DOT);
        return programNode;
    }

    block(): Block {
        const declarationNodes = this.declarations();
        const compoundStatementNode = this.compoundStatement();
        return new Block(declarationNodes, compoundStatementNode);
    }

    declarations(): (AST[] | AST)[] {
        const declarations = [];

        if (this.currentToken.getType() === TokenType.VAR) {
            this.eat(TokenType.VAR);

            while (this.currentToken.getType() === TokenType.ID) {
                const varDecl: VarDecl[] = this.variableDeclaration();
                declarations.push(varDecl);
                this.eat(TokenType.SEMI);
            }
        }

        while (this.currentToken.getType() === TokenType.PROCEDURE) {
            this.eat(TokenType.PROCEDURE);
            const procName = this.currentToken.getValue() as string;
            this.eat(TokenType.ID);
            this.eat(TokenType.SEMI);
            const blockNode = this.block();
            const procDecl = new ProcedureDecl(procName, blockNode);
            declarations.push(procDecl);
            this.eat(TokenType.SEMI);
        }

        return declarations;
    }

    variableDeclaration(): VarDecl[] {
        const varNodes = [new Var(this.currentToken)];
        this.eat(TokenType.ID);

        while (this.currentToken.getType() === TokenType.COMMA) {
            this.eat(TokenType.COMMA);
            varNodes.push(new Var(this.currentToken));
            this.eat(TokenType.ID);
        }

        this.eat(TokenType.COLON);

        const typeNode = this.typeSpec();
        return varNodes.map(node => new VarDecl(node, typeNode));
    }

    typeSpec(): Type {
        const token = this.currentToken;

        switch (this.currentToken.getType()) {
            case TokenType.INTEGER:
                this.eat(TokenType.INTEGER);
                break;
            case TokenType.REAL:
                this.eat(TokenType.REAL);
                break;
        }

        return new Type(token);
    }

    compoundStatement(): Compound {
        this.eat(TokenType.BEGIN);
        const nodes = this.statementList();
        this.eat(TokenType.END);

        const root = new Compound();
        for (let i = 0; i < nodes.length; i++)
            root.push(nodes[i]);

        return root;
    }

    statementList(): AST[] {
        const result = [this.statement()];

        while (this.currentToken.getType() === TokenType.SEMI) {
            this.eat(TokenType.SEMI);
            result.push(this.statement());
        }

        if (this.currentToken.getType() === TokenType.ID)
            throw new ParseError();

        return result;
    }

    statement(): AST {
        let node: AST;

        switch (this.currentToken.getType()) {
            case TokenType.BEGIN:
                node = this.compoundStatement();
                break;
            case TokenType.ID:
                node = this.assignmentStatement();
                break;
            default:
                node = this.empty();
        }

        return node;
    }

    assignmentStatement(): AST {
        const left = this.variable();
        this.eat(TokenType.ASSIGN);
        const right = this.expr();
        return new Assign(left, this.currentToken, right);
    }

    variable(): Var {
        const node = new Var(this.currentToken);
        this.eat(TokenType.ID);
        return node;
    }

    empty(): AST {
        return new NoOp();
    }

    term(): AST {
        let node: AST = this.factor();

        while (this.currentToken.getType() & (TokenType.MULT | TokenType.INTEGER_DIV | TokenType.FLOAT_DIV)) {
            const op: Token = this.currentToken;

            switch (this.currentToken.getType()) {
                case TokenType.MULT:
                    this.eat(TokenType.MULT);
                    break;
                case TokenType.INTEGER_DIV:
                    this.eat(TokenType.INTEGER_DIV);
                    break;
                case TokenType.FLOAT_DIV:
                    this.eat(TokenType.FLOAT_DIV);
                    break;
            }

            node = new BinOp(node, op, this.factor());
        }

        return node;
    }

    factor(): AST {
        const token = this.currentToken;

        switch (token.getType()) {
            case TokenType.PLUS:
                this.eat(TokenType.PLUS);
                return new UnaryOp(token, this.factor());
            case TokenType.MINUS:
                this.eat(TokenType.MINUS);
                return new UnaryOp(token, this.factor());
            case TokenType.INTEGER_CONST:
                this.eat(TokenType.INTEGER_CONST);
                return new Num(token);
            case TokenType.REAL_CONST:
                this.eat(TokenType.REAL_CONST);
                return new Num(token);
            case TokenType.LPAREN:
                this.eat(TokenType.LPAREN);
                const node: AST = this.expr();
                this.eat(TokenType.RPAREN);
                return node;
            default: return this.variable();
        }
    }

    expr(): AST {
        let node: AST = this.term();

        while (this.currentToken.getType() & (TokenType.PLUS | TokenType.MINUS)) {
            const op: Token = this.currentToken;

            switch (this.currentToken.getType()) {
                case TokenType.PLUS:
                    this.eat(TokenType.PLUS);
                    break;
                case TokenType.MINUS:
                    this.eat(TokenType.MINUS);
                    break;
            }

            node = new BinOp(node, op, this.term());
        }

        return node;
    }

    parse(): Program {
        const node = this.program();

        if (this.currentToken.getType() !== TokenType.EOF)
            throw new ParseError();

        return node;
    }
}
