class ModalIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.applyTwemoji();
  }

  render() {
    const emoji = this.getAttribute("emoji") || "📄";
    const title = this.getAttribute("title") || "モーダル";
    const content = this.innerHTML;

    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                margin: 0 10px;
            }

            .icon-button {
                background: none;
                border: 2px solid #ddd;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
            }

            .icon-button img {
                width: 32px;
                height: 32px;
                pointer-events: none;
            }

            .icon-button:hover {
                border-color: #007bff;
                transform: scale(1.1);
                box-shadow: 0 4px 8px rgba(0,123,255,0.3);
            }

            .icon-button:active {
                transform: scale(0.95);
            }

            dialog {
                border: none;
                border-radius: 12px;
                padding: 0;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                width: 90%;
            }

            dialog::backdrop {
                background-color: rgba(0, 0, 0, 0.5);
            }

            .modal-content {
                padding: 30px;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }

            .modal-title {
                margin: 0;
                color: #333;
                font-size: 20px;
            }

            .close-button {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 5px;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .close-button:hover {
                background-color: #f0f0f0;
                color: #333;
            }

            .modal-body {
                color: #555;
                line-height: 1.6;
            }
        </style>

        <button class="icon-button" type="button">
            ${emoji}
        </button>

        <dialog class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="close-button" type="button">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </dialog>
    `;
  }

  setupEventListeners() {
    const iconButton = this.shadowRoot.querySelector(".icon-button");
    const modal = this.shadowRoot.querySelector(".modal");
    const closeButton = this.shadowRoot.querySelector(".close-button");

    // アイコンボタンクリックでモーダルを開く
    iconButton.addEventListener("click", () => {
      modal.showModal();
    });

    // 閉じるボタンクリックでモーダルを閉じる
    closeButton.addEventListener("click", () => {
      modal.close();
    });

    // 背景クリックでモーダルを閉じる
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });

    // ESCキーでモーダルを閉じる（デフォルト動作）
    modal.addEventListener("cancel", (_event) => {
      // デフォルトの動作を許可
    });
  }

  applyTwemoji() {
    // Twemojiが読み込まれているかチェック
    if (typeof twemoji !== "undefined") {
      const iconButton = this.shadowRoot.querySelector(".icon-button");
      if (iconButton) {
        // TwemojiをShadow DOM内の要素に適用
        twemoji.parse(iconButton, {
          folder: "svg",
          ext: ".svg",
        });
      }
    } else {
      // Twemojiが読み込まれていない場合は少し待ってリトライ
      setTimeout(() => this.applyTwemoji(), 100);
    }
  }

  // 属性変更時の処理
  static get observedAttributes() {
    return ["emoji", "title"];
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
      this.applyTwemoji();
    }
  }
}

// カスタムエレメントを登録
customElements.define("modal-icon", ModalIcon);
