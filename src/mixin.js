export let bus = {};

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
    data() {
      return {
        localizatorLanguage: this.$localizator.language,
      };
    },
    watch: {
      localizatorLanguage(newLanguage) {
        this.$forceUpdate();
      }
    },
    mounted() {
      bus.$on('lang-changed', (newLanguage) => {
        this.localizatorLanguage = newLanguage;
      });
    },
  });
}
