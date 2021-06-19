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
        this.symbols[symb.getName()] = symb;
    }

    lookup(name: string): Symb | null {
        return this.symbols[name] ? this.symbols[name] : null;
    }

    toString(): string {
        return this.symbols.toString();
    }
}
