class Player {
  constructor(container, color) {
    this.container = container;
    this.height = 55;
    this.width = 55;
    this.color = color;
    this.isJumping = false;
    this.isOnPlatform = false;
    this.bullets = [];
    this.lives = 3;
    this.remainingenemies = 10;
    this.direction = "right";
    this.bulletDirection = "right";
    this.shotCoolDown = false;

    this.x = 50;
    this.floor = 370;
    this.y = 370;

    this.vx = 0;
    this.vy = 0;

    this.g = 0.3;

    this.imgSrc = "/assets/img/ironasteroid_player_standleft.png";

    this.element = document.createElement("div");

    this.element.style.backgroundImage = `url(${this.imgSrc})`;
    this.element.style.backgroundSize = "contain";
    this.element.style.backgroundPosition = "center";
    this.element.style.position = "absolute";

    this.setListeners();
  }

  draw() {
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";

    this.element.style.position = "absolute";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";

    this.container.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
    this.vy += this.g;
    this.y += this.vy;

    if (this.y <= 0) {
      this.y = 0;
    }

    if (this.y >= this.floor) {
      this.isJumping = false;
      this.y = this.floor;
    }

    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x >= this.container.offsetWidth - this.width) {
      this.x = this.container.offsetWidth - this.width;
    }

    if (this.x <= 0) {
      this.x = 0;
    }
  }
  didCollideWithEnemies(enemies) {
    const collided = enemies.some((enemy) => this.didCollide(enemy));

    if (collided) {
      const enemyCollisionSound = new Audio(
        "assets/sounds/8-bit-explosion-low-resonant-45659.mp3"
      );
      enemyCollisionSound.play();
    }

    return collided;
  }

  updateLives() {
    this.lives--;
  }

  didCollideWithPlataform(plataforms) {
    plataforms.forEach((plataform) => {
      const playerRect = {
        top: this.y,
        bottom: this.y + this.height,
        left: this.x,
        right: this.x + this.width,
      };

      const platformRect = {
        top: plataform.y,
        bottom: plataform.y + plataform.element.offsetHeight,
        left: plataform.x,
        right: plataform.x + plataform.element.offsetWidth,
      };

      if (
        playerRect.bottom >= platformRect.top &&
        playerRect.top <= platformRect.bottom &&
        playerRect.right >= platformRect.left &&
        playerRect.left <= platformRect.right
      ) {
        if (this.vy > 0 && playerRect.top >= platformRect.top) {
          this.y = platformRect.top - this.height;
          this.vy = 0;
          this.isOnPlatform = true;
          this.isJumping = false;
        } else {
          if (this.vy >= 0) {
            this.y = platformRect.top - this.height;
            this.vy = 0;
            this.isOnPlatform = true;
            this.isJumping = false;
          }
        }
      }
    });
  }

  shoot(direction) {
    if (!this.shotCoolDown) {
      this.bullets.push(new Bullet(this.container, this, direction));
      const shootSound = document.getElementById("shoot-sound");
      shootSound.play();

      this.shotCoolDown = true;

      setTimeout(() => {
        this.shotCoolDown = false;
      }, 100);
    }
  }

  setImage() {
    let imageUrl = "";

    switch (this.direction) {
      case "right":
        imageUrl = "./assets/img/ironasteroid_player_right.png";
        break;
      case "left":
        imageUrl = "./assets/img/ironasteroid_player_left.png";
        break;
      case "down":
        imageUrl = "./assets/img/ironasteroid_player_standleft.png";
        break;
      case "up":
        imageUrl = "./assets/img/ironasteroid_player_upleft.png";
        break;
      default:
        console.log("entro");
        imageUrl = this.imgSrc;
        break;
    }

    this.element.style.backgroundImage = `url(${imageUrl})`;
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      let direction;
      switch (e.code) {
        case "KeyD":
          this.vx = 10;
          direction = "right";
          this.bulletDirection = "right";
          break;
        case "KeyA":
          this.vx = -10;
          direction = "left";
          this.bulletDirection = "left";
          break;
        case "KeyW":
          if (!this.isJumping && (this.isOnPlatform || this.y === this.floor)) {
            this.isJumping = true;
            this.vy = -10;
            direction = "up";
            this.bulletDirection = "up";
            const jumpSound = new Audio("assets/sounds/sfx_jump_07-80241.mp3");
            jumpSound.play();
          }
          break;
        case "KeyS":
          this.vy = 4;
          direction = "down";
          this.bulletDirection = "down";
          break;
        case "ArrowRight":
          this.bulletDirection = "right";
          direction = "right";
          break;
        case "ArrowLeft":
          this.bulletDirection = "left";
          direction = "left";
          break;
        case "ArrowUp":
          this.bulletDirection = "up";
          direction = "up";
          break;
        case "ArrowDown":
          this.bulletDirection = "down";
          direction = "down";
          break;
        case "Space":
          this.shoot(this.bulletDirection);
          const shootSound = new Audio("assets/sounds/blaster-2-81267.mp3");
          shootSound.play();
          break;
      }

      if (direction && this.direction !== direction) {
        this.direction = direction;
        this.setImage();
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyD":
        case "KeyA":
          this.vx = 0;
          break;
        case "KeyW":
          break;
        case "KeyS":
          this.vy = 0;
          break;
      }
    });
  }
  cleanup() {
    this.bullets.forEach((bullet) => {
      const inBoard = bullet.x + bullet.width < this.container.offsetWidth;

      if (!inBoard) {
        bullet.element.remove();
      }
    });

    const filteredBullets = this.bullets.filter((bullet) => {
      return bullet.x + bullet.width < this.container.offsetWidth;
    });

    this.bullets = filteredBullets;
  }

  update() {
    this.bullets.forEach((bullet) => {
      bullet.update();
    });

    this.move();
    this.draw();
  }
}
