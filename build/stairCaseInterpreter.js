'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _StairCaseInterpreter_instances, _StairCaseInterpreter_cells, _StairCaseInterpreter_cellIndex, _StairCaseInterpreter_charIndex, _StairCaseInterpreter_currentLine, _StairCaseInterpreter_lineIndex, _StairCaseInterpreter_prompt, _StairCaseInterpreter_sourceCodeLines, _StairCaseInterpreter_decreaseCharIndex, _StairCaseInterpreter_getCell, _StairCaseInterpreter_getChar, _StairCaseInterpreter_increaseCellIndex, _StairCaseInterpreter_increaseCharIndex, _StairCaseInterpreter_nextChar, _StairCaseInterpreter_parseLineNumberArgument, _StairCaseInterpreter_parseNumberArgument, _StairCaseInterpreter_parseTextArgument, _StairCaseInterpreter_printChars, _StairCaseInterpreter_printNumber, _StairCaseInterpreter_processBranch, _StairCaseInterpreter_processCopyCell, _StairCaseInterpreter_processInput, _StairCaseInterpreter_processLine, _StairCaseInterpreter_processLiteralNumber, _StairCaseInterpreter_processLiteralString, _StairCaseInterpreter_processOperation, _StairCaseInterpreter_processPrintNumber, _StairCaseInterpreter_processPrintString, _StairCaseInterpreter_processRandom, _StairCaseInterpreter_processSubroutineCall, _StairCaseInterpreter_processSubroutineReturn, _StairCaseInterpreter_processTruncate, _StairCaseInterpreter_pushString, _StairCaseInterpreter_readLine, _StairCaseInterpreter_setCell, _StairCaseInterpreter_throw;
Object.defineProperty(exports, "__esModule", { value: true });
// System libraries
const os_1 = require("os");
// 3rd party libraries
const prompt_sync_1 = __importDefault(require("prompt-sync"));
// StairCase libraries
const stairCaseBranch_1 = require("./stairCaseBranch");
const stairCaseCommand_1 = require("./stairCaseCommand");
const stairCaseOperation_1 = require("./stairCaseOperation");
class StairCaseInterpreter {
    constructor(sourceCodeLines) {
        _StairCaseInterpreter_instances.add(this);
        _StairCaseInterpreter_cells.set(this, {});
        _StairCaseInterpreter_cellIndex.set(this, -1);
        _StairCaseInterpreter_charIndex.set(this, -1);
        _StairCaseInterpreter_currentLine.set(this, '');
        _StairCaseInterpreter_lineIndex.set(this, -1);
        _StairCaseInterpreter_prompt.set(this, prompt_sync_1.default({ sigint: true }));
        _StairCaseInterpreter_sourceCodeLines.set(this, []);
        __classPrivateFieldSet(this, _StairCaseInterpreter_sourceCodeLines, sourceCodeLines, "f");
    }
    run() {
        __classPrivateFieldSet(this, _StairCaseInterpreter_lineIndex, 0, "f");
        while (__classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processLine).call(this) === true) {
            __classPrivateFieldSet(this, _StairCaseInterpreter_lineIndex, +__classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") + 1, "f");
            if (__classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") >= __classPrivateFieldGet(this, _StairCaseInterpreter_sourceCodeLines, "f").length) {
                __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'EOF reached without exit command');
            }
        }
    }
}
exports.default = StairCaseInterpreter;
_StairCaseInterpreter_cells = new WeakMap(), _StairCaseInterpreter_cellIndex = new WeakMap(), _StairCaseInterpreter_charIndex = new WeakMap(), _StairCaseInterpreter_currentLine = new WeakMap(), _StairCaseInterpreter_lineIndex = new WeakMap(), _StairCaseInterpreter_prompt = new WeakMap(), _StairCaseInterpreter_sourceCodeLines = new WeakMap(), _StairCaseInterpreter_instances = new WeakSet(), _StairCaseInterpreter_decreaseCharIndex = function _StairCaseInterpreter_decreaseCharIndex() {
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") <= 0) {
        __classPrivateFieldSet(this, _StairCaseInterpreter_charIndex, 0, "f");
        return;
    }
    __classPrivateFieldSet(this, _StairCaseInterpreter_charIndex, +__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") - 1, "f");
}, _StairCaseInterpreter_getCell = function _StairCaseInterpreter_getCell(index = null) {
    let value = 0;
    if (index !== null) {
        if (isNaN(index) === true || Number.isFinite(index) === false || index < 0) {
            return 0;
        }
        value = __classPrivateFieldGet(this, _StairCaseInterpreter_cells, "f")[index];
    }
    else if (__classPrivateFieldGet(this, _StairCaseInterpreter_cellIndex, "f") < 0) {
        return 0;
    }
    else {
        value = __classPrivateFieldGet(this, _StairCaseInterpreter_cells, "f")[__classPrivateFieldGet(this, _StairCaseInterpreter_cellIndex, "f")];
    }
    if (value === void 0) {
        return 0;
    }
    return value;
}, _StairCaseInterpreter_getChar = function _StairCaseInterpreter_getChar() {
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") < 0 || __classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") >= __classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f").length) {
        return '';
    }
    return __classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f")[__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f")];
}, _StairCaseInterpreter_increaseCellIndex = function _StairCaseInterpreter_increaseCellIndex() {
    __classPrivateFieldSet(this, _StairCaseInterpreter_cellIndex, +__classPrivateFieldGet(this, _StairCaseInterpreter_cellIndex, "f") + 1, "f");
}, _StairCaseInterpreter_increaseCharIndex = function _StairCaseInterpreter_increaseCharIndex() {
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") >= __classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f").length) {
        __classPrivateFieldSet(this, _StairCaseInterpreter_charIndex, __classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f").length, "f");
        return;
    }
    __classPrivateFieldSet(this, _StairCaseInterpreter_charIndex, +__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") + 1, "f");
}, _StairCaseInterpreter_nextChar = function _StairCaseInterpreter_nextChar() {
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCharIndex).call(this);
    return __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getChar).call(this);
}, _StairCaseInterpreter_parseLineNumberArgument = function _StairCaseInterpreter_parseLineNumberArgument() {
    const text = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (text.length === 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'This command needs a line number');
    }
    let lineNumber = -1;
    if (/^@[0-9]+$/.test(text) === true) {
        const indexText = text.substr(1);
        const index = parseInt(indexText);
        // Minus one because programs counts from 0
        lineNumber = Math.trunc(__classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this, index)) - 1;
    }
    else if (/^[+-][0-9]+$/.test(text) === true) {
        const difference = parseInt(text);
        lineNumber = __classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") + difference;
    }
    else if (/^[0-9]+$/.test(text) === true) {
        const literalNumber = parseInt(text);
        // Minus one because programs counts from 0
        lineNumber = literalNumber - 1;
    }
    if (lineNumber < 0 || lineNumber >= __classPrivateFieldGet(this, _StairCaseInterpreter_sourceCodeLines, "f").length) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Specified line is out of bounds');
    }
    return lineNumber;
}, _StairCaseInterpreter_parseNumberArgument = function _StairCaseInterpreter_parseNumberArgument(reference) {
    const text = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (reference === true) {
        if (/^-?@[0-9]+$/.test(text) === true) {
            let indexTextStart = 1;
            let multiplier = 1;
            if (text[0] === '-') {
                indexTextStart = 2;
                multiplier = -1;
            }
            const indexText = text.substr(indexTextStart);
            const index = parseInt(indexText);
            return __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this, index) * multiplier;
        }
    }
    if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(text) === false) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Error parsing numeric argument');
    }
    const value = parseFloat(text);
    return value;
}, _StairCaseInterpreter_parseTextArgument = function _StairCaseInterpreter_parseTextArgument(comments) {
    const result = __classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f").substr(__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f"));
    if (comments === true) {
        return result.replace(/ *;.*$/, '');
    }
    return result;
}, _StairCaseInterpreter_printChars = function _StairCaseInterpreter_printChars(chars) {
    process.stdout.write(chars);
}, _StairCaseInterpreter_printNumber = function _StairCaseInterpreter_printNumber(number) {
    const text = number.toString();
    process.stdout.write(text);
}, _StairCaseInterpreter_processBranch = function _StairCaseInterpreter_processBranch(branch) {
    const lineValue = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseLineNumberArgument).call(this);
    const value = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    let branched = false;
    switch (branch) {
        case stairCaseBranch_1.StairCaseBranch.DIFFERENT:
            branched = (value !== 0);
            break;
        case stairCaseBranch_1.StairCaseBranch.EQUAL:
            branched = (value === 0);
            break;
        case stairCaseBranch_1.StairCaseBranch.GREATER:
            branched = (value > 0);
            break;
        case stairCaseBranch_1.StairCaseBranch.LESS:
            branched = (value < 0);
            break;
        case stairCaseBranch_1.StairCaseBranch.UNCONDITIONAL:
            branched = true;
            break;
        default:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Unknown branching');
            break;
    }
    // Minus one due to auto line increment after processing command
    if (branched === true) {
        const targetLine = lineValue - 1;
        if (targetLine === __classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") - 1) {
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Branching to the same line');
        }
        __classPrivateFieldSet(this, _StairCaseInterpreter_lineIndex, targetLine, "f");
    }
}, _StairCaseInterpreter_processCopyCell = function _StairCaseInterpreter_processCopyCell() {
    const indexText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (/^[0-9]+$/.test(indexText) === false) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Error processing cell to copy');
    }
    const index = parseInt(indexText);
    if (isNaN(index) === true || Number.isFinite(index) === false) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Error processing cell to copy');
    }
    const value = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this, index);
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, value);
}, _StairCaseInterpreter_processInput = function _StairCaseInterpreter_processInput(size, number) {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Input command takes no arguments');
    }
    const input = __classPrivateFieldGet(this, _StairCaseInterpreter_prompt, "f").call(this, '');
    if (number === true) {
        const value = parseFloat(input);
        if (isNaN(value) === false && Number.isFinite(value) === true) {
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, value);
        }
        else {
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, 0);
        }
    }
    else if (size === true) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, input.length);
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCellIndex).call(this);
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_pushString).call(this, input);
    }
    else {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_pushString).call(this, input);
    }
}, _StairCaseInterpreter_processLine = function _StairCaseInterpreter_processLine() {
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_readLine).call(this);
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f").length === 0) {
        return false;
    }
    if (/^ +$/.test(__classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f")) === true) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'No command found');
    }
    __classPrivateFieldSet(this, _StairCaseInterpreter_cellIndex, 0, "f");
    let char = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getChar).call(this);
    // Space increase cell index
    while (char === ' ') {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCellIndex).call(this);
        char = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_nextChar).call(this);
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCharIndex).call(this);
    switch (char) {
        case stairCaseCommand_1.StairCaseCommand.BRANCH_DIFFERENT:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processBranch).call(this, stairCaseBranch_1.StairCaseBranch.DIFFERENT);
            break;
        case stairCaseCommand_1.StairCaseCommand.BRANCH_EQUAL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processBranch).call(this, stairCaseBranch_1.StairCaseBranch.EQUAL);
            break;
        case stairCaseCommand_1.StairCaseCommand.BRANCH_GREATER:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processBranch).call(this, stairCaseBranch_1.StairCaseBranch.GREATER);
            break;
        case stairCaseCommand_1.StairCaseCommand.BRANCH_LESS:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processBranch).call(this, stairCaseBranch_1.StairCaseBranch.LESS);
            break;
        case stairCaseCommand_1.StairCaseCommand.BRANCH_UNCONDITIONAL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processBranch).call(this, stairCaseBranch_1.StairCaseBranch.UNCONDITIONAL);
            break;
        case stairCaseCommand_1.StairCaseCommand.COMMENT:
            break;
        case stairCaseCommand_1.StairCaseCommand.COPY_CELL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processCopyCell).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.INPUT_NUMBER:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processInput).call(this, false, true);
            break;
        case stairCaseCommand_1.StairCaseCommand.INPUT_STRING_WITH_SIZE:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processInput).call(this, true, false);
            break;
        case stairCaseCommand_1.StairCaseCommand.INPUT_STRING_WITHOUT_SIZE:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processInput).call(this, false, false);
            break;
        case stairCaseCommand_1.StairCaseCommand.LITERAL_NUMBER:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processLiteralNumber).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.LITERAL_STRING:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processLiteralString).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_BITWISE_AND:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.BITWISE_AND);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_BITWISE_OR:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.BITWISE_OR);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_BITWISE_SHIFT_LEFT:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.BITWISE_SHIFT_LEFT);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_BITWISE_SHIFT_RIGHT:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.BITWISE_SHIFT_RIGHT);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_BITWISE_XOR:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.BITWISE_XOR);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_DIVIDE:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.DIVIDE);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_MODULO:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.MODULO);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_MULTIPLY:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.MULTIPLY);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_NOT:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.NOT);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_SUBTRACT:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.SUBTRACT);
            break;
        case stairCaseCommand_1.StairCaseCommand.OPERATION_SUM:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processOperation).call(this, stairCaseOperation_1.StairCaseOperation.SUM);
            break;
        case stairCaseCommand_1.StairCaseCommand.PRINT_NUMBER_WITH_EOL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processPrintNumber).call(this, true);
            break;
        case stairCaseCommand_1.StairCaseCommand.PRINT_NUMBER_WITHOUT_EOL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processPrintNumber).call(this, false);
            break;
        case stairCaseCommand_1.StairCaseCommand.PRINT_STRING_WITH_EOL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processPrintString).call(this, true);
            break;
        case stairCaseCommand_1.StairCaseCommand.PRINT_STRING_WITHOUT_EOL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processPrintString).call(this, false);
            break;
        case stairCaseCommand_1.StairCaseCommand.RANDOM:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processRandom).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.SUBROUTINE_CALL:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processSubroutineCall).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.SUBROUTINE_RETURN:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processSubroutineReturn).call(this);
            break;
        case stairCaseCommand_1.StairCaseCommand.TRUNCATE:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_processTruncate).call(this);
            break;
        default:
            // Decrease char index to properly show on error message
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_decreaseCharIndex).call(this);
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Unknown command');
            break;
    }
    return true;
}, _StairCaseInterpreter_processLiteralNumber = function _StairCaseInterpreter_processLiteralNumber() {
    const number = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseNumberArgument).call(this, false);
    if (isNaN(number) === true || Number.isFinite(number) === false) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Error processing number literal');
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, number);
}, _StairCaseInterpreter_processLiteralString = function _StairCaseInterpreter_processLiteralString() {
    const text = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, false);
    if (text.length === 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Empty string literal');
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_pushString).call(this, text);
}, _StairCaseInterpreter_processOperation = function _StairCaseInterpreter_processOperation(operation) {
    let argValue = 0;
    if (operation === stairCaseOperation_1.StairCaseOperation.NOT) {
        const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
        if (argText.length > 0) {
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Invert command takes no arguments');
        }
    }
    else {
        argValue = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseNumberArgument).call(this, true);
    }
    const currentValue = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    let newValue = currentValue;
    switch (operation) {
        case stairCaseOperation_1.StairCaseOperation.BITWISE_AND:
            newValue &= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.BITWISE_OR:
            newValue |= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.BITWISE_SHIFT_LEFT:
            if (argValue >= 0) {
                newValue <<= argValue;
            }
            else {
                newValue >>= -argValue;
            }
            break;
        case stairCaseOperation_1.StairCaseOperation.BITWISE_SHIFT_RIGHT:
            if (argValue >= 0) {
                newValue >>= argValue;
            }
            else {
                newValue <<= -argValue;
            }
            break;
        case stairCaseOperation_1.StairCaseOperation.BITWISE_XOR:
            newValue ^= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.DIVIDE:
            if (argValue === 0) {
                __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Division by zero');
            }
            newValue /= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.MODULO:
            if (argValue === 0) {
                __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Modulo by zero');
            }
            newValue %= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.MULTIPLY:
            newValue *= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.NOT:
            newValue = ~currentValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.SUBTRACT:
            newValue -= argValue;
            break;
        case stairCaseOperation_1.StairCaseOperation.SUM:
            newValue += argValue;
            break;
        default:
            __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Unknown operation');
            break;
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, newValue);
}, _StairCaseInterpreter_processPrintNumber = function _StairCaseInterpreter_processPrintNumber(eol) {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Print number command takes no arguments');
    }
    const number = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_printNumber).call(this, number);
    if (eol === true) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_printChars).call(this, os_1.EOL);
    }
}, _StairCaseInterpreter_processPrintString = function _StairCaseInterpreter_processPrintString(eol) {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Print text command takes no arguments');
    }
    let charCode = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    while (charCode > 0 && charCode < 256) {
        const char = String.fromCharCode(charCode);
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_printChars).call(this, char);
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCellIndex).call(this);
        charCode = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    }
    if (eol === true) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_printChars).call(this, os_1.EOL);
    }
}, _StairCaseInterpreter_processRandom = function _StairCaseInterpreter_processRandom() {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Random command takes no arguments');
    }
    const value = Math.random();
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, value);
}, _StairCaseInterpreter_processSubroutineCall = function _StairCaseInterpreter_processSubroutineCall() {
    const lineValue = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseLineNumberArgument).call(this);
    const targetLine = lineValue - 1;
    if (targetLine === __classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") - 1) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Calling the same line');
    }
    // Plus two, one for the next line, one to be human indexed starting at 1
    const nextLine = __classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") + 2;
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, nextLine);
    __classPrivateFieldSet(this, _StairCaseInterpreter_lineIndex, targetLine, "f");
}, _StairCaseInterpreter_processSubroutineReturn = function _StairCaseInterpreter_processSubroutineReturn() {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Return command takes no arguments');
    }
    const returnLine = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    // Minus two, one to remove human indexing and start at 0, one because the
    // interpreter process automatically adds one after processing a line
    const targetLine = returnLine - 2;
    __classPrivateFieldSet(this, _StairCaseInterpreter_lineIndex, targetLine, "f");
}, _StairCaseInterpreter_processTruncate = function _StairCaseInterpreter_processTruncate() {
    const argText = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_parseTextArgument).call(this, true);
    if (argText.length > 0) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_throw).call(this, 'Random command takes no arguments');
    }
    const value = __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_getCell).call(this);
    const truncated = Math.trunc(value);
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, truncated);
}, _StairCaseInterpreter_pushString = function _StairCaseInterpreter_pushString(text) {
    for (const letter of text) {
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, letter.charCodeAt(0));
        __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_increaseCellIndex).call(this);
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_instances, "m", _StairCaseInterpreter_setCell).call(this, 0);
}, _StairCaseInterpreter_readLine = function _StairCaseInterpreter_readLine() {
    __classPrivateFieldSet(this, _StairCaseInterpreter_charIndex, 0, "f");
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") < 0 || __classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") >= __classPrivateFieldGet(this, _StairCaseInterpreter_sourceCodeLines, "f").length) {
        __classPrivateFieldSet(this, _StairCaseInterpreter_currentLine, '', "f");
        return;
    }
    __classPrivateFieldSet(this, _StairCaseInterpreter_currentLine, __classPrivateFieldGet(this, _StairCaseInterpreter_sourceCodeLines, "f")[__classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f")], "f");
}, _StairCaseInterpreter_setCell = function _StairCaseInterpreter_setCell(value) {
    if (__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") < 0) {
        return;
    }
    __classPrivateFieldGet(this, _StairCaseInterpreter_cells, "f")[__classPrivateFieldGet(this, _StairCaseInterpreter_cellIndex, "f")] = value;
}, _StairCaseInterpreter_throw = function _StairCaseInterpreter_throw(message) {
    let error = `Error on line ${__classPrivateFieldGet(this, _StairCaseInterpreter_lineIndex, "f") + 1} at position ${__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") + 1}:\n`;
    error += `${__classPrivateFieldGet(this, _StairCaseInterpreter_currentLine, "f")}\n`;
    error += `${'^'.padStart(__classPrivateFieldGet(this, _StairCaseInterpreter_charIndex, "f") + 1, ' ')}\n`;
    error += message;
    throw Error(error);
};
