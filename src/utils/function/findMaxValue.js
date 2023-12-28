import { has, isArray } from "lodash";

export function findMax(data = [], key = '') {
    let max = 0;
    if(isArray(data)){
        data.forEach(e => {
            if(has(e, `${key}`)){
                if (e[key] > max) {
                    max = e[key];
                }
            }
        });
    }
    console.log('findMax', {data, key, max});
    return(max)
}