class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container, "red");
    this.background = new Background(this.container);
    this.livesCounter = new LivesCounter(this.container, this.player.lives);
    this.remainingenemies = new remainingenemies(
      this.container,
      this.player.remainingenemies
    );
    this.plataforms = [
      new Plataform(this.container, 140, 300),
      new Plataform(this.container, 380, 200),
      new Plataform(this.container, 620, 300),
    ];

    this.enemies = [];
    this.enemiesKilled = 0;

    this.tickEnemy = 0;
    this.tickEnemyFrequency = 100;
  }

  start() {
    this.update();
    this.intervalId = setInterval(() => {
      this.tickEnemy++;

      if (this.tickEnemy % this.tickEnemyFrequency === 0) {
        this.enemies.push(new Enemy(this.container));
      }

      this.update();
      this.cleanup();
      this.checkCollisions();
    }, 1000 / 36);
  }

  cleanup() {
    this.enemies.forEach((enemy) => {
      const inBoard = enemy.x + enemy.width > 0;

      if (!inBoard) {
        enemy.element.remove();
      }
    });

    const filteredEnemies = this.enemies.filter((enemy) => {
      return enemy.x > -enemy.width;
    });

    this.enemies = filteredEnemies;
    this.player.cleanup();
  }

  gameOver() {
    window.clearInterval(this.intervalId);

    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game-over-container");

    const gameOverImage = document.createElement("img");
    gameOverImage.classList.add("game-over-image");
    gameOverImage.src = "assets/img/ironasteroid_GAMEOVER_.gif";

    gameOverContainer.appendChild(gameOverImage);

    this.container.appendChild(gameOverContainer);
  }

  checkCollisions() {
    const collidedEnemy = this.enemies.find((enemy) => {
      return enemy.didCollide(this.player);
    });

    if (collidedEnemy) {
      this.player.updateLives();
      this.enemies = this.enemies.filter((enemy) => {
        return enemy !== collidedEnemy;
      });

      if (this.player.lives === 0) {
        this.gameOver();
      }

      collidedEnemy.element.style.display = "none";

      this.livesCounter.lives--;
      this.livesCounter.draw();
    }

    this.enemies.forEach((enemy) => {
      this.player.bullets.forEach((bullet) => {
        if (enemy.didCollide(bullet)) {
          this.enemies = this.enemies.filter((enemyFromArray) => {
            return enemy !== enemyFromArray;
          });

          enemy.element.style.display = "none";

          this.player.bullets = this.player.bullets.filter(
            (bulletsFromArray) => {
              return bullet !== bulletsFromArray;
            }
          );

          bullet.element.style.display = "none";

          this.enemiesKilled++;

          if (this.enemiesKilled >= 10) {
            this.showWinMessage();
          }
          this.remainingenemies.remainingenemies--;
          this.remainingenemies.draw();
        }
      });
    });

    this.player.didCollideWithPlataform(this.plataforms);
  }

  update() {
    this.background.update(this.player.vx);
    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.remainingenemies.update();
    this.livesCounter.update();
    this.plataforms.forEach((Plataform) => {
      Plataform.update(this.player.vx);
    });
  }
  showWinMessage() {
    clearInterval(this.intervalId);

    const winContainer = document.createElement("div");
    winContainer.classList.add("game-over-container");

    const winImage = document.createElement("img");
    winImage.classList.add("game-over-image");
    winImage.src = "assets/img/ironasteroid_YOUWIN.png";

    winContainer.appendChild(winImage);

    this.container.appendChild(winContainer);
  }
}
