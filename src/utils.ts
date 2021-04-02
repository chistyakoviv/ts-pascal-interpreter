import { CharType } from './types';

export function isNumber(value: CharType): boolean {
    return !Number.isNaN(Number(value));
}

export function bit(shift: number): number {
    return 1 << shift;
}

export function isSpace(value: CharType): boolean {
    return value === ' ';
}

export function isDot(value: CharType): boolean {
    return value === '.';
}
