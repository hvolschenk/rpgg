import htmlLoader from '/shared/html-loader.js';

htmlLoader('/components/app-router/link/index.html', (template) => {
  class AppRouterLink extends HTMLElement {
    static get observedAttributes() {
      return ['href'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.$anchor = this.shadowRoot.querySelector('a');
    }

    connectedCallback() {
      this.$anchor.setAttribute('href', this.getAttribute('href'));
      this.$appRouter = this.getAppRouter();
      this.$anchor.addEventListener('click', (event) => {
        event.preventDefault();
        this.$appRouter.navigate(this.getAttribute('href'));
      });
    }

    attributeChangedCallback(name, _, newValue) {
      if (name === 'href') {
        this.$anchor.setAttribute("href", newValue);
      }
    }

    getAppRouter(element = this) {
      if (!element || element === document || element === window) {
        throw new Error('An <app-router-link><app-router-link> must be wrapped inside an <app-router></app-router>');
      }
      return element.closest('app-router') || this.getAppRouter(element.getRootNode().host);
    }
  }
  
  customElements.define('app-router-link', AppRouterLink);
});
