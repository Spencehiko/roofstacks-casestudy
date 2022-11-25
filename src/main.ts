import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./index.css";

/* FONT AWESOME */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faHamburger);
/* END FONT AWESOME */

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
