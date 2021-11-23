<script>

import Tools from "./components/Tools";
import R from "./components/R/R";
import Occupation from "./components/occupation/Occupation";
import {useStore} from "vuex";

export default {
    name: "App",
    components: {
        Occupation,
        R,
        Tools
    },
    setup() {
        const store = useStore();
        store.commit("setProperty", { key: "timeline", value: window.infections})
        store.commit("setProperty", { key: "r", value: window.r})
        return {}
    }
};
</script>

<template>
    <Tools/>
    <R/>
    <Occupation/>
</template>


<style lang="scss">
* {
    box-sizing: border-box;
}
#app {
    font-family: Arial, sans-serif;
}
</style>
