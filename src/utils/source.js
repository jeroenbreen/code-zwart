import {addDays, format} from "date-fns";

export const aggregate = (data) => {
    const timeline = [];

    const hasRightAgegroup = (string) => {
        const first = Number(string[0]);
        return first >= 6 && first < 8;
    }

    const getDay = (date) => {
        return timeline.find(d => d.date === date);
    }

    for (const item of data) {
        if (hasRightAgegroup(item.age_group)) {
            let day = getDay(item.date);
            if (!day) {
                day = { date: item.date, infections: 0 };
                timeline.push(day);
            }
            day.infections += Number(item.cases);
        }
    }

    return timeline;
}

export const stripTimeline = (timeline, days) => {
    return timeline.splice(timeline.length - days, days);
}

export const getSourceTimeline = (json, days) => {
    let timeline = [];
    let previousInfections = 0;
    const nl = json[0];
    delete nl.population;
    delete nl.field1;
    delete nl.Municipality_name;
    delete nl.Municipality_code;
    for (const key in nl) {
        const item = {
            date: key,
            infections: Number(nl[key]) - previousInfections
        }
        timeline.push(item);
        previousInfections = Number(nl[key]);
    }
    timeline = timeline.splice(timeline.length - days, days);
    return timeline;
}

export const getRTimeline = (timeline, weeksModeled) => {
    const rTimeline = [];
    let counter = 0;
    let date = timeline[0].date;
    let infections = 0;
    let weekCounter = 0;
    for (const day of timeline) {
        infections += day.infections;
        if (counter === 0) {
            date = day.date;
        }

        if (counter === 6) {
            const week = {
                infections,
                date,
            }
            rTimeline.push(week);
            infections = 0;
            counter = -1;
        }
        counter++;
    }
    for (const week of rTimeline) {
        if (weekCounter === 0) {
            week.r = null;
        } else {
            const growth = week.infections / rTimeline[weekCounter - 1].infections;
            week.r = Math.round(Math.pow(growth, (4 / 7)) * 100) / 100;
        }
        week.measured = true;
        weekCounter++;
    }
    const referenceDate = rTimeline[rTimeline.length - 1].date;
    for (let i = 0, l = weeksModeled; i < l; i++) {
        const d = format(addDays(new Date(referenceDate), (i + 1) * 7), "yyyy-MM-dd");
        rTimeline.push({
            date: d,
            r: 0.9,
            measured: false
        })
    }
    return rTimeline;
}
