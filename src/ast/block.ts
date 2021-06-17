import AST from './ast';
import Compound from './compound';
import VarDecl from './var_decl';

export default class Block extends AST {
    private declarations: (AST[] | AST)[];
    private compoundStatement: Compound;

    constructor(declarations: (AST[] | AST)[], compoundStatement: Compound) {
        super('Block');

        this.declarations = declarations;
        this.compoundStatement = compoundStatement;
    }

    getDeclarations(): (AST[] | AST)[] {
        return this.declarations;
    }

    getCompoundStatement(): Compound {
        return this.compoundStatement;
    }
}
