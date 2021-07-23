# StairCase Language

Esoteric programming language created recreationally to just add one more weird language to [Esolangs](https://esolangs.org) and learn a little bit about creating NPM packages and publishing them

While it probably has no useful usage, it is fun to code in and somehow train your brain to code in unusual ways (pretty much like [Brainfuck](https://esolangs.org/wiki/Brainfuck))

The language was built on top of JavaScript, so some JavaScript traits are built in (like: 5 % -2 = 1 instead of -1)

## Language Traits

It is not based in a stack concept, but in cells instead. Cells are like numeric variables and you choose which cell you are using by the quantity of spaces a line has before the command (hence it looks like a staircase)

- Commands are a single printable character that is not a letter or a number
- Only one command is allowed per line
- Commands have a maximum of one argument
- There are no limits for the quantity of cells, only your RAM/OS
  - If a cell without an assigned value is read, then it returns the value 0

## Commands

Commands can have [no arguments](#no-arguments), [string argument](#string-argument), [numeric argument with reference](#numeric-argument-with-reference), [numeric argument without reference](#numeric-argument-without-reference) or [line number argument](#line-number-argument)

### Empty line

End the program

### Comments - `;`

Everything after a `;` is a comment, unless in the String Literal command, where `;` will be handled as part of the text

```
; I am a comment
`5     ; I am a comment too
```

### Literals

#### Numbers - `` ` ``

Argument: [numeric without reference](#numeric-argument-without-reference)

Put a number into a cell

```
`5     ; Make the cell 0 be filled with value 5
 `3    ; Make the cell 1 be filled with value 3
```

#### Strings - `\`

Argument: [string](#string-argument)

Put the byte of each character of a string into the cells, plus an additional cell that will hold the 0 value

```
\Hello
; After the above command, cells layout will be:
; Cell 0: 72
; Cell 1: 101
; Cell 2: 108
; Cell 3: 108
; Cell 4: 111
; Cell 5: 0
```

### Copy Cell - `@`

Argument: [numeric without reference](#numeric-argument-without-reference)

Copy the content of a cell

```
`5     ; Make the cell 0 be filled with value 5
 @0    ; Make the cell 1 be the value of cell 0
```

### Print

#### Number With EOL - `"`

Argument: [no arguments](#no-arguments)

Print the cell value as a number and add the OS' EOL character(s)

```
`5     ; Make the cell 0 be filled with value 5
"      ; Print the value 5 to the STDOUT with OS' EOL character(s)
```

#### Number Without EOL - `#`

Argument: [no arguments](#no-arguments)

Print the cell value as a number

```
`5     ; Make the cell 0 be filled with value 5
#      ; Print the value 5 to the STDOUT
```

#### String With EOL - `.`

Argument: [no arguments](#no-arguments)

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index. On end, print the OS' EOL

```
\Hello
.     ; Print Hello\n to the STDOUT
```

#### String Without EOL - `,`

Argument: [no arguments](#no-arguments)

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index

```
\Hello
,     ; Print Hello to the STDOUT
```

### Input

#### Number - `$`

Argument: [no arguments](#no-arguments)

Read the STDIN as a number to the cell

```
$     ; Ask for user input and conver it to a number into cell 0
```

#### String With Size - `?`

Argument: [no arguments](#no-arguments)

Read the STDIN as string (trimmed, no EOL character(s)), store its size to the current cell and the string to the subsequent cells the same way `\` does

```
?           ; Read user input from STDIN as string
; Cell 0:     string size N
; Cell 1:     code of the first character in the string
; ...
; Cell N:     code of the last character in the string
; Cell N + 1: 0
```

#### String Without Size - `_`

Argument: [no arguments](#no-arguments)

Read the STDIN as string (trimmed, no EOL character(s)), store the string the same way `\` does

```
_           ; Read user input from STDIN as string
; Cell 0:     code of the first character in the string
; ...
; Cell N - 1: code of the last character in the string
; Cell N:     0
```

### Operations

Arithmetic and bitwise operations

#### Sum - `+`

Argument: [numeric with reference](#numeric-argument-with-reference)

Add the specified value to the current cell

```
`5     ; Make the cell 0 be filled with value 5
+3     ; Add 3 to the cell 0, that now is 8
 `7    ; Make the cell 1 be filled with value 7
+@1    ; Add cell 1 to the cell 0, that now is 15
  `9   ; Make the cell 2 be filled with value 9
+-@2   ; Add the inverse value of the cell 2
       ; Cell 2: 9, inverse: -9
       ; Cell 0 is now 6
```

#### Subtraction - `-`

Argument: [numeric with reference](#numeric-argument-with-reference)

Subtract the specified value from the current cell

```
`5     ; Make the cell 0 be filled with value 5
-3     ; Subtract 3 from the cell 0, that now is 2
--@0   ; Subtract the inverse of cell 0 from cell 0
       ; Cell 0: 2, inverse: -2
       ; Cell 0 is now 4
 `1    ; Make the cell 1 be filled with value 1
-@1    ; Subtract the value of cell 1 from cell 0
       ; Cell 0 is now 3
```

#### Multiplication - `*`

Argument: [numeric with reference](#numeric-argument-with-reference)

Multiplies the current cell by the specified value

```
`5     ; Make the cell 0 be filled with value 5
*2     ; Multiply cell 0 by 2, that now is 10
*@0    ; Multiply the cell 0 by the value of cell 0
       ; Cell 0 is now 100
*-3    ; Cell 0 is now -300
*-1    ; Cell 0 is now 300
*-@0   ; Multiply by the inverse of cell 0
       ; Cell 0: 300, inverse: -300
       ; Cell 0 is now -90000
```

#### Division - `/`

Argument: [numeric with reference](#numeric-argument-with-reference)

Divides the current cell by the specified value (unless it is 0, when it will throw an exception)

```
`5     ; Make the cell 0 be filled with value 5
/2     ; Divide cell 0 by 2, that now is 2.5
 `0.5  ; Make the cell 1 be filled with value 0.5
  `10  ; Make cell 2 be filled with value 10
  /@1  ; Divide cell 2 by value of cell 1
       ; Cell 2: 20
  /-@1 ; Divide cell 2 by the inverse of cell 1
       ; Cell 1: 0.5, inverse -0.5
       ; Cell 2 is now -40
```

#### Modulo - `%`

Argument: [numeric with reference](#numeric-argument-with-reference)

Divides the current cell by the specified value (unless it is 0, when it will throw an exception) and return the remainder of the division

```
`5     ; Make the cell 0 be filled with value 5
%2     ; Divide cell 0 by 2 and return the remainder
       ; Cell 0: 1
 `4    ; Make the cell 1 be filled with value 4
  `10  ; Make cell 2 be filled with value 10
  %@1  ; Divide cell 2 by value of cell 1 and return the remainder
       ; Cell 2: 2
  `10  ; Make cell 2 be filled with value 10
  %-@1 ; Divide cell 2 by the inverse of cell 1 and return the remainder
       ; Cell 1: 4, inverse -4
       ; Cell 2 is now 2
```

#### Bitwise AND - `&`

Argument: [numeric with reference](#numeric-argument-with-reference)

Apply the bitwise AND operator between the current cell value and the argument value

```
`5     ; Make the cell 0 be filled with value 5
&3     ; Bitwise AND between cell 0 and 3
       ; Cell 0: 1
 `5    ; Make the cell 1 be filled with value 5
 &-2   ; Bitwise AND between cell 1 and -2
       ; Cell 1: 4
```

#### Bitwise OR - `|`

Argument: [numeric with reference](#numeric-argument-with-reference)

Apply the bitwise OR operator between the current cell value and the argument value

```
`5     ; Make the cell 0 be filled with value 5
|3     ; Bitwise OR between cell 0 and 3
       ; Cell 0: 7
 `5    ; Make the cell 1 be filled with value 5
 |-2   ; Bitwise OR between cell 1 and -2
       ; Cell 1: -1
```

#### Bitwise XOR - `^`

Argument: [numeric with reference](#numeric-argument-with-reference)

Apply the bitwise XOR operator between the current cell value and the argument value

```
`5     ; Make the cell 0 be filled with value 5
^3     ; Bitwise XOR between cell 0 and 3
       ; Cell 0: 6
 `5    ; Make the cell 1 be filled with value 5
 ^-4   ; Bitwise XOR between cell 1 and -4
       ; Cell 1: -7
```

#### Bitwise NOT - `~`

Argument: [no arguments](#no-arguments)

Apply the bitwise NOT operator to the current cell value

```
`5     ; Make the cell 0 be filled with value 5
~      ; Bitwise NOT the cell 0 value
       ; Cell 0: -6
 `-10  ; Make the cell 1 be filled with value -10
 ~     ; Bitwise NOT the cell 1 value
       ; Cell 1: 9
```

#### <a id="bitwise-shift-left"></a>Bitwise Shift Left - `{`

Argument: [numeric with reference](#numeric-argument-with-reference)

Apply the bitwise SHIFT LEFT operator to the current cell value by the argument value

If the argument value is negative, then bitwise [SHIFT RIGHT](#bitwise-shift-right) will be applied to the absolute value of the argument value

```
`5     ; Make the cell 0 be filled with value 5
{2     ; Bitwise SHIFT LEFT the cell 0 value by 2
       ; Cell 0: 20
 `5    ; Make the cell 1 be filled with value 5
 {-2   ; Bitwise SHIFT RIGHT cell 1 value by 2
       ; Cell 1: 1
```

#### <a id="bitwise-shift-right"></a>Bitwise Shift Right - `}`

Argument: [numeric with reference](#numeric-argument-with-reference)

Apply the bitwise SHIFT RIGHT operator to the current cell value by the argument value

If the argument value is negative, then bitwise [SHIFT LEFT](#bitwise-shift-left) will be applied to the absolute value of the argument value

```
`5     ; Make the cell 0 be filled with value 5
}2     ; Bitwise SHIFT RIGHT the cell 0 value by 2
       ; Cell 0: 1
 `5    ; Make the cell 1 be filled with value 5
 }-2   ; Bitwise SHIFT LEFT cell 1 value by 2
       ; Cell 1: 20
```

### Branches

Argument: [line number](#line-number-argument)

Change the code execution flow based on decisions

#### <a id="branch-unconditional"></a>Unconditional - `:`

Jump to the specified line without checking any condition

```
:5     ; Jump to line 5
:+2    ; Jump to line 4
`3     ; Make the cell 0 be filled with value 3
:@0    ; Jump to line 3
```

#### Equal - `=`

If the current cell value is `0`, jump to the specified line

```
=5     ; Jump to line 5
`1     ; Make the cell 0 be filled with value 1
 `10   ; Make the cell 1 be filled with value 10
=@1    ; Do not jump to line 10, cell 0 has value 1
```

#### Different - `!`

If the current cell value is different than `0`, jump to the specified line

```
`1     ; Make the cell 0 be filled with value 1
!5     ; Jump to line 5
 !3    ; Do not jump to line 3, cell 1 has value 0
 `10   ; Make the cell 1 be filled with value 10
!@1    ; Jump to line 10
```

#### Less - `<`

If the current cell value is less than `0`, jump to the specified line

```
`-1    ; Make the cell 0 be filled with value -1
<5     ; Jump to line 5
 !3    ; Do not jump to line 3, cell 1 has value 0
 `10   ; Make the cell 1 be filled with value 10
<@1    ; Jump to line 10
```

#### Greater - `>`

If the current cell value is greater than `0`, jump to the specified line

```
`1     ; Make the cell 0 be filled with value 1
>5     ; Jump to line 5
 !3    ; Do not jump to line 3, cell 1 has value 0
 `10   ; Make the cell 1 be filled with value 10
>@1    ; Jump to line 10
```

### Random - `'`

Argument: [no argument](#no-arguments)

Place a random number between `0` (inclusive) and `1` (not inclusive) into the current cell

```
'     ; Make the cell 0 be filled with a value between [0, 1)
```

### Truncate - `(`

Argument: [no argument](#no-arguments)

Truncate the current cell value to its integer value

```
`3.14 ; Make the cell 0 be filled with value 3.14
(     ; Truncate the cell 0 value to 3
```

### Round - `)`

Argument: [no argument](#no-arguments)

Round the number to the nearest integer, regardless of its signal

```
`3.14 ; Make the cell 0 be filled with value 3.14
)     ; Round the cell 0 value to 3
`3.75 ; Make the cell 0 be filled with value 3.75
)     ; Round the cell 0 value to 4
`-2.1 ; Make the cell 0 be filled with value -2.1
)     ; Round the cell 0 value to -2
`-2.6 ; Make the cell 0 be filled with value -2.6
)     ; Round the cell 0 value to -3
```

### Subroutines

Subroutine [calls](#subroutine-call) are like [unconditional jumps](#branch-unconditional), but retain the next line of the source code (starting in 1, as humans read) inside the current cell to be able to [return](#subroutine-return) at some point

#### <a id="subroutine-call"></a>Call - `[`

Argument: [line number](#line-number-argument)

Save the next line of source code (starting in 1, as humans read) inside the current cell, then undonditionally jump to the specified line number in the argument

```
[5     ; Make the cell 0 be filled with value 2
       ; Jump to line 5
```

#### <a id="subroutine-return"></a>Return - `]`

Argument: [no argument](#no-arguments)

Unconditionally jump to the source code line stored in the current cell value

```
[5     ; Make the cell 0 be filled with with 2
       ; Jump to line 5
       ; Line 3
       ; Line 4
 `3    ; Make the cell 1 be filled with value 3
 "     ; Print the value 3 to the STDOUT with OS' EOL character(s)
]      ; Jump to line 2
```

## Arguments

The commands can take [no arguments](#no-arguments), [numeric argument with reference](#numeric-argument-with-reference), [numeric argument without reference](#numeric-argument-without-reference) or [line number argument](#line-number-argument)

### No arguments

Anything that comes after a command that doesn't require argument will throw an exception. Comments are the only thing allowed after these commands

#### Good

```
"
"; Comment
"     ; Comment
```

#### Bad

```
""
"5
"@0
```

### String Argument

Anything that comes after a command that requires a string argument will be handled as part of the string. Comments are not allowed in these commands (they will become part of the string)

#### Good

```
\I am a string
\I am also a string ; And this comment too is part of the string
```

#### Bad

None

### Numeric Argument With Reference

Anything that comes after a command that requires a numeric argument will be converted to a number. Comments are allowed

It can be an integer, a float or a [reference](#references)

#### Good

```
`5
`3     ; Three
`3.14  ; PI
`@0    ; Value of cell 0
`-@0   ; Inverse value of cell 0
```

#### Bad

```
`
`Five
``
```

### Numeric Argument Without Reference

Anything that comes after a command that requires a numeric argument will be converted to a number. Comments are allowed

It can be an integer or a float

#### Good

```
`5
`3     ; Three
`3.14  ; PI
```

#### Bad

```
`
`Five
``
`@0
`-@0
```

### Line Number Argument

Anything that comes after a command that requires a line number argument will be converted to a line number. Comments are allowed

#### Literal Line Number

It can be an integer, starting from 1, as humans read

```
:5     ; Jump to line 5
```

#### Relative Line Number

If the argument starts with `+` or `-`, it will be handled as relative

So, if the command is on line `10` and the argument is `+5`, it will result in line `15`

And, if the command is on line `20` and the argument is `-10`, it will result in line `10`

```
:+4    ; Jump to line 5
`5     ; Make the cell 0 be filled with value 5
"      ; Print the value 5 to STDOUT and exit on line below

:-3    ; Jump to line 2
```

#### Reference Line Number

If the argument starts with an `@`, it will be handled as the specified cell value

```
`5     ; Make the cell 0 be filled with value 5
 :@0   ; Jump to line 5
```

#### Relative Reference Line Number

If the arguments starts with `+@` or `-@`, it will be handled as the specified cell value relative to the current line number

For simplicity `-@` will subtract the specified cell value from the current line number, instead of returning the inverse of the cell value

```
`5     ; Make the cell 0 be filled with value 5
 `-1   ; Make the cell 1 be filled with value -1
:+@0   ; Jump to line 8
:-@1   ; Jump to line 5, not line 1
```

## References

Any command that accepts a numeric argument can use cell references, prefixing the cell number with an `@`

### Non-branch Commands

#### @N

Return the value of cell `N`

```
`5     ; Make the cell 0 be filled with value 5
 `3    ; Make the cell 1 be filled with value 3
 +@0   ; Sum the value of cell 0 into cell 1, that is now 8
```

#### -@N

Return the value of cell `N` multiplied by -1

```
`5     ; Make the cell 0 be filled with value 5
 `3    ; Make the cell 1 be filled with value 3
 +-@0  ; Sum the inverse value of cell 0 into cell 1
       ; Cell 0: 5, inverse: -5
       ; Cell 1: -2
```
### Branch Commands

#### @N

Return the value of cell `N` as the target line

```
`5     ; Make the cell 0 be filled with value 5
:@0    ; Unconditional jump to line specified by cell 0 value
       ; Go to line 5
```

#### +@N

Add the value of cell `N` to the current line number

```
`5     ; Make the cell 0 be filled with value 5
:+@0   ; Unconditional jump to current line index + the cell 0 value
       ; Go to line 7
```

#### -@N

Subtract the value of cell `N` from the current line number, instead of return the inverse of cell `N`

```
:5    ; Go to line 5
`3
"

`4     ; Make the cell 0 be filled with value 4
:-@0   ; Unconditional jump to current line index - the cell 0 value
       ; Go to line 2
```

## To Do

- Make it be possible to run inside browsers
  - Change inputs to be prompt
  - Change outputs to be console.log
    - This will lose the print without EOL versions
