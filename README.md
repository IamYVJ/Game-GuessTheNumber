# Game-GuessTheNumber

This is a simple implementation of *The Guessing Game*

The project is live here — *[Game-GuessTheNumber](https://game-guessthenumber.herokuapp.com/)*

## Working
The game works as follows:
 - The score starts with `100` 
 - A random number is selected between between `1` and `1000`
 -  The user guesses a number
 -  If the guess is right, **the user wins the game**
 -  If the guess is wrong, **high** or **low** is displayed according to the random number and the guess
 -  For every wrong guess, `10` is deducted from the score
 - If the score reaches 0 before the user can guess the right number, the game is **over**
 - The user can play again by clicking **Again!**
 - A **High Score** record is maintained on the page

## Theory
It is possible to guess the number in a maximum of 5 attempts. The logic for this is based on the *[Bisection Method](https://en.wikipedia.org/wiki/Bisection_method)*, which is also used in *[Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm)*

The range of possible numbers is between `1` and `1000`, both inclusive. This gives us 1000 consecutive numbers. By the divide and check approach, we can divide the possible numbers into two halves every time, checking which half the random number belongs in.

The maximum number of possible attempts to reach the number using this approach is:
⌈ log<sub>2</sub>1000 ⌉ = 10


## Credits
The sample code and inspiration for this project has been taken from *Jonas Schmedtmann*'s excellent course - *The Complete JavaScript Course 2022: From Zero to Expert!* on *udemy*

