<script>
import Tools from "./components/Tools";
import R from "./components/R/R";
import Occupation from "./components/occupation/Occupation";
import {useStore} from "vuex";
import Infections from "./components/infections/Infections";
import { getJson, getTimeline } from "@/utils/csv";
import { ref } from "vue";
import { getWeek } from "date-fns";

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
        const expectedR = [1.1, 1.00, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95];

        getJson("https://raw.githubusercontent.com/mzelst/covid-19/master/data/municipality-totals.csv").then((data) => {
            const days = store.state.weeksSource * 7;
            const timeline = getTimeline(data, days);
            const today = timeline[timeline.length - 1].date;
            const week = getWeek(new Date(today));
            store.commit("setProperty", {key: "week", value: week});
            store.commit("setProperty", {key: "source", value: timeline});
            const r = [];
            for (let i = 0; i < store.state.weeksModeled; i++) {
                let w = (i + week);
                if (w > 52) {
                    w -= 52;
                }
                r.push({r: expectedR[i], label: "week " + w});
            }
            store.commit("setProperty", {key: "r", value: r});
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
