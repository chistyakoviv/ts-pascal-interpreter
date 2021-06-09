import AST from './ast.js';
import Var from './var.js';
import Type from './type.js';

export default class VarDecl extends AST {
    private varNode: Var;
    private typeNode: Type;

    constructor(varNode: Var, typeNode: Type) {
        super('VarDecl');

        this.varNode = varNode;
        this.typeNode = typeNode;
    }
}
