import AST from './ast.js';
import Token from '../token.js';

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
