// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // enemies position(x,y)

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // _handles enemy movement- use dt(time delta) to normalize gamse speed
    // check enemies position status
        // if (within the grid) -> move forward by x = v(dt)
        // else (reset to start position)
};

// Draw the enemy on the screen, required method for game
// _renders the result of the previous method and uses HTML Canvas method to draw the enemy's sprite new position to the game board
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
  // Constructore Function with some properties
    // position of the player (x,y)
    // player image
  // Add methods to prototype
    // update the player position(reached top of the grid, stays within the gird) and collision status
    // render the player
    // handleInput (direction ot the player's movement)
    // reset the game (collion and win)


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    //_maps key codes to a corresponding string
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);

});
