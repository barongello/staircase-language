; Generate the random number
'
; Multiply it by 10 to make it live between 0 and 10
*10
; Truncate it to make it live between 0 and 9
(
; Add 1 to make it live between 1 and 10
+1
; Start the game
; Load the ask message
 \Type a number between 1 and 10:
; Print the ask message with new line
 .
; Wait for a number input
 $
; Truncate it to be sure it is an integer
 (
; Copy the inputed number
  @1
; Subtract 1 to check if the result is less than 0
  -1
; If the result is smaller than 0, inputed number is smaller than 1,
; jump back to ask for a number input
  <11
; Copy inputed number
  @1
; Subtract 10 to check if the result is greater than 0
  -10
; If the result is greter than 0, inputed number is greater than 10, jump back
; to ask for a number input
  >11
; Copy the inputed number
  @1
; Subtract the generated random number
  -@0
; If the result is smaller than 0, the inputed number is smaller than the
; generated random number. Jump to show message accordingly
  <+9
; If the result is greater than 0, the inputed number is greater than the
; generated random number. Jump to show message accordingly
  >+13
; If the result is equal to 0, the inputed number is equal to the generated
; random number. Jump to show message accordingly
  =+17
; Guessed a smaller number
; Load the feedback message
 \Number is bigger!
; Print the feedback message with new line
 .
; Jump back to ask for a number input
 :11
; Guessed a bigger number
; Load the feedback message
 \Number is smaller!
; Print the feedback message with new line
 .
; Jump back to ask for a number input
 :11
; Guessed correctly
; Load the feedback message
 \You guessed correctly!
; Print the feedback message with new line
 .
; End the program
