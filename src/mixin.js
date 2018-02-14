export let bus = {}; // eslint-disable-line import/no-mutable-exports

function init() {
  const options = this.$options;
  // localizator injection
  if (options.localizator) {
    this.$localizator = options.localizator;
  } else if (options.parent && options.parent.$localizator) {
    this.$localizator = options.parent.$localizator;
  }
}

export function applyMixin(Vue) {
  const version = Number(Vue.version.split('.')[0]);

  if (version < 2) {
    throw new Error('The required VueJS version is 2+');
  }

  bus = new Vue();

  Vue.mixin({
    beforeCreate: init,
    mounted() {
      bus.$on('localizator-update', () => {
        this.$forceUpdate();
      });
    },
  });
}
