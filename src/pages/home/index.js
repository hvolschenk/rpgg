import htmlLoader from '/shared/html-loader.js';
import WebComponentBase from '/shared/web-component-base.js';

htmlLoader('/pages/home/index.html', (template) => {
  class HomePage extends WebComponentBase {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  customElements.define('page-home', HomePage);
});
