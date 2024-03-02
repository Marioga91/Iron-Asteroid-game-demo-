class Bullet {
  constructor(container, player, direction) {
    this.container = container;
    this.width = 50;
    this.height = 30;
    switch (direction) {
      case "left":
        this.vx = -10;
        this.vy = 0;
        this.x = player.x - player.width / 2;
        this.y = player.y + player.height / 5;
        break;
      case "up":
        this.vy = -10;
        this.vx = 0;
        this.x = player.x + player.width / 40;
        this.y = player.y + player.height / 40;
        break;
      case "down":
        this.vy = 10;
        this.vx = 0;
        this.x = player.x + player.width / 11;
        this.y = player.y + player.height / 1;
        break;
      default:
        this.vy = 0;
        this.vx = 10;
        this.x = player.x + player.width / 1;
        this.y = player.y + player.height / 5;
    }

    this.direction = direction;
    this.imgSrc = `url(./assets/img/laser-${direction}.png)`;

    this.element = document.createElement("div");

    this.element.style.background = this.imgSrc;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.position = "absolute";
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
    this.y += this.vy;
  }

  update() {
    this.draw();
    this.move();
  }
}
