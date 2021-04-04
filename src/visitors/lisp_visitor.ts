import NodeVisitor from '../node_visitor';
import Parser from '../parser';
import Num from '../ast/num';
import BinOp from '../ast/binop';
import { TokenType } from '../token';
import ParseError from '../errors/parse_error'

export default class LispVisitor extends NodeVisitor {
    private parser: Parser;

    constructor(parser: Parser) {
        super();

        this.parser = parser;
    }

    visitNum(node: Num): string {
        return `${node.getValue()}`;
    }

    visitBinOp(node: BinOp): string {
        switch (node.getOp().getType()) {
            case TokenType.PLUS:
                return `(+ ${this.visit(node.getLeft())} ${this.visit(node.getRight())})`;
            case TokenType.MINUS:
                return `(- ${this.visit(node.getLeft())} ${this.visit(node.getRight())})`;
            case TokenType.MULT:
                return `(* ${this.visit(node.getLeft())} ${this.visit(node.getRight())})`;
            case TokenType.DIV:
                return `(/ ${this.visit(node.getLeft())} ${this.visit(node.getRight())})`;
        }

        throw new ParseError();
    }

    interpret(): string {
        const tree = this.parser.parse();
        return `${this.visit(tree)}`;
    }
}
