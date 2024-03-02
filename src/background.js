class Background {
  constructor(container) {
    this.container = container;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.x = 0;
    this.y = 0;

    this.vx = 0;

    this.element = document.createElement("div");
  }

  draw() {
    this.element.style.position = "absolute";
    this.element.style.background = `url(./assets/img/pixel-art-planet-surface-space-260nw-2226963793.png)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "bottom";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";

    this.container.appendChild(this.element);
  }

  update() {
    this.draw();
  }
}
