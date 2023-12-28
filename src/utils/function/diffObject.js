import { omitBy } from "lodash";

export function diffObject(src={}, dif={}) {
    return (omitBy(dif, function(v, k) {
        return src[k] === v;
    }))
}