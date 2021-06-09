import Token from '../token.js';
import { TokenValue } from '../types.js';
import AST from './ast.js';

export default class Type extends AST {
    private token: Token;

    constructor(token: Token) {
        super('Type');

        this.token = token;
    }

    getValue(): TokenValue {
        return this.token.getValue();
    }
}
