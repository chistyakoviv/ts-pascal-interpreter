import AST from '../ast/ast';
import Token from '../token';

export default class UnaryOp extends AST {
    private op: Token;
    private node: AST;

    constructor(op: Token, node: AST) {
        super('UnaryOp');

        this.op = op;
        this.node = node;
    }

    getOp(): Token {
        return this.op;
    }

    getNode(): AST {
        return this.node;
    }
}
