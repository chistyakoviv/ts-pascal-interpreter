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

    visitBinOp(node: BinOp): number {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return this.visit(node.getLeft()) + this.visit(node.getRight());
            case TokenType.MINUS:
                return this.visit(node.getLeft()) - this.visit(node.getRight());
            case TokenType.MULT:
                return this.visit(node.getLeft()) * this.visit(node.getRight());
            case TokenType.DIV:
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
