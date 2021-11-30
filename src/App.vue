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
            store.commit("setProperty", {key: "source", value: timeline});
            store.commit("setProperty", {key: "rTimeline", value: rTimeline});
            loaded.value = true;
            loadOccupation();
        })

        const loadOccupation = () => {
            getJson("https://raw.githubusercontent.com/mzelst/covid-19/master/data/lcps_by_day.csv").then((data) => {
                const realOccupation = [];
                const timeline = store.getters.timeline;
                for (const day of timeline) {
                    const item = data.find(d => d.date === day.date);
                    if (item) {
                        realOccupation.push({
                            date: day.date,
                            occupation: Number(item.IC_Bedden_COVID)
                        });
                    } else {
                        // console.log("not found", day.date);
                        realOccupation.push({
                            date: day.date,
                            occupation: 0
                        });
                    }
                }
                // strip values
                for (let i = realOccupation.length - 1; i > 0; i--) {
                    const item = realOccupation[i];
                    if (item.occupation === 0) {
                        realOccupation.splice(i, 1);
                    } else {
                        break;
                    }
                }
                store.commit("setProperty", {key: "realOccupation", value: realOccupation});
                setOccupationReference(data, timeline[0].date);
            })
        }

        const setOccupationReference = (data, date) => {
            const item = data.find(d => d.date === date);
            if (item) {
                const occupationReference = Number(item.IC_Bedden_COVID);
                store.commit("setProperty", {key: "occupationReference", value: occupationReference});
            }
        }



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
