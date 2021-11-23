import { createStore } from "vuex";
import { isAfter, addDays, format } from 'date-fns';

export default createStore({
    state: {
        daysModeled: 40,
        daysBackForReference: 5,
        // 5 days back in future
        occupationReference: 402,
        timeline: [],
        r: [],
        daysBeforeHospitalization: 15,
        lengthOfStay: 16,
        icPercentage: 0.33
    },
    getters: {
        occupation(state) {
            const getR = (date) => {
                const d = new Date(date);
                for (let i = state.r.length -1; i >= 0; i--) {
                    const item = state.r[i];
                    if (isAfter(d, new Date(item.date))) {
                        // todo take average of next
                        return item.r;
                    }
                }
                return 1;
            }

            const getDate = (i) => {
                const date = addDays(new Date(state.timeline[0].date), i);
                return format(date, "yyyy-MM-dd")
            }

            const getExpandedTimeline = () => {
                const timeline = [];
                for (let i = 0; i < state.timeline.length + state.daysModeled; i++) {
                    if (i < state.timeline.length) {
                        timeline.push(state.timeline[i])
                    } else {
                        const date = timeline[i - 7].date;
                        const r = getR(date);
                        const growthPerWeek = Math.pow(r, (4/7));
                        const infectionsPreviousWeek = timeline[i - 7].infections;
                        const item = {
                            infections: Math.round(infectionsPreviousWeek * growthPerWeek),
                            date: getDate(i)
                        }
                        timeline.push(item);
                    }
                }
                return timeline;
            }

            const getOccupation = (icIn, icOut, i) => {
                let lastOccupation;
                if (i === 0) {
                    lastOccupation = state.occupationReference;
                } else {
                    lastOccupation = set[set.length - 1].occupation;
                }

                return lastOccupation + icIn - icOut;
            }

            const getInfections = (dayIndex) => {
                return expandedTimeline[dayIndex].infections
            }

            const getIcIn = (currentDayIndex) => {
                const dayIndexForIn = currentDayIndex - state.daysBeforeHospitalization;
                const infections = getInfections(dayIndexForIn);
                return Math.round(infections * (state.icPercentage / 100));
            }

            const getIcOut = (currentDayIndex) => {
                const dayIndexForOut = currentDayIndex - (state.daysBeforeHospitalization + state.lengthOfStay);
                const infections = getInfections(dayIndexForOut);
                return Math.round(infections * (state.icPercentage / 100))
            }

            const set = [];
            const todayIndex = state.timeline.length;
            const startingDay = todayIndex - state.daysBackForReference;
            const expandedTimeline = getExpandedTimeline();

            for (let i = 0; i < state.daysModeled + state.daysBackForReference; i++) {
                const item = {};
                const currentDayIndex = startingDay + i;
                const icIn = getIcIn(currentDayIndex);
                const icOut = getIcOut(currentDayIndex);
                item.date = expandedTimeline[currentDayIndex].date;
                item.icIn = icIn;
                item.icOut = icOut;
                item.occupation = getOccupation(icIn, icOut, i)
                set.push(item);
            }

            // todo strip the first 5 days
            return set;
        }
    },
    mutations: {
        setProperty(state, payload) {
            state[payload.key] = payload.value;
        },
        updateR(state, payload) {
            const unMeasured = state.r.filter(r => !r.measured);
            const item = unMeasured[payload.index];
            item.r = payload.value;
        }
    },
    actions: {},
    modules: {},
});
