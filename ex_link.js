class ExLink extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const url = this.textContent;
    const link = document.createElement("a");
    link.setAttribute("part", "a");
    link.href = url;
    link.target = "_blank";
    link.textContent = this.getAttribute("text") || url;
    shadow.appendChild(link);
  }
}
customElements.define("ex-link", ExLink);
