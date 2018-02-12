function init() {
  const options = this.$options;
  // localizator injection
  if (options.localizator) {
    this.$localizator = typeof options.localizator === 'function'
      ? options.localizator()
      : options.localizator;
  } else if (options.parent && options.parent.$localizator) {
    this.$localizator = options.parent.$localizator;
  }
}

export default function (Vue, options) {
  const version = Number(Vue.version.split('.')[0]);

  if (version < 2) {
    throw new Error('The required VueJS version is 2+');
  }

  const userKey = options.key;

  Vue.mixin({
    beforeCreate: init,
    data() {
      return {
        [userKey]: '',
      };
    },
  });
}
