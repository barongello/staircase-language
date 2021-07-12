# StairCase Language

Esoteric programming language created recreationally to just add one more weird language to [Esolangs](https://esolangs.org) and learn a little bit about creating NPM packages and publishing them

While it probably has no useful usage, it is fun to code in and somehow train your brain to code in unusual ways (pretty much like Brainf*ck)

The language was built on top of JavaScript, so some JavaScript traits are built in (like: 5 % -2 = 1 instead of -1)

## Language Traits

It is not based in a stack concept, but in cells instead. Cells are like numeric variables and you choose which cell you are using by the quantity of spaces a line has before the command (hence it looks like a staircase)

- Only one command is allowed per line 
- There are no limits for the quantity of cells, only your RAM/OS
  - If a cell without an assigned value is read, then it returns the value 0

## Commands

### Comments - ;

Everything after a `;` is a comment, unless in the String Literal command, where `;`will be handled as part of the text

```
; I am a comment
`5     ; I am a comment too
```

### Numeric Literals - `

Put a number into a cell

```
`5     ; Make the cell 0 hold the value 5
 `3    ; Make the cell 1 hold the value 3
```

### String Literals - \

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

### Copy Cell - @

Copy the content of a cell

```
`5     ; Make the cell 0 be filled with value 5
 @0    ; Make the cell 1 be the value of cell 0
```

### Print Number With EOL - "

Print the cell value as a number and add the OS' EOL character(s)

```
`5     ; Make the cell 0 be filled with value 5
"      ; Print the value 5 to the STDOUT with OS' EOL character(s)
```

### Print Number Without EOL - \#

Print the cell value as a number

```
`5     ; Make the cell 0 be filled with value 5
#      ; Print the value 5 to the STDOUT
```

### Print String With EOL - .

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index. On end, print the OS' EOL

```
\Hello
.     ; Print Hello\n to the STDOUT
```

### Print String Without EOL - ,

While the cell value is `0 < value < 256`, print the character that this value represents and increase the cell index

```
\Hello
,     ; Print Hello to the STDOUT
```

### Input Number - $

Read the STDIN as a number to the cell

```
$     ; Ask for user input and conver it to a number into cell 0
```

### Input String With Size - ?

Read the STDIN as string (trimmed, no EOL character(s)), store its size to the current cell and the string to the subsequent cells the same way `\` does

```
?           ; Read user input from STDIN as string
; Cell 0:     string size N
; Cell 1:     code of the first character in the string
; ...
; Cell N:     code of the last character in the string
; Cell N + 1: 0
```

### Input String Without Size - _

Read the STDIN as string (trimmed, no EOL character(s)), store the string the same way `\` does

```
_           ; Read user input from STDIN as string
; Cell 0:     code of the first character in the string
; ...
; Cell N - 1: code of the last character in the string
; Cell N:     0
```