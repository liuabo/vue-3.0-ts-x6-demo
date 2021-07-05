import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { components, plugins } from "./lib/elementUi";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.use(store).use(router).mount("#app");
