export class CSA_PageLoader {
  constructor (trustedSources) {
    this.#trustedSources.concat(trustedSources || []);
    console.log(`CSA PageLoader initialized - ready to use!`);
  }

  #trustedSources = []

  #connectedElement = null;
  #applyToAnchors = null;
  #resultHtmlQuerySelector = null;
  #loadingElement = null;
  connect = ({ connectedElement, resultQuerySelector, loadingElement, applyToAnchors }) => {
    this.#connectedElement = connectedElement;
    this.#applyToAnchors = applyToAnchors;
    this.#resultHtmlQuerySelector = resultQuerySelector;
    this.#loadingElement = loadingElement;
    
    if (this.#applyToAnchors) {      
      const anchors = [...document.querySelectorAll('a')].filter(this.#applyToAnchors);
      
      anchors.forEach(async (anchor) => {
        anchor.onclick = async (e) => {
          e.preventDefault();
          await this.load(anchor.href);
        };
      });
    }
  }

  load = async (url) => {
    if (!this.#connectedElement) {
      console.error('CSA ERROR: CSA.PageLoader.load > CSA.PageLoader.connectedElement is null.\nHint: set it using the CSA.PageLoader.connect.');
      return;
    }

    if (this.#loadingElement) {
      const a = document.querySelector(this.#loadingElement);
      const b = a.cloneNode(true);
      b.removeAttribute('hidden');
      // console.log(b);
      
      this.#connectedElement.innerHTML = b.outerHTML;
    }

    const res = await fetch(url);
    const html = await res.text();
    
    const dp = new DOMParser()
    const parsed = dp.parseFromString(html, 'text/html').querySelector(this.#resultHtmlQuerySelector || this.#connectedElement);
    this.#connectedElement.innerHTML = parsed.innerHTML;
    const scripts = parsed.querySelectorAll('script');
    scripts.forEach(script => {
      // TODO: scr, trustedSources...
      const newScript = document.createElement('script');
      newScript.innerHTML = script.innerHTML;
      this.#connectedElement.appendChild(newScript);
      // script.remove()
    });
    // scripts.forEach(script => script.remove());
    
    if (this.#applyToAnchors) {
      const anchors = [...document.querySelectorAll('a')].filter(this.#applyToAnchors);
      anchors.forEach(anchor => {
        anchor.onclick = async (e) => {
          e.preventDefault();
          await this.load(anchor.href);
        };
      });
    }
  }
}