import { keyBy, merge, values } from "lodash";

export function mergeObject(org={}, tgt={}, id=''){
    return (values(merge(
        keyBy(org, `${id}`),
        keyBy(tgt, `${id}`)
      )));
}