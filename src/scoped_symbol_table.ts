import Symb from './symbols/symbol';
import BuiltinTypeSymbol from './symbols/builtin_type_symbol';
import VarSymbol from './symbols/var_symbol';
import { TokenType } from './token'
import { TYPE_NAMES } from './ast/type';

export default class ScopedSymbolTable {
    private symbols: {[key: string]: Symb} = {};
    private scopeName: string;
    private scopeLevel: number;

    constructor(scopeName: string, scopeLevel: number) {
        this.scopeName = scopeName;
        this.scopeLevel = scopeLevel;

        this.init();
    }

    private init(): void {
        this.insert(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.INTEGER]));
        this.insert(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.REAL]));
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
