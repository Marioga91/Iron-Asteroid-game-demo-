class Enemy {
  constructor(container) {
    this.container = container;
    this.height = 80;
    this.width = 80;

    this.x = Math.random() * this.container.offsetWidth;
    this.y = Math.random() * 120;

    this.vx = -10;
    this.vy = -2;

    this.imgSrc = `url(./assets/img/asteroid.png)`;

    this.element = document.createElement("div");

    this.element.style.background = this.imgSrc;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.position = "absolute";

    this.hasEntered = false;
  }

  draw() {
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";

    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";

    this.container.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.hasEntered &&
      (this.x < 0 || this.x + this.width > this.container.offsetWidth)
    ) {
      this.vx = -this.vx;
    }

    if (!this.hasEntered && this.x + this.width < this.container.offsetWidth) {
      this.hasEntered = true;
    }

    if (this.y < 0 || this.y + this.height > this.container.offsetHeight) {
      this.vy = -this.vy;
    }

    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  update() {
    this.move();
    this.draw();
  }

  didCollide(obstacle) {
    const obstacleRect = obstacle.element.getBoundingClientRect();
    const enemyRect = this.element.getBoundingClientRect();

    if (
      enemyRect.left < obstacleRect.right &&
      enemyRect.right > obstacleRect.left &&
      enemyRect.top < obstacleRect.bottom &&
      enemyRect.bottom > obstacleRect.top
    ) {
      if (obstacle instanceof Bullet) {
        const bulletCollisionSound = new Audio(
          "assets/sounds/8-bit-explosion-low-resonant-45659.mp3"
        );
        bulletCollisionSound.play();
      } else if (obstacle instanceof Player) {
        const playerCollisionSound = new Audio(
          "assets/sounds/8-bit-explosion-low-resonant-45659.mp3"
        );
        playerCollisionSound.play();
      }

      return true;
    } else {
      return false;
    }
  }
}
