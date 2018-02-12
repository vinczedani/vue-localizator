export default function (Vue) {
  Vue.directive('local', {
    bind: (el, binding, vnode) => {
      const localizator = vnode.context.$localizator;
      localizator.directiveTrigger(el, binding, vnode);
    },
    componentUpdated: (el, binding, vnode) => {
      const localizator = vnode.context.$localizator;
      localizator.directiveTrigger(el, binding, vnode);
    },
  });
}
