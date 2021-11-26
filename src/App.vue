<script>
import Tools from "./components/Tools";
import R from "./components/R/R";
import Occupation from "./components/occupation/Occupation";
import {useStore} from "vuex";
import Infections from "./components/infections/Infections";
import { getJson, getTimeline, getRTimeline } from "@/utils/csv";
import { ref } from "vue";

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
        const loaded = ref(false);

        getJson("https://raw.githubusercontent.com/mzelst/covid-19/master/data/municipality-totals.csv").then((data) => {
            const days = store.state.weeksSource * 7;
            const timeline = getTimeline(data, days);
            const rTimeline = getRTimeline(timeline, store.state.weeksModeled);
            console.log(rTimeline);
            store.commit("setProperty", {key: "source", value: timeline});
            store.commit("setProperty", {key: "rTimeline", value: rTimeline});
            loaded.value = true;
        })

        return {
            loaded
        };
    },
};
</script>

<template>
    <div
        class="main"
        v-if="loaded">
        <R/>
        <Infections/>
        <Occupation/>
        <Tools/>
    </div>

</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

.main {
    width: 600px;
    font-family: Arial, sans-serif;

    h3 {
        margin-bottom: 0;
    }
}
</style>
