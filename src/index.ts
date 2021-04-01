import Interpreter from './interpreter.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('>>> ', (text: string) => {
    const interpreter = new Interpreter(text);
    const result: number = interpreter.expr();

    console.log(result);

    rl.close();
});
