import Interpreter from './interpreter.js';
import readline from 'readline';
import Lexer from './lexer.js';
import Parser from './parser.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('>>> ', (text: string) => {
    const lexer = new Lexer(text);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    const result: any = interpreter.interpret();

    console.log(result);

    rl.close();
});
