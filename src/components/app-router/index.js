import { match } from 'https://unpkg.com/path-to-regexp?module';

class AppRouter extends HTMLElement {
  constructor() {
    super();
    this.activeRoute = null;
    window.addEventListener('popstate', this.handlePopstate);
  }

  connectedCallback() {
    this.navigate(window.location.pathname);
  }

  disconnectedCallback() {
    window.removeEventlistener('popstate', this.handlePopstate);
  }

  get $outlet() {
    const $outlets = Array
      .from(this.querySelectorAll('app-router-outlet'))
      .filter((node) => node.parentNode === this);
    if ($outlets.length === 0) {
      throw new Error('Router outlet not found: <app-router-outlet></app-router-outlet>');
    }
    return $outlets[0];
  }

  get routes() {    
    return Array.from(this.querySelectorAll('app-router-route'))
      .filter((node) => node.parentNode === this)
      .map((route) => ({
        component: route.getAttribute('component'),
        id: route.getAttribute('id'),
        parameters: route.getAttribute('parameters'),
        path: route.getAttribute('path'),
      }));
  }

  getMatchedRoute(url) {
    let matchedRoute;
    for (let routeIndex = 0; routeIndex < this.routes.length; routeIndex += 1) {
      const currentRoute = this.routes[routeIndex];
      const matcher = match(currentRoute.path);
      const currentMatch = matcher(url);
      if (currentMatch !== false) {
        matchedRoute = { ...currentRoute, parameters: currentMatch.params };
        break;
      }
    }
    return matchedRoute;
  }

  handlePopstate = () => {
    this.navigate(window.location.pathname);
  }

  navigate(url) {
    const matchedRoute = this.getMatchedRoute(url);
    if (matchedRoute) {
      this.activeRoute = matchedRoute;
      window.history.pushState(null, matchedRoute.id, url);
      this.update();
    }
  }

  update() {
    if (this.activeRoute) {
      const { component, id, parameters } = this.activeRoute;
      while (this.$outlet.firstChild) {
        this.$outlet.removeChild(this.$outlet.firstChild);
      }
      import(`/pages/${id}/index.js`).then(() => {
        const $view = document.createElement(component);
        Object.keys(parameters || {}).forEach((parameterKey) => {
          $view.setAttribute(parameterKey, parameters[parameterKey]);
        });
        this.$outlet.appendChild($view);
      });
    }
  }
}

customElements.define('app-router', AppRouter);
