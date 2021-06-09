import AST from './ast.js';
import Compound from './compound.js';
import VarDecl from './var_decl.js';

export default class Block extends AST {
    private declarations: VarDecl[][];
    private compoundStatement: Compound;

    constructor(declarations: VarDecl[][], compoundStatement: Compound) {
        super('Block');

        this.declarations = declarations;
        this.compoundStatement = compoundStatement;
    }

    getDeclarations(): VarDecl[][] {
        return this.declarations;
    }

    getCompoundStatement(): Compound {
        return this.compoundStatement;
    }
}
