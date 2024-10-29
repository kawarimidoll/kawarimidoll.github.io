class TypingEffect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const text = this.textContent.trim();
    this.chars = [...text];
    this.currentIndex = 0;
    this.typingInterval = null;

    this.styleElement = document.createElement("style");
    this.styleElement.textContent = `
    span {
      &.typing {
        animation: caret .5s step-end infinite alternate;
        padding-right: 4px;
        border-right: 2px solid;
      }
      &.invisible {
        word-break: break-all;
        visibility: hidden;
      }
    }
    @keyframes caret { 50% { border-color: transparent } }`;
    this.shadowRoot.append(this.styleElement);

    this.textElement = document.createElement("span");
    this.textElement.classList.add("typing");
    this.shadowRoot.append(this.textElement);

    this.placeholderElement = document.createElement("span");
    this.placeholderElement.textContent = text;
    this.placeholderElement.classList.add("invisible");
    this.shadowRoot.append(this.placeholderElement);
  }

  connectedCallback() {
    this.typingInterval = setInterval(() => {
      if (this.currentIndex < this.chars.length) {
        this.textElement.textContent += this.chars[this.currentIndex];
        this.placeholderElement.textContent = this.placeholderElement
          .textContent.replace(/^./, "");
      } else if (this.currentIndex < this.chars.length + 30) {
        // wait 30 count before termination
      } else {
        this.disconnectedCallback();
      }
      this.currentIndex++;
    }, 80);
  }

  disconnectedCallback() {
    clearInterval(this.typingInterval);
    this.styleElement.textContent = "";
  }
}

customElements.define("typing-effect", TypingEffect);
