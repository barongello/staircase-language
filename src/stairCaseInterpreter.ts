'use strict';

// System libraries
import { EOL } from 'os';

// 3rd party libraries
import PromptSync, { Prompt } from 'prompt-sync';

// StairCase libraries
import { StairCaseBranch } from './stairCaseBranch';
import { StairCaseCells } from './stairCaseCells';
import { StairCaseCommand } from './stairCaseCommand';
import { StairCaseOperation } from './stairCaseOperation';

export default class StairCaseInterpreter {
  #cells: StairCaseCells = {};
  #cellIndex: number = -1;
  #charIndex: number = -1;
  #currentLine: string = '';
  #lineIndex: number = -1;
  #prompt: Prompt = PromptSync({ sigint: true });
  #sourceCodeLines: string[] = [];

  constructor(sourceCodeLines: string[]) {
    this.#sourceCodeLines = sourceCodeLines;
  }

  #decreaseCharIndex(): void {
    if(this.#charIndex <= 0) {
      this.#charIndex = 0;

      return;
    }

    --this.#charIndex;
  }

  #getCell(index: number | null = null): number {
    let value: number = 0;

    if(index !== null) {
      if(isNaN(index) === true || Number.isFinite(index) === false || index < 0) {
        return 0;
      }

      value = this.#cells[index];
    }
    else if(this.#cellIndex < 0) {
      return 0;
    }
    else {
      value = this.#cells[this.#cellIndex];
    }

    if(value === void 0) {
      return 0;
    }

    return value;
  }

  #getChar(): string {
    if(this.#charIndex < 0 || this.#charIndex >= this.#currentLine.length) {
      return '';
    }

    return this.#currentLine[this.#charIndex];
  }

  #increaseCellIndex(): void {
    ++this.#cellIndex;
  }

  #increaseCharIndex(): void {
    if(this.#charIndex >= this.#currentLine.length) {
      this.#charIndex = this.#currentLine.length;

      return;
    }

    ++this.#charIndex;
  }

  #nextChar(): string {
    this.#increaseCharIndex();

    return this.#getChar();
  }

  #parseLineNumberArgument(): number {
    const text: string = this.#parseTextArgument(true);

    if(text.length === 0) {
      this.#throw('This command needs a line number');
    }

    let lineNumber: number = -1;

    if(/^@[0-9]+$/.test(text) === true) {
      const indexText: string = text.substr(1);
      const index: number = parseInt(indexText);

      // Minus one because programs counts from 0
      lineNumber = Math.trunc(this.#getCell(index)) - 1;
    }
    else if(/^[+-][0-9]+$/.test(text) === true) {
      const difference: number = parseInt(text);

      lineNumber = this.#lineIndex + difference;
    }
    else if(/^[0-9]+$/.test(text) === true) {
      const literalNumber: number = parseInt(text);

      // Minus one because programs counts from 0
      lineNumber = literalNumber - 1;
    }

    if(lineNumber < 0 || lineNumber >= this.#sourceCodeLines.length) {
      this.#throw('Specified line is out of bounds');
    }

    return lineNumber;
  }

  #parseNumberArgument(reference: boolean): number {
    const text: string = this.#parseTextArgument(true);

    if(reference === true) {
      if(/^-?@[0-9]+$/.test(text) === true) {
        let indexTextStart: number = 1;
        let multiplier: number = 1;

        if(text[0] === '-') {
          indexTextStart = 2;
          multiplier = -1;
        }

        const indexText: string = text.substr(indexTextStart);
        const index: number = parseInt(indexText);

        return this.#getCell(index) * multiplier;
      }
    }

    if(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(text) === false) {
      this.#throw('Error parsing numeric argument');
    }

    const value: number = parseFloat(text);

    return value;
  }

  #parseTextArgument(comments: boolean): string {
    const result: string = this.#currentLine.substr(this.#charIndex);

    if(comments === true) {
      return result.replace(/ *;.*$/, '');
    }

    return result;
  }

  #printChars(chars: string): void {
    process.stdout.write(chars);
  }

  #printNumber(number: number): void {
    const text: string = number.toString();

    process.stdout.write(text);
  }

  #processBranch(branch: StairCaseBranch) {
    const lineValue: number = this.#parseLineNumberArgument();
    const value: number = this.#getCell();

    let branched: boolean = false;

    switch(branch) {
      case StairCaseBranch.DIFFERENT:
        branched = (value !== 0);
        break;
      case StairCaseBranch.EQUAL:
        branched = (value === 0);
        break;
      case StairCaseBranch.GREATER:
        branched = (value > 0);
        break;
      case StairCaseBranch.LESS:
        branched = (value < 0);
        break;
      case StairCaseBranch.UNCONDITIONAL:
        branched = true;
        break;
      default:
        this.#throw('Unknown branching');
        break;
    }

    // Minus one due to auto line increment after processing command
    if(branched === true) {
      const targetLine: number = lineValue - 1;

      if(targetLine === this.#lineIndex - 1) {
        this.#throw('Branching to the same line');
      }

      this.#lineIndex = targetLine;
    }
  }

  #processCopyCell(): void {
    const indexText: string = this.#parseTextArgument(true);

    if(/^[0-9]+$/.test(indexText) === false) {
      this.#throw('Error processing cell to copy');
    }

    const index: number = parseInt(indexText);

    if(isNaN(index) === true || Number.isFinite(index) === false) {
      this.#throw('Error processing cell to copy');
    }

    const value = this.#getCell(index);

    this.#setCell(value);
  }

  #processInput(size: boolean, number: boolean): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Input command takes no arguments');
    }

    const input: string = this.#prompt('');

    if(number === true) {
      const value: number = parseFloat(input);

      if(isNaN(value) === false && Number.isFinite(value) === true) {
        this.#setCell(value);
      }
      else {
        this.#setCell(0);
      }
    }
    else if(size === true) {
      this.#setCell(input.length);

      this.#increaseCellIndex();

      this.#pushString(input);
    }
    else {
      this.#pushString(input);
    }
  }

  #processLine(): boolean {
    this.#readLine();

    if(this.#currentLine.length === 0) {
      return false;
    }

    if(/^ +$/.test(this.#currentLine) === true) {
      this.#throw('No command found');
    }

    this.#cellIndex = 0;

    let char: string = this.#getChar();

    // Space increase cell index
    while(char === ' ') {
      this.#increaseCellIndex();

      char = this.#nextChar();
    }

    this.#increaseCharIndex();

    switch(char) {
      case StairCaseCommand.BRANCH_DIFFERENT:
        this.#processBranch(StairCaseBranch.DIFFERENT);
        break;
      case StairCaseCommand.BRANCH_EQUAL:
        this.#processBranch(StairCaseBranch.EQUAL);
        break;
      case StairCaseCommand.BRANCH_GREATER:
        this.#processBranch(StairCaseBranch.GREATER);
        break;
      case StairCaseCommand.BRANCH_LESS:
        this.#processBranch(StairCaseBranch.LESS);
        break;
      case StairCaseCommand.BRANCH_UNCONDITIONAL:
        this.#processBranch(StairCaseBranch.UNCONDITIONAL);
        break;
      case StairCaseCommand.COMMENT:
        break;
      case StairCaseCommand.COPY_CELL:
        this.#processCopyCell();
        break;
      case StairCaseCommand.INPUT_NUMBER:
        this.#processInput(false, true);
        break;
      case StairCaseCommand.INPUT_STRING_WITH_SIZE:
        this.#processInput(true, false);
        break;
      case StairCaseCommand.INPUT_STRING_WITHOUT_SIZE:
        this.#processInput(false, false);
        break;
      case StairCaseCommand.LITERAL_NUMBER:
        this.#processLiteralNumber();
        break;
      case StairCaseCommand.LITERAL_STRING:
        this.#processLiteralString();
        break;
      case StairCaseCommand.OPERATION_BITWISE_AND:
        this.#processOperation(StairCaseOperation.BITWISE_AND);
        break;
      case StairCaseCommand.OPERATION_BITWISE_OR:
        this.#processOperation(StairCaseOperation.BITWISE_OR);
        break;
      case StairCaseCommand.OPERATION_BITWISE_SHIFT_LEFT:
        this.#processOperation(StairCaseOperation.BITWISE_SHIFT_LEFT);
        break;
      case StairCaseCommand.OPERATION_BITWISE_SHIFT_RIGHT:
        this.#processOperation(StairCaseOperation.BITWISE_SHIFT_RIGHT);
        break;
      case StairCaseCommand.OPERATION_BITWISE_XOR:
        this.#processOperation(StairCaseOperation.BITWISE_XOR);
        break;
      case StairCaseCommand.OPERATION_DIVIDE:
        this.#processOperation(StairCaseOperation.DIVIDE);
        break;
      case StairCaseCommand.OPERATION_MODULO:
        this.#processOperation(StairCaseOperation.MODULO);
        break;
      case StairCaseCommand.OPERATION_MULTIPLY:
        this.#processOperation(StairCaseOperation.MULTIPLY);
        break;
      case StairCaseCommand.OPERATION_NOT:
        this.#processOperation(StairCaseOperation.NOT);
        break;
      case StairCaseCommand.OPERATION_SUBTRACT:
        this.#processOperation(StairCaseOperation.SUBTRACT);
        break;
      case StairCaseCommand.OPERATION_SUM:
        this.#processOperation(StairCaseOperation.SUM);
        break;
      case StairCaseCommand.PRINT_NUMBER_WITH_EOL:
        this.#processPrintNumber(true);
        break;
      case StairCaseCommand.PRINT_NUMBER_WITHOUT_EOL:
        this.#processPrintNumber(false);
        break;
      case StairCaseCommand.PRINT_STRING_WITH_EOL:
        this.#processPrintString(true);
        break;
      case StairCaseCommand.PRINT_STRING_WITHOUT_EOL:
        this.#processPrintString(false);
        break;
      case StairCaseCommand.RANDOM:
        this.#processRandom();
        break;
      case StairCaseCommand.SUBROUTINE_CALL:
        this.#processSubroutineCall();
        break;
      case StairCaseCommand.SUBROUTINE_RETURN:
        this.#processSubroutineReturn();
        break;
      case StairCaseCommand.TRUNCATE:
        this.#processTruncate();
        break;
      default:
        // Decrease char index to properly show on error message
        this.#decreaseCharIndex();

        this.#throw('Unknown command');
        break;
    }

    return true;
  }

  #processLiteralNumber(): void {
    const number: number = this.#parseNumberArgument(false);

    if(isNaN(number) === true || Number.isFinite(number) === false) {
      this.#throw('Error processing number literal');
    }

    this.#setCell(number);
  }

  #processLiteralString(): void {
    const text: string = this.#parseTextArgument(false);

    if(text.length === 0) {
      this.#throw('Empty string literal');
    }

    this.#pushString(text);
  }

  #processOperation(operation: StairCaseOperation): void {
    let argValue: number = 0;

    if(operation === StairCaseOperation.NOT) {
      const argText: string = this.#parseTextArgument(true);

      if(argText.length > 0) {
        this.#throw('Invert command takes no arguments');
      }
    }
    else {
      argValue = this.#parseNumberArgument(true);
    }

    const currentValue: number = this.#getCell();

    let newValue: number = currentValue;

    switch(operation) {
      case StairCaseOperation.BITWISE_AND:
        newValue &= argValue;
        break;
      case StairCaseOperation.BITWISE_OR:
        newValue |= argValue;
        break;
      case StairCaseOperation.BITWISE_SHIFT_LEFT:
        if(argValue >= 0) {
          newValue <<= argValue;
        }
        else {
          newValue >>= -argValue;
        }
        break;
      case StairCaseOperation.BITWISE_SHIFT_RIGHT:
        if(argValue >= 0) {
          newValue >>= argValue;
        }
        else {
          newValue <<= -argValue;
        }
        break;
      case StairCaseOperation.BITWISE_XOR:
        newValue ^= argValue;
        break;
      case StairCaseOperation.DIVIDE:
        if(argValue === 0) {
          this.#throw('Division by zero');
        }

        newValue /= argValue;
        break;
      case StairCaseOperation.MODULO:
        if(argValue === 0) {
          this.#throw('Modulo by zero');
        }

        newValue %= argValue;
        break;
      case StairCaseOperation.MULTIPLY:
        newValue *= argValue;
        break;
      case StairCaseOperation.NOT:
        newValue = ~currentValue;
        break;
      case StairCaseOperation.SUBTRACT:
        newValue -= argValue;
        break;
      case StairCaseOperation.SUM:
        newValue += argValue;
        break;
      default:
        this.#throw('Unknown operation');
        break;
    }

    this.#setCell(newValue);
  }

  #processPrintNumber(eol: boolean): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Print number command takes no arguments');
    }

    const number: number = this.#getCell();

    this.#printNumber(number);

    if(eol === true) {
      this.#printChars(EOL);
    }
  }

  #processPrintString(eol: boolean): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Print text command takes no arguments');
    }

    let charCode: number = this.#getCell();

    while(charCode > 0 && charCode < 256) {
      const char = String.fromCharCode(charCode);

      this.#printChars(char);

      this.#increaseCellIndex();

      charCode = this.#getCell();
    }

    if(eol === true) {
      this.#printChars(EOL);
    }
  }

  #processRandom(): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Random command takes no arguments');
    }

    const value: number = Math.random();

    this.#setCell(value);
  }

  #processSubroutineCall(): void {
    const lineValue: number = this.#parseLineNumberArgument();
    const targetLine: number = lineValue - 1;

    if(targetLine === this.#lineIndex - 1) {
      this.#throw('Calling the same line');
    }

    // Plus two, one for the next line, one to be human indexed starting at 1
    const nextLine: number = this.#lineIndex + 2;

    this.#setCell(nextLine);

    this.#lineIndex = targetLine;
  }

  #processSubroutineReturn(): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Return command takes no arguments');
    }

    const returnLine: number = this.#getCell();

    // Minus two, one to remove human indexing and start at 0, one because the
    // interpreter process automatically adds one after processing a line
    const targetLine: number = returnLine - 2;

    this.#lineIndex = targetLine;
  }

  #processTruncate(): void {
    const argText: string = this.#parseTextArgument(true);

    if(argText.length > 0) {
      this.#throw('Random command takes no arguments');
    }

    const value: number = this.#getCell();
    const truncated: number = Math.trunc(value);

    this.#setCell(truncated);
  }

  #pushString(text: string): void {
    for(const letter of text) {
      this.#setCell(letter.charCodeAt(0));

      this.#increaseCellIndex();
    }

    this.#setCell(0);
  }

  #readLine(): void {
    this.#charIndex = 0;

    if(this.#lineIndex < 0 || this.#lineIndex >= this.#sourceCodeLines.length) {
      this.#currentLine = '';

      return;
    }

    this.#currentLine = this.#sourceCodeLines[this.#lineIndex];
  }

  #setCell(value: number): void {
    if(this.#charIndex < 0) {
      return;
    }

    this.#cells[this.#cellIndex] = value;
  }

  #throw(message: string): void {
    let error: string = `Error on line ${this.#lineIndex + 1} at position ${this.#charIndex + 1}:\n`;

    error += `${this.#currentLine}\n`;
    error += `${'^'.padStart(this.#charIndex + 1, ' ')}\n`;
    error += message;

    throw Error(error);
  }

  run() {
    this.#lineIndex = 0;

    while(this.#processLine() === true) {
      ++this.#lineIndex;

      if(this.#lineIndex >= this.#sourceCodeLines.length) {
        this.#throw('EOF reached without exit command');
      }
    }
  }
}
