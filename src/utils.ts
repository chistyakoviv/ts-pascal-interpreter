import { CharType } from './types.js';

export function isNumber(value: CharType): boolean {
    return !Number.isNaN(Number(value)) && value !== null;
}

export function bit(shift: number): number {
    return 1 << shift;
}

export function isSpace(value: CharType): boolean {
    return value === ' ' || value === '\n';
}

export function isDot(value: CharType): boolean {
    return value === '.';
}

export function isAlNum(value: CharType): boolean {
    return value !== null && /^\w+$/.test(value);
}

export function isAlpha(value: CharType): boolean {
    return value !== null && /^[A-Za-z]+$/.test(value);
}
