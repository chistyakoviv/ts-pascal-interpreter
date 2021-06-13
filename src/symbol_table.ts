import Symb from './symbols/symbol.js';
import BuiltinTypeSymbol from './symbols/builtin_type_symbol.js';
import VarSymbol from './symbols/var_symbol.js';
import { TokenType } from './token.js'
import { TYPE_NAMES } from './ast/type.js';

export default class SymbolTable {
    private symbols: {[key: string]: Symb} = {};

    constructor() {
        this.init();
    }

    private init(): void {
        this.define(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.INTEGER]));
        this.define(new BuiltinTypeSymbol(TYPE_NAMES[TokenType.REAL]));
    }

    define(symb: Symb): void {
        this.symbols[symb.getName()] = symb;
    }

    lookup(name: string): Symb | null {
        return this.symbols[name] ? this.symbols[name] : null;
    }

    toString(): string {
        return this.symbols.toString();
    }
}
