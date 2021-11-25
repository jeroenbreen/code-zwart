import axios from "axios";
import csvToJson from 'csvtojson';

export const getJson = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url,{ responseType: 'blob',})
            .then((response) => {
                const file = response.data;
                file.text().then((csvStr) => {
                    csvToJson()
                        .fromString(csvStr)
                        .then((jsonObj)=>{
                            resolve(jsonObj);
                        });
                })
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const getTimeline = (json, days) => {
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
