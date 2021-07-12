'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.StairCaseCommand = void 0;
var StairCaseCommand;
(function (StairCaseCommand) {
    StairCaseCommand["BRANCH_DIFFERENT"] = "!";
    StairCaseCommand["BRANCH_EQUAL"] = "=";
    StairCaseCommand["BRANCH_GREATER"] = ">";
    StairCaseCommand["BRANCH_LESS"] = "<";
    StairCaseCommand["BRANCH_UNCONDITIONAL"] = ":";
    StairCaseCommand["COMMENT"] = ";";
    StairCaseCommand["COPY_CELL"] = "@";
    StairCaseCommand["INPUT_NUMBER"] = "$";
    StairCaseCommand["INPUT_STRING_WITH_SIZE"] = "?";
    StairCaseCommand["INPUT_STRING_WITHOUT_SIZE"] = "_";
    StairCaseCommand["LITERAL_NUMBER"] = "`";
    StairCaseCommand["LITERAL_STRING"] = "\\";
    StairCaseCommand["OPERATION_BITWISE_AND"] = "&";
    StairCaseCommand["OPERATION_BITWISE_OR"] = "|";
    StairCaseCommand["OPERATION_BITWISE_SHIFT_LEFT"] = "{";
    StairCaseCommand["OPERATION_BITWISE_SHIFT_RIGHT"] = "}";
    StairCaseCommand["OPERATION_BITWISE_XOR"] = "^";
    StairCaseCommand["OPERATION_DIVIDE"] = "/";
    StairCaseCommand["OPERATION_MODULO"] = "%";
    StairCaseCommand["OPERATION_MULTIPLY"] = "*";
    StairCaseCommand["OPERATION_NOT"] = "~";
    StairCaseCommand["OPERATION_SUBTRACT"] = "-";
    StairCaseCommand["OPERATION_SUM"] = "+";
    StairCaseCommand["PRINT_NUMBER_WITH_EOL"] = "\"";
    StairCaseCommand["PRINT_NUMBER_WITHOUT_EOL"] = "#";
    StairCaseCommand["PRINT_STRING_WITH_EOL"] = ".";
    StairCaseCommand["PRINT_STRING_WITHOUT_EOL"] = ",";
    StairCaseCommand["RANDOM"] = "'";
    StairCaseCommand["ROUND"] = ")";
    StairCaseCommand["SUBROUTINE_CALL"] = "[";
    StairCaseCommand["SUBROUTINE_RETURN"] = "]";
    StairCaseCommand["TRUNCATE"] = "(";
})(StairCaseCommand = exports.StairCaseCommand || (exports.StairCaseCommand = {}));
;
