export type SymbolType = Symb | null;

export default class Symb {
    private name: string;
    private type: Symb | null;
    private scopeLevel: number = 0;

    constructor(name: string, type: SymbolType = null) {
        this.name = name;
        this.type = type;
    }

    getScopeLevel(): number {
        return this.scopeLevel;
    }

    setScopeLevel(level: number): void {
        this.scopeLevel = level;
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
