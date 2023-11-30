export class Form {
  element = document.createElement("form");
  heading = document.createElement("h2");
  closeButton = document.createElement("button");

  constructor(type, title, content) {
    this.element.setAttribute("type", type);
    this.heading.textContent = title;
    this.closeButton.setAttribute("type", "submit");
    this.closeButton.classList.add("secondary");
    this.closeButton.textContent = "Close";
    this.element.appendChild(this.heading);
    this.element.appendChild(content);
    this.element.appendChild(this.closeButton);
  }
}

export class Modal {
  openButton = document.createElement("button");
  dialog = document.createElement("dialog");

  constructor(name, parentElement, contentElement) {
    this.name = name;
    this.openButton.setAttribute("id", name);
    this.openButton.textContent = name;
    this.parent = parentElement;
    this.content = contentElement;
    this.#setupForm();
    this.#registerOpenListener();
  }

  #setupForm() {
    const article = document.createElement("article");
    const form = new Form("dialog", this.name, this.content);
    article.appendChild(form.element);
    this.dialog.appendChild(article);

    const dialog = this.dialog;
    form.element.addEventListener("submit", function (event) {
      event.preventDefault();
      dialog.close();
    });
  }

  #registerOpenListener() {
    const dialog = this.dialog;
    this.openButton.addEventListener("click", () => {
      dialog.showModal();
    });
  }

  render() {
    this.parent.replaceChildren(this.openButton);
    this.parent.appendChild(this.dialog);
  }
}
