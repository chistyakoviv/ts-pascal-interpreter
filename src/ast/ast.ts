export default abstract class AST {
    constructor(private name: string) {}

    getName() {
        return this.name;
    }
}
