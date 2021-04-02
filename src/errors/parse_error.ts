export default class ParseError extends Error {
    constructor(messege: string = 'Error parsing input') {
        super(messege);
    }
}
