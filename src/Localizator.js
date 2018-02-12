import applyMixin from './mixin';
import createDirective from './directive';

export class Localizator {
  constructor({ language, dictionary } = {}) {
    this.language = language || 'en';
    this.dictionary = dictionary || {};

    console.log(this);
  }

  static install(Vue, options = {}) {
    Localizator.userKey = options.languageKey || 'localizatorLanguage';
    const mixinOptions = {
      key: Localizator.userKey,
    };

    applyMixin(Vue, mixinOptions);
    createDirective(Vue);
  }

  directiveTrigger(el, binding, vnode) {
    console.log(el);
    console.log(binding);
    console.log(vnode);
    console.log(this);
  }
}
