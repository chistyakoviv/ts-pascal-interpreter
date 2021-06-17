import Symb from './symbol';
import VarSymbol from './var_symbol';

export default class ProcedureSymbol extends Symb {
    private params: VarSymbol[];

    constructor(name: string, params: VarSymbol[] = []) {
        super(name);

        this.params = params;
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
