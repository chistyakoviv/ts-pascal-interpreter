import Interpreter from './interpreter.js';
import readline from 'readline';
import Lexer from './lexer.js';
import Parser from './parser.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('>>> ', (text: string) => {
    const test = `
        BEGIN

            BEGIN
                number := 2;
                a := number;
                b := 10 * a + 10 * number / 4;
                c := a - - b
            END;

            x := 11;
        END.
    `;

    const lexer = new Lexer(test);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    const result: any = interpreter.interpret();

    console.log(interpreter.getGlobalScope());

    rl.close();
});
