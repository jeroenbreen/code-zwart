import axios from "axios";
import csvToJson from "csvtojson";

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
