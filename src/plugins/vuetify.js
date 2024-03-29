import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);

export default new Vuetify({theme: {
    themes: {
      light: {
        primary: "451C53", // #E53935
        secondary: "451C53", // #FFCDD2
        accent: colors.purple, // #3F51B5
      },
    },
  },
});
