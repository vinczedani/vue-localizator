import { deepGet, mergeDeep } from './utils';
import { createFilter } from './filter';
import { applyMixin, bus } from './mixin';
import { Logger } from './logger';

function refreshTranslations() {
  bus.$emit('localizator-update');
}

export class Localizator {
  constructor({ language, dictionary, preventFallback = false } = {}) {
    const userLang = navigator.language || navigator.userLanguage; // eslint-disable-line no-undef

    this.language = language || userLang.substring(0, 2) || 'en';
    this.dictionary = dictionary || {};
    this.preventFallback = preventFallback;
  }

  static install(Vue, localizatorInstance) {
    applyMixin(Vue);
    createFilter(Vue, localizatorInstance);
  }

  // public
  getAvailableLanguages() {
    return Object.keys(this.dictionary);
  }

  // public
  expandDictionary(newDictionary) {
    this.dictionary = mergeDeep(this.dictionary, newDictionary);
    refreshTranslations();
  }

  // public
  setLanguage(newLanguage) {
    this.language = newLanguage;
    refreshTranslations();
  }

  // public
  translate(key, language = this.language) {
    const fallbackLanguage = Object.keys(this.dictionary)[0];

    if (!this.dictionary[language]) {
      Logger.warn(`Requested translate language ${language} is missing!`);
      Logger.warn(`Fallback language is ${fallbackLanguage}`);
      if (this.preventFallback) {
        return key;
      }
      return this.translate(key, fallbackLanguage);
    }
    const lang = this.dictionary[language];
    const result = deepGet(lang, key, key);

    if (result === key) {
      Logger.warn(`${key} not found in ${language}!`);
      if (!this.preventFallback) {
        Logger.warn(`Trying with ${fallbackLanguage}.`);
        return this.translate(key, fallbackLanguage);
      }
    }

    return result;
  }
}
