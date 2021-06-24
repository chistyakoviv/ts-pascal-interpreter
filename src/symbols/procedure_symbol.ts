import Block from '../ast/block';
import Symb from './symbol';
import VarSymbol from './var_symbol';

export default class ProcedureSymbol extends Symb {
    private params: VarSymbol[];
    private blockAST: Block | null = null;

    constructor(name: string, params: VarSymbol[] = []) {
        super(name);

        this.params = params;
    }

    getBlock(): Block | null {
        return this.blockAST;
    }

    setBlock(block: Block) {
        this.blockAST = block;
    }

    getParams(): VarSymbol[] {
        return this.params;
    }

    addParam(param: VarSymbol): void {
        this.params.push(param);
    }

    toString(): string {
        return `<${this.getName()}, params=[${this.getParams().join(', ')}]>`;
    }
}
