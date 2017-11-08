# Surface To Air

## Background

Surface to Air is inspired by the classic 1-player Atari game Missile Command. It involves a series of projectiles descending from the sky at various angles, vectors and trajectories headed for the six cities on the ground. If a projectile contacts a city that city will be destoryed. If all cities are destroyed the player loses. The player can shoot down incoming projectiles with their own central gun they target with the mouse and shoot by pressing the space bar. The total time played is the player's score.

## MVPs

In Surface to Air, a player can:
* Start, pause, and restart the game
* See where proejctiles are falling
* Target their crosshair via the mouse and see their missile launch correspondingly move
* Shoot missiles in the direction of their crosshair via the keyboard
* See the timer of how long they have been playing

In addition the project will include:
* An about modal describing the background and rules of the game
* A production README

## Wireframes
The app will consist of a single screen with the game board, a clock displaying the player's time/score, and a control bar to start, pause and reset the game.

[Wireframe To Be Cosnstructed]

## Architecture and Technology
The game will be implemented with:
* Javascript for handling game logic
* HTML5 Canvas for animation
* Webpack for bundling js files

Along with the entry file, the game classes will include:

* board.js - handles the rendering of the game on the front rendering
* game.js - handles the internal logic of the game and moving all the pieces around the Canvas
* cursor.js - handles the moving of the cursor across the game
* moving_piecs.js - handles the basic function of pieces that move across the canvas with a given direction and velocity
* projectile.js - handles the logic of projectiles falling from the sky down to the Surface
* missile.js - handles the logic specific to the missiles shot from the player's missile launch through their crosshair


## Implementation Timeline
**Day 1:**
* Have canvas element rendering on screen
* Have "crosshair" rendered on screen
* Have "crosshair" move with mouse input from player

**Day2**
* Have mouse click shoot "missile" in direction of crosshair
* Have "projectiles" fall from the sky to the Background
* Have cities on ground that when hit by projectiles are removed from the board

**Day3**
* Have projectile and missile disappear when they collide
* Add timer and score logic

**Day4**
* STyling - replace all blocks etc.. with distinct images for projectile, city, missile and cursor
* Add backdrop, instructions modal etc...
