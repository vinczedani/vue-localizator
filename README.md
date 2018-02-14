# vue-localizator
Just another translate package for vue.js

# Install
```npm install vue-localizator```

# Usage
In main.js
```javascript
import Localizator from 'vue-localizator';

const localizator = new Localizator({
  dictionary: {
    en: {
      HELLO: 'Hello',
      SOME: { SUPER: { DEEP: { STUFF: 'World!' } } },
    },
    hu: {
      HELLO: 'Heló',
      SOME: { SUPER: { DEEP: { STUFF: 'Világ!' } } },
    },
  },
  language: 'en', // defaults to browser language then 'en'
  preventFallback: true, // defaults to false
});

Vue.use(Localizator, localizator);
```

in .vue file templates
```html
<span>{{ 'HELLO' | translate }}{{ 'WORLD' | translate }}</span>
```

in .vue script
```javascript
import { localizatorMixin } from 'vue-localizator';

export default {
  mixins: [localizatorMixin],
  methods: {
    onClick() {
      // overwrites the language provided in the constructor
      this.$localizator.setLanguage('hu');

      // deep merges the current dictionary with the new one
      this.$localizator.expandDictionary({
        en: {
          NEW: 'new',
        },
        hu: {
          NEW: 'új',
        }
      });

      // translates to a requested language
      // defaults language is the currently set language
      const newInHungarian = this.$localizator.translate('NEW', 'hu');
    },
  },
};
```
You need to use the mixin so your components update dynamically!
If you want to use the mixin as a global mixin. you can call the following.
```javascript
import { localizatorMixin } from 'vue-localizator';

Vue.mixin(localizatorMixin); // THIS IS DISCOURAGED!
```
This will affect every single component of yours to update on language change or dictionary update.
