import htmlLoader from '/shared/html-loader.js';
import WebComponentBase from '/shared/web-component-base.js';

htmlLoader('/pages/products/index.html', (template) => {
  class ProductsPage extends WebComponentBase {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.setTemplate('loading');
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          this.setTemplate('success');
          this.renderProducts(data);
        })
        .catch(() => { this.setTemplate('error'); });
    }

    renderProducts(data) {
      const $list = document.createElement('ul');
      data.forEach((product) => {
        const $listItem = document.createElement('li');
        const $link = document.createElement('app-router-link');
        $link.innerText = product.title;
        $link.setAttribute('href', `/products/${product.id}`);
        $listItem.appendChild($link);
        $list.appendChild($listItem);
      });
      this.shadowRoot.getElementById('products-list').appendChild($list);
    }
  }

  customElements.define('page-products', ProductsPage);
});
