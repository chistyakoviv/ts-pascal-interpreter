import Symb from './symbol';

export default class BuiltinTypeSymbol extends Symb {
    constructor(name: string) {
        super(name);
    }

    toString(): string {
        return this.getName();
    }
}
