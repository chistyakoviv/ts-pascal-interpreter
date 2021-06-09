import Assign from './ast/assign.js';
import BinOp from './ast/binop.js';
import Compound from './ast/compound.js';
import Num from './ast/num.js';
import Var from './ast/var.js';
import UnaryOp from './ast/unaryop.js';
import ParseError from './errors/parse_error.js';
import NameError from './errors/name_error.js';
import NodeVisitor from './node_visitor.js';
import Parser from './parser.js';
import { TokenType } from './token.js';
import { TokenValue } from './types.js';
import NoOp from './ast/noop.js';
import Program from './ast/program.js';
import Block from './ast/block.js';
import VarDecl from './ast/var_decl.js';
import Type from './ast/type.js';

export default class Interpreter extends NodeVisitor {
    private parser: Parser;
    private globalScope: {[key: string]: number} = {};

    constructor(parser: Parser) {
        super();

        this.parser = parser;
    }

    getGlobalScope(): {[key: string]: number} {
        return this.globalScope;
    }

    visitProgram(node: Program): void {
        this.visit(node.getBlock());
    }

    visitBlock(node: Block): void {
        node.getDeclarations()
            .forEach(decl => decl.forEach(node => this.visit(node)));

        this.visit(node.getCompoundStatement());
    }

    visitVarDecl(node: VarDecl) {}

    visitType(node: Type) {}

    visitBinOp(node: BinOp): number {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return this.visit(node.getLeft()) + this.visit(node.getRight());
            case TokenType.MINUS:
                return this.visit(node.getLeft()) - this.visit(node.getRight());
            case TokenType.MULT:
                return this.visit(node.getLeft()) * this.visit(node.getRight());
            case TokenType.INTEGER_DIV:
                return Math.floor(this.visit(node.getLeft()) / this.visit(node.getRight()));
            case TokenType.FLOAT_DIV:
                return this.visit(node.getLeft()) / this.visit(node.getRight());
        }

        throw new ParseError();
    }

    visitNum(node: Num): number {
        return node.getValue() as number;
    }

    visitUnaryOp(node: UnaryOp): number {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return +this.visit(node.getNode());
            case TokenType.MINUS:
                return -this.visit(node.getNode());
        }

        throw new ParseError();
    }

    visitCompound(node: Compound): void {
        node.getChildren().forEach(child => this.visit(child));
    }

    visitAssign(node: Assign): void {
        this.globalScope[node.getLeft().getValue() as string] = this.visit(node.getRight());
    }

    visitVar(node: Var): number {
        const varName = node.getValue();

        if (varName === null)
            throw new NameError('null');

        const val = this.globalScope[varName];

        if (!val)
            throw new NameError(varName as string);

        return val;
    }

    visitNoOp(node: NoOp): void {}

    interpret(): TokenValue {
        const tree = this.parser.parse();
        return this.visit(tree);
    }
}
