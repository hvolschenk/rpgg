class WebComponentBase extends HTMLElement {
  constructor() {
    super();
    this.state = {};
  }

  setState(newState) {
    Object
      .entries(newState)
      .forEach(([key, value]) => {
        this.state[key] = value;
        this._updateDataBindingsForKey(key);
      });
  }

  setTemplate(templateName) {
    const $templateOutlet = this.shadowRoot.getElementById('template-outlet');
    if ($templateOutlet === null) {
      throw new Error('Template outlet not found: <div id="template-outlet"></div>');
    }
    const $newTemplate = this.shadowRoot.getElementById(`template-${templateName}`);
    if ($newTemplate === null) {
      throw new Error(`Template not found: <template id="template-${templateName}"></template>`);
    }
    while ($templateOutlet.firstChild) {
      $templateOutlet.removeChild($templateOutlet.firstChild);
    }
    $templateOutlet.appendChild($newTemplate.content.cloneNode(true));
  }

  _updateDataBindingsForKey(key) {
    this.shadowRoot.querySelectorAll(`[data-bind="${key}"]`).forEach((node) => {
      node.innerText = this.state[key];
    });
  }
}

export default WebComponentBase;
