//  Globals
var audio = new Audio;

// Enemies our player must avoid
// arguments to give enemies  different position
class Enemy {
  constructor(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // enemies start position
    this.x = x;
    // move toward the center of the row
    this.y = y + 55;
    // distance between blocks
    this.horizontal = 101;
    // end point limit to reset the enemy position - when enemy reaches the endpoint, it will reset the enemy position
    this.endPoint = this.horizontal * 5;
    // the enemy reset position will start off screen
    this.startPosition = -this.horizontal;
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // _handles enemy movement- use dt(time delta) to normalize gamse speed

    // check enemies position status
      // within the grid -> move forward by x = v(dt)
      // stopping position of the enemy -> off screen
    if (this.x < this.endPoint) {
      this.x += this.speed * dt
    } else {
      //reset to start startPosition when enemy is offscreen
      this.x = this.startPosition;
    }
  }
  // Draw the enemy on the screen, required method for game
  // _renders the result of the previous method and uses HTML Canvas method to draw the enemy's sprite new position to the game board
  render() {
    //_Resources.get -> returns the cached image of our stri[e ]
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
class Player {
  // to initialize a new object
  constructor() {
    // The image/sprite for our player
    this.sprite = 'images/char-pink-girl.png';
    //distance between two blocks
    this.horizontal = 101;
    this.vertical = 83;
    // start position of the player

    this.x0 = this.horizontal * 2;
    this.y0 = (this.vertical * 4) + 55;
    // current position of the player (x,y)
    this.x = this.x0;
    this.y = this.y0;
    this.winner = false;
  }

  // Draw the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // key -> direction ot the player's movement
  // the position (0,0) is on tope-left corner -> up movement is this.y - this.vertical
  handleInput(key) {
    // update the player position: reached top of the grid, stays within the gird, collision status
    audio.src = 'sounds/step.wav';
    switch(key) {
      case 'left':
          if (this.x > 0) {
            this.x -= this.horizontal;
            audio.play();
          }
          break;
      case 'up':
          if (this.y > this.vertical) {
            this.y -= this.vertical;
            audio.play();
          }
          break;
      case 'right':
          if (this.x < (this.horizontal * 4)) {
            this.x += this.horizontal;
            audio.play();
          }
          break;
      case 'down':
          if (this.y < this.vertical * 4) {
            this.y  += this.vertical;
            audio.play();
          }
          break;
    }
  }

  // reset the game (collion and win)
  reset(position) {
    this.x = this.x0;
    this.y = this.y0;
  }

  update() {

    for (let enemy of allEnemies) {
      // collision


      if(this.y === enemy.y && (enemy.x + enemy.horizontal/1.5 > this.x && enemy.x < this.x + this.horizontal/1.5)) {
        audio.src = 'sounds/game_over.wav';
        audio.play();
        console.log("audio", audio.src);
        this.reset();
      }
      // win
      if(this.y === 55) {
        audio.src = 'sounds/win.wav';
        audio.play();
        this.winner = true;
        setTimeout(function(){
          this.reset;
        }, 3000);
      }
    }
  }

  handleClick(e) {
    // set the avatar
    this.sprite = `images/${e.target.id}.png`;
    // chage the background color based on the selected avatar
    document.body.className = e.target.id;
  }

}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(-101,0, 200);
// const enemy2 = new Enemy(-101,83, 300);
// const enemy3 = new Enemy(-101*3, 83, 300);
const enemy4 = new Enemy(-101*2, 83*2, 200);
const allEnemies = [];
allEnemies.push( enemy1,  enemy4);

// Place the player object in a variable called playsmwsmwsmwsmwer
const player = new Player();


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

    player.handleInput(allowedKeys[e.keyCode]);

});


const avatars = document.getElementById('avatars');
avatars.addEventListener('click', function(e) {
  player.handleClick(e);
});

const avatar = document.querySelectorAll('.avatar');
for (let i = 0; i< avatar.length; i++) {
  avatar[i].addEventListener('mouseover', function(e) {
    avatar[i].classList.add('bounceIn')
  });
}

for (let i = 0; i< avatar.length; i++) {
  avatar[i].addEventListener('mouseout', function(e) {
    avatar[i].classList.remove('bounceIn')
  });
}
