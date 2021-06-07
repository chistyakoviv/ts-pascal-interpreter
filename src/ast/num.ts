import Token from '../token.js';
import { TokenValue } from '../types.js';
import AST from './ast.js';

export default class Num extends AST {
    private token: Token;

    constructor(token: Token) {
        super('Num');

        this.token = token;
    }

    getValue(): TokenValue {
        return this.token.getValue();
    }
}
