import Symb from './symbols/symbol';
import BuiltinTypeSymbol from './symbols/builtin_type_symbol';
import VarSymbol from './symbols/var_symbol';
import { TokenType } from './token'
import { TYPE_NAMES } from './ast/type';

export default class ScopedSymbolTable {
    private symbols: {[key: string]: Symb} = {};
    private scopeName: string;
    private scopeLevel: number;
    private enclosingScope: ScopedSymbolTable | undefined;

    constructor(scopeName: string, scopeLevel: number, enclosingScope: ScopedSymbolTable | undefined = undefined) {
        this.scopeName = scopeName;
        this.scopeLevel = scopeLevel;
        this.enclosingScope = enclosingScope;

        this.init();
    }

    private init(): void {
        this.insert(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.INTEGER]));
        this.insert(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.REAL]));
    }

    getEnclosingScope(): ScopedSymbolTable | undefined {
        return this.enclosingScope;
    }

    getLevel(): number {
        return this.scopeLevel;
    }

    getName(): string {
        return this.scopeName;
    }

    insert(symb: Symb): void {
        symb.setScopeLevel(this.scopeLevel);
        this.symbols[symb.getName()] = symb;
    }

    lookup(name: string, currentScopeOnly: boolean = false): Symb | null {
        if (this.symbols[name])
            return this.symbols[name];

        if (currentScopeOnly)
            return null;

        if (this.enclosingScope)
            return this.enclosingScope.lookup(name);

        return null;
    }

    toString(): string {
        return this.symbols.toString();
    }
}
