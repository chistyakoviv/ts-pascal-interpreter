import AST from './ast.js';
import Token from '../token.js';
import Var from './var';

export default class Assign extends AST {
    private left: Var;
    private right: AST;
    private op: Token;

    constructor(left: Var, op: Token, right: AST) {
        super('Assign');

        this.left = left;
        this.right = right;
        this.op = op;
    }

    getLeft(): Var {
        return this.left;
    }

    getRight(): AST {
        return this.right;
    }

    getOp(): Token {
        return this.op;
    }
}
