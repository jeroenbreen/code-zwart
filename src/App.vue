<script>
import Tools from "./components/Tools";
import R from "./components/R/R";
import Occupation from "./components/occupation/Occupation";
import { useStore } from "vuex";
import Infections from "./components/infections/Infections";

export default {
  name: "App",
  components: {
      Infections,
    Occupation,
    R,
    Tools,
  },
  setup() {
    const store = useStore();
    store.commit("setProperty", { key: "source", value: window.source });
    const r = [];
    for (let i = 0; i < store.state.weeksModeled; i++) {
        r.push({ r: window.expectedR[i], label: "week " + i });
    }
    store.commit("setProperty", { key: "r", value: r });
    return {};
  },
};
</script>

<template>
  <R />
  <Infections />
  <Occupation />
  <Tools />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Arial, sans-serif;

    h3 {
        margin-bottom: 0;
    }
}
</style>
