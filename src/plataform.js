class Plataform {
  constructor(container, X, Y) {
    this.container = container;

    this.x = X;
    this.y = Y;
    this.vx = 0;

    this.image = new Image();
    this.image.src = "./assets/img/metalplatform.png";
    this.element = document.createElement("div");
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.position = "absolute";
    this.element.style.width = "150px";

    this.image.onload = () => {
      this.element.style.backgroundImage = `url("${this.image.src}")`;
      const calculatedHeight = (150 / this.image.width) * this.image.height;
      this.element.style.height = `${calculatedHeight}px`;
    };
  }

  draw() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    this.container.appendChild(this.element);
  }

  didCollideWithPlayer(player) {
    const playerRect = {
      top: player.y,
      bottom: player.y + player.height,
      left: player.x,
      right: player.x + player.width,
    };

    const platformRect = {
      top: this.y,
      bottom: this.y + this.element.offsetHeight,
      left: this.x,
      right: this.x + this.element.offsetWidth,
    };

    if (
      playerRect.bottom >= platformRect.top &&
      playerRect.top <= platformRect.bottom &&
      playerRect.right >= platformRect.left &&
      playerRect.left <= platformRect.right
    ) {
      player.isOnPlatform = true;

      if (player.vy >= 0 && player.y <= platformRect.top - player.height) {
        player.y = platformRect.top - player.height;
        player.vy = 0;
      }
    } else {
      player.isOnPlatform = false;
    }
  }
  update() {
    this.draw();
  }
}
