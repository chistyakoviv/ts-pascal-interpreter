import AST from './ast/ast';
import BinOp from './ast/binop';
import Num from './ast/Num';
import ParseError from './errors/parse_error';
import Parser from './parser';
import { TokenType } from './token';
import { TokenValue } from './types';

abstract class NodeVisitor {
    visit(node: AST): number {
        const method = `visit${node.getName()}`;

        if (!(this as any)[method])
            throw new Error(`No ${method} method`);

        return (this as any)[method](node);
    }
}

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
