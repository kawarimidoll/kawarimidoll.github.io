class ExLink extends HTMLElement {
  constructor() {
    super();
    const url = this.textContent;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.textContent = this.getAttribute("text") || url;
    this.replaceWith(link);
  }
}
customElements.define("ex-link", ExLink);
