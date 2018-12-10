//  Globals
let audio = new Audio,
    lives = 6,
    livesContainer,
    points = 0;

// Upon page load open the welcome modal
window.onload = function() {
  window.location.href = "#welcome-modal";
  generateAvatars();
  generateHearts();
}

// generate avatars
const avatarsId = ['char-princess-girl','char-cat-girl','char-horn-girl','char-pink-girl','char-boy'];

let generateAvatars = () => {
  for (let element of avatarsId) {
    avatarsContainer = document.getElementById('avatars');
    let avatar = document.createElement('img');
    avatarsContainer.appendChild(avatar);
    avatar.src=`images/${element}.png`;
    avatar.id=`${element}`;
    avatar.classList.add('char-image');
    // add animation when hovering on an avatar
    avatar.addEventListener('mouseover', function(e) {
      avatar.classList.add('bounceIn');
      avatar.classList.add('active')
    });
    // remove aniamtion when leaving an avatar
    avatar.addEventListener('mouseout', function(e) {
      avatar.classList.remove('bounceIn');
      avatar.classList.remove('active')
    });
  }
};

// generate hearts
let generateHearts = () => {
  for (let i = 0; i < lives ; i++) {
    let life = document.createElement('li');
    livesContainer = document.getElementById('lives');
    livesContainer.appendChild(life);
    life.innerHTML = '<img src="images/Heart.png" />';
    life.classList.add('heart');
  }
};

// all gems
const cushionGems = ['images/Gem Orange.png', 'images/Gem Green.png','images/Gem Blue.png'];

// Gem class
class Gem {
  constructor(id) {
    this.sprite = this.randomGem(cushionGems);
    this.x = this.gemXCoordinate();
    this.y = this.gemYCoordinate();
    this.horizontal = 101;
    this.vertical = 83;
    this.width = this.horizontal/2;
    this.height = this.vertical/2;
    this.id = id;
    this.point = this.gemPoints(this.sprite);
  }

  // Draw the gem on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // random gem
  randomGem(arr) {
    let gemsLenght = arr.length;
    let randomIndex = Math.floor(Math.random()* gemsLenght);
    return cushionGems[randomIndex];
  }

  // Y coordinates for randomly place the gem
  gemYCoordinate() {
    // 3 possible rows  for gem with index:1,2,3
    let randomGemRow = Math.ceil(Math.random()*3);
    switch(randomGemRow) {
      case 1:
          // in row 1 y is between 83 and 160 -> avg = 160+83/2 = 120
          this.y = 120;
          break;
      case 2:
          // in row 2 y is between 160 and 240 -> avg = 160+240/2 = 200
          this.y = 200;
          break;
      case 3:
          // in row y x is between 240 and 320 -> avg = 320+240/2 = 283
          this.y = 280;
          break;
    }
    return this.y;
  }

  // X coordinates for eandomly placing the gem
  gemXCoordinate() {
    // 5 possible columns for ge with index 0,1,2,3,4
    let reandomGemCol = Math.floor(Math.random()*5);
    switch(reandomGemCol) {
      case 1:
          // in col 1 x is between 0 and 110 -> avg = 0+110/2 = 55
          this.x = 55 - 30;
          break;
      case 2:
          // in col 2 x is between 110 and 220 -> avg = 110+220/2 = 165
          this.x = 165 - 40;
          break;
      case 3:
          // in row 3 x is between 220 and 330 -> avg = 220+330/2 = 275
          this.x = 275 - 50;
          break;
      case 4:
          // in row 4 x is between 330 and 440 -> avg = 330+440/2 = 385
          this.x = 385 - 60;
          break;
      case 5:
          // in row 5 x is between 440 and 550 -> avg = 440+550/2 = 495
          this.x = 495 - 70;
          break;
    }
    return this.x;
  }

  // points of each gem
  gemPoints(gem) {
    const gemPoint = {
      'images/Gem Orange.png': 10,
      'images/Gem Green.png' : 20,
      'images/Gem Blue.png' : 30,
    };
    return gemPoint[gem];
  }

