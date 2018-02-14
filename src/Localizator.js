import { deepGet } from './utils';
import { createFilter } from './filter';
import { applyMixin, bus } from './mixin';
import { logger } from './logger';

const OPEN_ELEMENT = '{%';
const CLOSE_ELEMENT = '%}';

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

export class Localizator {
  constructor({ language, dictionary, preventFallback = false } = {}) {
    const userLang = navigator.language || navigator.userLanguage;
    
    this.language = language || userLang.substring(0, 2) || 'en';
    this._dictionary = dictionary || {};
    this.preventFallback = preventFallback;
  }

  static install(Vue, localizatorInstance) {
    applyMixin(Vue);
    createFilter(Vue, localizatorInstance);
  }

  setLanguage(newLanguage) {
    this.language = newLanguage;
    bus.$emit('lang-changed', newLanguage);
  }

  translate(key, language = this.language) {
    if (!this._dictionary[language]) {
      logger.warn(`Requested translate language ${language} is missing!`);
      const fallbackLanguage = Object.keys(this._dictionary)[0];
      logger.warn(`Fallback language is ${fallbackLanguage}`);
      if (this.preventFallback) {
        return;
      }
      language = fallbackLanguage;
    }
    const lang = this._dictionary[language];
    if (!lang[key]) {
      logger.warn(`${key} not found in ${language}`);
      return;
    }
    const result = deepGet(lang, key, key);
    return result;
  }
}
