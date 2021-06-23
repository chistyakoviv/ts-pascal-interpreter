import Interpreter from './interpreter';
import readline from 'readline';
import Lexer from './lexer';
import Parser from './parser';
import SemanticAnalyzer from './visitors/semantic_analyzer';

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
    // const semanticAnalyzer = new SemanticAnalyzer();
    const interpreter = new Interpreter(parser);
    const result: any = interpreter.interpret();

    console.log(interpreter.getCallStack());

    rl.close();
});
