import AST from './ast';
import Var from './var';
import Type from './type';

export default class VarDecl extends AST {
    private varNode: Var;
    private typeNode: Type;

    constructor(varNode: Var, typeNode: Type) {
        super('VarDecl');

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
