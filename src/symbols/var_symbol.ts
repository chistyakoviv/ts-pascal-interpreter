import Symb from './symbol';

export default class VarSymbol extends Symb {
    constructor(name: string, type: Symb) {
        super(name, type);
    }

    toString(): string {
        return `<${this.getName()}:${this.getType()}>`;
    }
}
