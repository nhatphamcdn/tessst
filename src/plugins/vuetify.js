import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import th from "vuetify/es5/locale/th";
import en from "vuetify/es5/locale/en";
import { loadFonts } from "./webfontloader";

loadFonts();
Vue.use(Vuetify);

const opts = {
  lang: {
    locales: { th, en },
    current: "en",
  },
  theme: {
    options: {
      customProperties: true,
      theme: {
        disabled: true,
      },
    },
  },
};
export default new Vuetify(opts);
