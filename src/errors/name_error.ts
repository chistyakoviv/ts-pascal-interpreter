export default class NameError extends Error {
    constructor(varName: string) {
        super(`Invalid variable name ${varName}`);
    }
}
