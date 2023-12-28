import { differenceWith, isEqual } from "lodash";

export function diffArray(src=[], trg=[]) {
    return differenceWith(src, trg, isEqual)
}