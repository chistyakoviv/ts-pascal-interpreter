export enum ARType {
    PROGRAM = 'PROGRAM',
    PROCEDURE = 'PROCEDURE',
}

export default class ActivationRecord {
    private name: string;
    private type: ARType;
    private nestingLevel: number;
    private members: {[key: string]: number} = {};

    constructor(name: string, type: ARType, nestingLevel: number) {
        this.name = name;
        this.type = type;
        this.nestingLevel = nestingLevel;
    }

    get(key: string): number {
        return this.members[key];
    }

    set(key: string, value: number): void {
        this.members[key] = value;
    }

    toString(): string {
        const lines = [
            `${this.nestingLevel}: ${this.type} ${this.name}`
        ];

        Object.entries(this.members)
            .forEach(entry => lines.push(`      ${entry[0]}: ${entry[1]}`));

        return lines.join('\n');
    }
}
