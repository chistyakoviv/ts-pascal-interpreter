import AST from './ast.js';
import Block from './block.js';

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
