class LivesCounter {
  constructor(container, lives) {
    this.container = container;
    this.lives = lives;

    this.element = document.createElement("p");
    this.element.style.position = "absolute";
    this.element.style.color = "green";
    this.element.style.left = "20px";
    this.element.style.top = "15px";
  }

  draw() {
    this.element.textContent = `VIDAS :   ${this.lives}`;

    this.container.appendChild(this.element);
  }

  update() {
    this.draw();
  }
}
