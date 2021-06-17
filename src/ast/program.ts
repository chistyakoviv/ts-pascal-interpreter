import AST from './ast';
import Block from './block';

export default class Program extends AST {
    private programName: string;
    private block: Block;

    constructor(programName: string, block: Block) {
        super('Program');

        this.programName = programName;
        this.block = block;
    }

    getProgramName(): string {
        return this.programName;
    }

    getBlock(): Block {
        return this.block;
    }
}
