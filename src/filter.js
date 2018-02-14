export function createFilter(Vue, localizatorInstance) {
  Vue.filter('translate', (input) => {
    if (!input) {
      return '';
    }
    return localizatorInstance.translate(input);
  });
}
