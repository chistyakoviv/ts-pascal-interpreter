import AST from './ast.js';
import Var from './var.js';
import Type from './type.js';

export default class Param extends AST {
    private varNode: Var;
    private typeNode: Type;

    constructor(varNode: Var, typeNode: Type) {
        super('Param');

        this.varNode = varNode;
        this.typeNode = typeNode;
    }

    getTypeNode(): Type {
        return this.typeNode;
    }

    getVarNode(): Var {
        return this.varNode;
    }
}
