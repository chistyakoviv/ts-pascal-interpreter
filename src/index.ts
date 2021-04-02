import Interpreter from './interpreter.js';
import readline from 'readline';
import Lexer from './lexer.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('>>> ', (text: string) => {
    const interpreter = new Interpreter(new Lexer(text));
    const result: any = interpreter.expr();

    console.log(result);

    rl.close();
});
