import AST from './ast.js';
import Block from './block.js';

export default class ProcedureDecl extends AST {
    private procName: string;
    private blockNode: Block;

    constructor(procName: string, blockNode: Block) {
        super('ProcedureDecl');

        this.procName = procName;
        this.blockNode = blockNode;
    }

    getProcName(): string {
        return this.procName;
    }

    getBlock(): Block {
        return this.blockNode;
    }
}
