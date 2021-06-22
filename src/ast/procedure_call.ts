import Token from '../token';
import AST from './ast';
import Param from'./param';

export default class ProcedureCall extends AST {
    private procName: string;
    private actualParams: AST[];
    private token: Token;

    constructor(procName: string, actualParams: AST[], token: Token) {
        super('ProcedureCall');

        this.procName = procName;
        this.actualParams = actualParams;
        this.token = token;
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
