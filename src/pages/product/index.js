import htmlLoader from '/shared/html-loader.js';
import WebComponentBase from '/shared/web-component-base.js';

htmlLoader('/pages/product/index.html', (template) => {
  class ProductPage extends WebComponentBase {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.setState({ temp: 'temp' });
      this.fetchData();
    }

    fetchData() {
      this.setTemplate('loading');
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.getAttribute('productId')}`)
        .then((response) => response.json())
        .then((data) => this.onFetchDataSuccess(data))
        .catch(() => this.setTemplate('error'));
    }

    onFetchDataSuccess(data) {
      this.setTemplate('success');
      this.setState(data);
    }
  }

  customElements.define('page-product', ProductPage);
});
