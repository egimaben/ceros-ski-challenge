# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here:
http://ceros-ski.herokuapp.com/

We understand that everyone has varying levels of free time, so take a look through the requirements below and let us
know when you will have something for us to look at (we also get to see how well you estimate and manage your time!).
If anything is unclear, don't hesitate to reach out.

Requirements:
* The base game that we've sent you is not what we would consider production ready code. In fact, it's pretty far from
  it. As part of our development cycle, all code must go through a review. We would like you to perform a review
  on the base code and fix/refactor it until you believe it would be ready for production. Feel free to update the
  code/architecture as you see fit. If you feel that something should be done a better way, by all means do it! What
  design patterns could we use? Is the codebase maintainable, unit-testable, and scalable? How hard would it be to add
  a feature? Show us!
* There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it. (DONE)
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
* The game's a bit boring as it is. Add a new feature to the game to make it more enjoyable. Some ideas are:
  * Implement jumps. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included
      some jump trick assets if you wanted to get really fancy!
  * Add a score. How will you know that you're the best Ceros Skier if there's no score? Maybe store that score
      somewhere so that it is persisted across browser refreshes.
  * Feed the hungry Rhino. In the original Ski Free game, if you skied for too long, a yeti would chase you
      down and eat you. In Ceros Ski, we've provided assets for a Rhino to catch the skier.
* Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
* Provide a way for us to view the completed code and run it, either locally or through a cloud provider
* Be original. Don’t copy someone else’s game implementation!

Bonus:
* Provide a way to reset the game once the game is over
* Provide a way to pause and resume the game
* Skier should get faster as the game progresses
* Deploy the game to a server so that we can play it without setting something up ourselves. We've included a
  package.json and web.js file that will enable this to run on Heroku. Feel free to use those or use your own code to
  deploy to a cloud service if you want.
* Write unit tests for your code

And don't think you have to stop there. If you're having fun with this and have the time, feel free to add anything else
you want and show us what you can do!

We are looking forward to see what you come up with!

# Results

Completed
* Fixed Bug
* Added night sky back ground
* Refactored Code(well, partly :))
* jump
* Score
* setup testing runnable with `npm test`, ready to write tests
* Provide a way to pause and resume the game with `space` bar
* score persistence across browser refreshes
* Provide a way to reset the game once the game is over(press space and choose restart)
* Game over after 3 crashes
* Skier should get faster as the game progresses

Not Completed
* Feed the Rhino
* deploy to server