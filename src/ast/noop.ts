import AST from './ast.js';

export default class NoOp extends AST {
    constructor() {
        super('NoOp');
    }
}
