import BinOp from './ast/binop';
import Num from './ast/num';
import ParseError from './errors/parse_error';
import NodeVisitor from './node_visitor';
import Parser from './parser';
import { TokenType } from './token';
import { TokenValue } from './types';

export default class Interpreter extends NodeVisitor {
    private parser: Parser;

    constructor(parser: Parser) {
        super();

        this.parser = parser;
    }

    visitNum(node: Num): number {
        return node.getValue() as number;
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

    interpret(): TokenValue {
        const tree = this.parser.parse();
        return this.visit(tree);
    }
}
