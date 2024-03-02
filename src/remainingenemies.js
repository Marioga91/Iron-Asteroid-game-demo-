class remainingenemies {
  constructor(container, remainingenemies) {
    this.container = container;
    this.remainingenemies = remainingenemies;

    this.element = document.createElement("p");
    this.element.style.position = "absolute";
    this.element.style.color = "red";
    this.element.style.left = "20px";
    this.element.style.top = "35px";
  }

  draw() {
    this.element.textContent = `Remaining enemies :        ${this.remainingenemies}`;

    this.container.appendChild(this.element);
  }

  update() {
    this.draw();
  }
}
