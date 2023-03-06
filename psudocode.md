1) Define required constants:
    - define an array of colors (red, green, blue, yellow)

2) Define required variables used to track the state of the game:
    - define an array of computer sequence and player sequence
    - define round number
    - define winner boolean variable

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
    - store the color elements
    - store start and restart buttons

4) Upon loading the app should:
    - initialize state variables
        * computer and player sequence array should be empty
        * round should start at round 1
        * start and restart buttons should be hidden
    - render round 1
        * computer chooses random color
        * player should not be able to click during computer's turn
        * during computer's turn, buttons should show in order one at a time at 1s intervals
    - render a message
        * render message what round it is
        * render message whos turn it is

5) Handle a player clicking:
    - guard
        * handle if player selects anything but button or color
            * colors should be unclickable on app loadup
    - buttons
        * start should load the app
        * restart should reload the app
    - colors
        * colors should be unclickable during computer's turn
        * assign color selection to player sequence array
            * if incorrect sequence end game/render end game message
            * if complete round, continue to next round
        
6) After MVP, ideas for creativity
    - add high score table
    - add sound