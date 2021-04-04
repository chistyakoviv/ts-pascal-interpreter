import Token, { TokenType } from './token';
import ParseError from './errors/parse_error';
import Lexer from './lexer';
import AST from './ast/ast';
import BinOp from './ast/binop';
import Num from './ast/num';
import UnaryOp from './ast/unaryop';

export default class Interpreter {
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

    factor(): AST {
        const token = this.currentToken;

        switch (token.getType()) {
            case TokenType.PLUS:
                this.eat(TokenType.PLUS);
                return new UnaryOp(token, this.factor());
            case TokenType.MINUS:
                this.eat(TokenType.MINUS);
                return new UnaryOp(token, this.factor());
            case TokenType.NUMBER:
                this.eat(TokenType.NUMBER);
                return new Num(token);
            case TokenType.LPAREN:
                this.eat(TokenType.LPAREN);
                const node: AST = this.expr();
                this.eat(TokenType.RPAREN);
                return node;
        }

        throw new ParseError();
    }

    term(): AST {
        let node: AST = this.factor();

        while (this.currentToken.getType() & (TokenType.MULT | TokenType.DIV)) {
            const op: Token = this.currentToken;

            switch (this.currentToken.getType()) {
                case TokenType.MULT:
                    this.eat(TokenType.MULT);
                    break;
                case TokenType.DIV:
                    this.eat(TokenType.DIV);
                    break;
            }

            node = new BinOp(node, op, this.factor());
        }

        return node;
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

    parse(): AST {
        return this.expr();
    }
}
