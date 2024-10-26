export class CSA_Reactor {
  constructor () {
    console.log(`CSA Reactor initialized - ready to use!`);
  }

  #storage = {};

  set = (key, value) => {
    this.#storage[key] = value;
    this.#updateDisplay(key, value);
  }
  get = (key) => {
    return this.#storage[key];
  }

  #updateDisplay = (key, value) => {
    const elements = document.querySelectorAll(`[csa-reactor-key=${key}]`);
    elements.forEach(element => {
      element.innerText = value;
    });
  }
}