export type SymbolType = Symb | null;

export default class Symb {
    private name: string;
    private type: Symb | null

    constructor(name: string, type: SymbolType = null) {
        this.name = name;
        this.type = type;
    }

    getName(): string {
        return this.name;
    }

    getType(): SymbolType {
        return this.type;
    }

    toString(): string {
        return this.getName();
    }
}
