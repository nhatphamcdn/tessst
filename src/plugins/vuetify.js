import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import locales from "@/locales/locales";
import config from "@/config/app.config";

Vue.use(Vuetify);

const opts = {
  lang: {
    locales: locales,
    current: config?.settings?.locale || "en",
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
