import { CSA_PageLoader } from "./modules/pageloader.js";
import { CSA_Reactor } from "./modules/reactor.js";

export class CSA {
  constructor () {
    console.log(`CSA initialized - ready to use!`);
  }

  PageLoader = CSA_PageLoader;
  Reactor = CSA_Reactor;

  #modules = {}

  at = (key, value) => {
    if (this.#modules[key]) {
      console.log(`CSA.at: Module ${key} found, returned.`);
      
      return this.#modules[key];
    }

    this.#modules[key] = value;
  }
}