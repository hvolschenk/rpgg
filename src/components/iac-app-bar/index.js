import htmlLoader from '/shared/html-loader.js';

htmlLoader('/components/iac-app-bar/index.html', (template) => {
  class IACAppBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  customElements.define('iac-app-bar', IACAppBar);
});
