import AST from './ast';
import Token from '../token';
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
