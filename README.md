# StairCase Language

Esoteric programming language created recreationally to just add one more weird language to [Esolangs](https://esolangs.org) and learn a little bit about creating NPM packages and publishing them

While it probably has no useful usage, it is fun to code in and somehow train your brain to code in unusual ways (pretty much like [Brainf*ck](https://esolangs.org/wiki/Brainfuck))

The language was built on top of JavaScript, so some JavaScript traits are built in (like: 5 % -2 = 1 instead of -1)

## Language Traits

It is not based in a stack concept, but in cells instead. Cells are like numeric variables and you choose which cell you are using by the quantity of spaces a line has before the command (hence it looks like a staircase)

- Only one command is allowed per line 
- There are no limits for the quantity of cells, only your RAM/OS
  - If a cell without an assigned value is read, then it returns the value 0
- Empty line terminates the program

## Commands

### Comments - `;`

Everything after a `;` is a comment, unless in the String Literal command, where `;`will be handled as part of the text

```
; I am a comment
`5     ; I am a comment too
```

### Literals

#### Numbers - `` ` ``
Put a number into a cell

```
`5     ; Make the cell 0 hold the value 5
 `3    ; Make the cell 1 hold the value 3
```

#### Strings - `\`

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

Copy the content of a cell

```
`5     ; Make the cell 0 be filled with value 5
 @0    ; Make the cell 1 be the value of cell 0
```

### Print

#### Number With EOL - `"`

Print the cell value as a number and add the OS' EOL character(s)

```
`5     ; Make the cell 0 be filled with value 5
"      ; Print the value 5 to the STDOUT with OS' EOL character(s)
```

#### Number Without EOL - `#`

Print the cell value as a number

```
`5     ; Make the cell 0 be filled with value 5
#      ; Print the value 5 to the STDOUT
```

#### String With EOL - `.`

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index. On end, print the OS' EOL

```
\Hello
.     ; Print Hello\n to the STDOUT
```

#### String Without EOL - `,`

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index

```
\Hello
,     ; Print Hello to the STDOUT
```

### Input

#### Number - `$`

Read the STDIN as a number to the cell

```
$     ; Ask for user input and conver it to a number into cell 0
```

#### String With Size - `?`

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

Read the STDIN as string (trimmed, no EOL character(s)), store the string the same way `\` does

```
_           ; Read user input from STDIN as string
; Cell 0:     code of the first character in the string
; ...
; Cell N - 1: code of the last character in the string
; Cell N:     0
```

### Operations

#### Sum - `+`

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

Divides the current cell by the specified value (unless it is 0)

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

## References

Any command that accepts a numeric argument can use cell references, prefixing the cell number with an `@`

### Non-branch Commands

#### @N

Return the value of cell N

```
`5     ; Make the cell 0 be filled with value 5
 `3    ; Make the cell 1 be filled with value 3
 +@0   ; Sum the value of cell 0 into cell 1, that is now 8
```

#### -@N

Return the value of cell N multiplied by -1

```
`5     ; Make the cell 0 be filled with value 5
 `3    ; Make the cell 1 be filled with value 3
 +-@0  ; Sum the inverse value of cell 0 into cell 1
       ; Cell 0: 5, inverse: -5
       ; Cell 1: -2
```
### Branch Commands

#### @N

Return the value of cell N as the target line

```
`5     ; Make the cell 0 be filled with value 5
:@0    ; Unconditional jump to line specified by cell 0 value
       ; Go to line 5
```

#### +@N

Add the value of cell N to the current line number

```
`5     ; Make the cell 0 be filled with value 5
:+@0   ; Unconditional jump to current line index + the cell 0 value
       ; Go to line 7
```

#### -@N

Subtract the value of cell N from the current line number

```
:5    ; Go to line 5
`3
"

`4     ; Make the cell 0 be filled with value 4
:-@0   ; Unconditional jump to current line index - the cell 0 value
       ; Go to line 2
```
