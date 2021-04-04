import AST from './ast';
import Token from '../token';

export default class BinOp extends AST {
    private left: AST;
    private right: AST;
    private op: Token;

    constructor(left: AST, op: Token, right: AST) {
        super('BinOp');

        this.left = left;
        this.right = right;
        this.op = op;
    }

    getLeft(): AST {
        return this.left;
    }

    getRight(): AST {
        return this.right;
    }

    getOp(): Token {
        return this.op;
    }
}