  // whether the player and the gem are colliding
  playerCollidWithGem() {
    // position of the player in a grid
    let playerCoordinates = {
      x: player.x,
      y: player.y + 55,
      width: (player.horizontal)/2,
      height: (player.vertical/2)
    };
    // position of a gem in a grid
    let gemCoordinates = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    // check the X coordinates range of collision
    let collisonXRange = playerCoordinates.x < gemCoordinates.x + gemCoordinates.width &&
        playerCoordinates.x + playerCoordinates.width > gemCoordinates.x;
    // check the X coordinates range of collision
    let collisionYRange = playerCoordinates.y < gemCoordinates.y + gemCoordinates.height &&
    playerCoordinates.height + playerCoordinates.y > gemCoordinates.y;

    if ( collisonXRange && collisionYRange ) {
      let gem = this.sprite;
      // get the gem upon collision
      this.addGemPoints(gem);
      return true
    } else {
      return false
    }
  }

  // add  points when player reached a gem
  addGemPoints() {
    audio.src = 'sounds/bonus.wav';
    audio.play();
    let point = document.querySelector('.result');
    points += this.point;
    point.innerHTML = `${points}`
  }

  update() {
    return this.playerCollidWithGem();
  }
}

const gem1 = new Gem(1);
const gem2 = new Gem(2);
const gem3 = new Gem(3);

let allGems = [];
allGems.push( gem1, gem2, gem3);

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
    this.y = y + 58;
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
    // handles enemy movement- use dt(time delta) to normalize gamse speed

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
  // renders the result of the previous method and uses HTML Canvas method to draw the enemy's sprite new position to the game board
  render() {
    //Resources.get -> returns the cached image of our stri[e ]
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

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
    this.y0 = (this.vertical * 4) + 58;
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
  // the position (0,0) is on top-left corner -> up movement is this.y - this.vertical
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
      // dividing by 1.5 to make the distance betwen the player and the enemy less upon collision
      let collisonXRange = enemy.x + enemy.horizontal/1.5 > this.x && enemy.x < this.x + this.horizontal/1.5;
      // collision
      if(this.y === enemy.y && collisonXRange) {
        lives -= 1;
        // lose a heart upon collision
        this.lose();
        audio.src = 'sounds/lost_a_life.wav';
        audio.play();
        this.reset();
      }
      // win
      if(this.y === 58) {
        audio.src = 'sounds/win_round.wav';
        audio.play();
        this.winner = true;
        allGems = [];
        //  after winning create new random gems
        let gemIndex = Math.floor(Math.random()*10);
        let myGem1 = new Gem(gemIndex);
        let myGem2 = new Gem(`gem${gemIndex + 1}`);
        setTimeout(function(){
          allGems.push( myGem1, myGem2 );
        }, 1500);
      }
    }
    if(this.y === 58) {
      this.addPoints();
    }
  }

  handleClick(e) {
    audio.src = 'sounds/click.wav';
    audio.play();
    // set the avatarGem
    this.sprite = `images/${e.target.id}.png`;
    // chage the background color based on the selected avatar
    document.body.className = e.target.id;
  }

  lose() {
    if (lives > 0) {
      livesContainer.removeChild(livesContainer.childNodes[lives]);
    } else {
      livesContainer.innerHTML = '';
    }
  }

   addPoints(){
    let point = document.querySelector('.result');
    points += 10;
    point.innerHTML = `${points}`
  }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(-101,0, 200);
const enemy2 = new Enemy(-101,83, 300);
const enemy3 = new Enemy(-101*2, 83*2, 200);
const allEnemies = [];
// enemies will start moving upon clicking the start button
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', function() {
  $('#start-btn').attr('disabled',true);
  allEnemies.push( enemy1, enemy2, enemy3);
})

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
startBtn.addEventListener('click', function() {
  document.addEventListener('keyup', function(e) {
      //maps key codes to a corresponding string
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };
      player.handleInput(allowedKeys[e.keyCode]);
  });
})

// select player
const avatars = document.getElementById('avatars');
avatars.addEventListener('click', function(e) {
  player.handleClick(e);
});

//  close welcome modal
const startGame = document.querySelector('.start');
startGame.addEventListener('click', function() {
  const welcomeModal = document.getElementById('welcome-modal');
  welcomeModal.classList.add('hide')
});
