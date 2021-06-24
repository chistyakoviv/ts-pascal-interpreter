import ProcedureSymbol from '../symbols/procedure_symbol';
import Token from '../token';
import AST from './ast';

export default class ProcedureCall extends AST {
    private procName: string;
    private actualParams: AST[];
    private token: Token;
    private procSymbol: ProcedureSymbol | null = null;

    constructor(procName: string, actualParams: AST[], token: Token) {
        super('ProcedureCall');

        this.procName = procName;
        this.actualParams = actualParams;
        this.token = token;
    }

    getProcSymbol(): ProcedureSymbol | null {
        return this.procSymbol;
    }

    setProcSymbol(procSymbol: ProcedureSymbol): void {
        this.procSymbol = procSymbol;
    }

    getProcName(): string {
        return this.procName;
    }

    getActualParams(): AST[] {
        return this.actualParams;
    }

    getToken(): Token {
        return this.token;
    }
}
