import {createStore} from "vuex";
import {addDays, format} from "date-fns";

export default createStore({
    state: {
        todayLabel: "",
        weeksSource: 0,
        weeksModeled: 8,
        occupationReference: 0,
        sourceTimeline: [],
        realOccupation: [],
        rTimeline: [],
        daysBeforeHospitalization: 12,
        lengthOfStay: 16,
        icPercentage: 0.3,
    },
    getters: {
        timeline(state) {
            const getR = (weekIndex) => {
                return state.rTimeline[weekIndex].r
            };

            const getDate = (i) => {
                const date = addDays(new Date(state.sourceTimeline[0].date), i);
                return format(date, "yyyy-MM-dd");
            };

            const getExpandedTimeline = () => {
                const timeline = [];
                for (let i = 0; i < state.sourceTimeline.length + (7 * state.weeksModeled); i++) {
                  const weekIndex = Math.floor(state.weeksSource + (i - state.sourceTimeline.length) / 7);
                  const r = getR(weekIndex);
                    if (i < state.sourceTimeline.length) {
                        const item = {...state.sourceTimeline[i]};
                        item.r = r;
                        timeline.push(item);
                    } else {
                        const growthPerWeek = Math.pow(r, 7 / 4);
                        const infectionsPreviousWeek = timeline[i - 7].infections;
                        const item = {
                            infections: Math.round(infectionsPreviousWeek * growthPerWeek),
                            date: getDate(i),
                            modeled: true,
                            r
                        };
                        timeline.push(item);
                    }
                }
                return timeline;
            };

            const getOccupation = (icIn, icOut, i) => {
                let lastOccupation;
                if (i === 0) {
                    lastOccupation = state.occupationReference;
                } else {
                    lastOccupation = set[set.length - 1].occupation;
                }

                return lastOccupation + icIn - icOut;
            };

            const getInfections = (dayIndex) => {
                return expandedTimeline[dayIndex].infections;
            };

            const getIcIn = (currentDayIndex) => {
                const dayIndexForIn = currentDayIndex - state.daysBeforeHospitalization;
                const infections = getInfections(dayIndexForIn);
                return Math.round(infections * (state.icPercentage / 100));
            };

            const getIcOut = (currentDayIndex) => {
                const dayIndexForOut =
                    currentDayIndex -
                    (state.daysBeforeHospitalization + state.lengthOfStay);
                const infections = getInfections(dayIndexForOut);
                return Math.round(infections * (state.icPercentage / 100));
            };

            const set = [];
            const startingDay = state.daysBeforeHospitalization + state.lengthOfStay;
            const expandedTimeline = getExpandedTimeline();

            for (let i = 0; i < (7 * (state.weeksModeled + state.weeksSource) - startingDay); i++) {
                const item = {};
                const currentDayIndex = startingDay + i;
                const icIn = getIcIn(currentDayIndex);
                const icOut = getIcOut(currentDayIndex);
                item.date = expandedTimeline[currentDayIndex].date;
                item.r = expandedTimeline[currentDayIndex].r;
                item.modeled = expandedTimeline[currentDayIndex].modeled;
                item.icIn = icIn;
                item.icOut = icOut;
                item.occupation = getOccupation(icIn, icOut, i);
                item.infections = getInfections(currentDayIndex);
                set.push(item);
            }
            return set;
        },
    },
    mutations: {
        setProperty(state, payload) {
            state[payload.key] = payload.value;
        },
        updateR(state, payload) {
            const unMeasured = state.rTimeline.filter((r) => !r.measured);
            const item = unMeasured[payload.index];
            item.r = payload.value;
        },
    },
    actions: {},
    modules: {},
});
