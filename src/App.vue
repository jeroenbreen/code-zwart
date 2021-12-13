<script>
import Tools from "./components/Tools";
import R from "./components/R/R";
import Occupation from "./components/occupation/Occupation";
import {useStore} from "vuex";
import Infections from "./components/infections/Infections";
import { getJson, aggregate } from "@/utils/source";
import { ref } from "vue";
// import {dateToLabel} from "./utils/date";
// import { differenceInDays } from "date-fns";

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
        console.log(store);

        const getToday = (data) => {
            const nl = data[0];
            let date = "";
            for (const key in nl) {
                date = key;
            }
            return date;
        }

        getJson("https://raw.githubusercontent.com/mzelst/covid-19/master/data-dashboards/cases_ggd_agegroups.csv").then((data) => {
            const agg = aggregate(data);
            console.log(agg);
        })

        getJson("https://raw.githubusercontent.com/mzelst/covid-19/master/data/municipality-totals.csv").then((data) => {
            const today = getToday(data);
            const startingDay = "2021-06-08";
            const weeks = Math.floor(differenceInDays(new Date(today), new Date(startingDay)) / 7);
            store.commit("setProperty", {key: "weeksSource", value: weeks});
            const days = 7 * weeks;
            const sourceTimeline = getSourceTimeline(data, days);
            const todayLabel = dateToLabel(sourceTimeline[sourceTimeline.length - 1].date);
            store.commit("setProperty", {key: "todayLabel", value: todayLabel});
            const rTimeline = getRTimeline(sourceTimeline, store.state.weeksModeled);
            store.commit("setProperty", {key: "sourceTimeline", value: sourceTimeline});
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
                            occupation: Number(item.IC_Bedden_COVID_Nederland)
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
                const occupationReference = Number(item.IC_Bedden_COVID_Nederland);
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
