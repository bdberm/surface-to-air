# Surface To Air

## Background

Surface to Air is inspired by the classic 1-player Atari game Missile Command. It involves a series of projectiles descending from the sky at various angles, vectors and trajectories headed for the eight cities on the ground. If a projectile contacts a city that city will be destroyed. If all cities are destroyed the player loses. The player can shoot down incoming projectiles with their own central gun they target with the mouse and shoot by pressing the space bar. Rounds are 1 minute long and a player advances if any of the cities remain at the end of the round. The difficulty increases each round via accelerated generation of projectiles.

## Architecture and Technology
* Javascript for handling game logic
* HTML5 Canvas for animation
* Webpack for bundling js files

The game architecture includes:
* board.js - handles the rendering/animation of the game
* game.js - handles the internal logic of the game including timer, levels, play/pause
* crosshair.js - handles the targeting of the crosshair on the screen
* bomb.js - handles the logic of a bomb falling from the sky
* laser.js - handles the logic of the generation and velocity of a laser shot
* cannon.js - handles the rendering and orientation of the laser cannon
* timer.js - handles the round timer
* explosion.js - handles the animation of an explosion resulting from a collision
* collision.js - handles the detection of collisions in the game
* util.js - helper functions for calculating unit vectors and positions for rendering the various game objects

##Future Features
* More involved scoring process
* Change game animations as you advance levels
* Add Side Cannons
