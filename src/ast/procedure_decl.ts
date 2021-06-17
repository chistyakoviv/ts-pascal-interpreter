import AST from './ast';
import Block from './block';
import Param from'./param';

export default class ProcedureDecl extends AST {
    private procName: string;
    private params: Param[];
    private blockNode: Block;

    constructor(procName: string, params: Param[], blockNode: Block) {
        super('ProcedureDecl');

        this.procName = procName;
        this.params = params;
        this.blockNode = blockNode;
    }

    getProcName(): string {
        return this.procName;
    }

    getParams(): Param[] {
        return this.params;
    }

    getBlock(): Block {
        return this.blockNode;
    }
}
