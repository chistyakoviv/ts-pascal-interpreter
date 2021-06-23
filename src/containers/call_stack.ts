export default class CallStack<T> {
    private records: T[] = [];

    push(activationRecord: T): void {
        this.records.push(activationRecord);
    }

    pop(): T | undefined {
        return this.records.pop();
    }

    peek(): T | undefined {
        return this.records[this.records.length - 1];
    }

    toString(): string {
        return this.records.reverse().join('\n');
    }
}
