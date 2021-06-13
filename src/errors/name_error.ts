export default class NameError extends Error {
    constructor(varName: string) {
        super(`Unexpected token ${varName}`);
    }
}
