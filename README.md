# Game-GuessTheNumber

This is a simple implementation of *The Guessing Game*

The project is live here — *[Game-GuessTheNumber](https://iamyvj.github.io/Game-GuessTheNumber/)*

## Working
The game works as follows:
 - The score starts with `100`
 - A random number is selected between `1` and `1000`
 -  The user guesses a number
 -  Guesses outside the `1`–`1000` range are rejected
 -  If the guess is right, **the user wins the game**
 -  If the guess is wrong, **high** or **low** is displayed according to the random number and the guess
 -  For every wrong guess, `5` is deducted from the score, giving `20` attempts
 - If the score reaches `0` before the user can guess the right number, the game is **over**
 - The user can play again by clicking **Again!**
 - A **High Score** record is maintained on the page and persists across sessions via `localStorage`
 - An **Optimal play** toggle can be enabled to reveal the best number to guess next and the maximum guesses still needed to be sure of winning

## Theory
It is possible to guess the number in a maximum of 10 attempts. The logic for this is based on the *[Bisection Method](https://en.wikipedia.org/wiki/Bisection_method)*, which is also used in *[Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm)*

The range of possible numbers is between `1` and `1000`, both inclusive. This gives us 1000 consecutive numbers. By the divide and check approach, we can divide the possible numbers into two halves every time, checking which half the random number belongs in.

The maximum number of possible attempts to reach the number using this approach is:
⌈ log<sub>2</sub>1000 ⌉ = 10

The game allows `20` attempts (a `5`-point penalty out of `100`), which is double this worst case — so a player using the bisection method always has comfortable headroom to win.

## Optimal Play
Enabling the **Optimal play** toggle turns the theory above into a live hint:
 - Every guess (followed or not) narrows the feasible range `[low, high]` the secret must lie in, using the **high** / **low** feedback
 - **Best guess** is the midpoint of that range — the bisection choice that halves the remaining candidates
 - **Max guesses to win** is the guaranteed worst case for the candidates left, `⌈ log`<sub>2</sub>`(N + 1) ⌉` for `N` remaining numbers, which starts at `10` and drops as the range shrinks


## Credits
The sample code and inspiration for this project has been taken from *Jonas Schmedtmann*'s excellent course - *The Complete JavaScript Course 2022: From Zero to Expert!* on *udemy*

