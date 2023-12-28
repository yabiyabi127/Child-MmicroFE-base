import { get, isArray, isEmpty } from "lodash"

// const ref = [
//     {
//       data: res.data[1],
//       key: 'kodeDokumen',
//       render: e => (get(e, 'namaDokumen', ''))
//       field: 'data.data'
//     }
//   ]

export function joinRef(ref=[], data=[]) {
    const val = (!isEmpty(data) && isArray(data)) ? data : []
    return val.map(e => {
        let res = e
        ref.map(({ data = [], field = 'data.data', key = '', ref = '', render = () => (''), target= '' }) => {
                const temp = get(data, `${field}`, [])
                const dataTemp = temp.find(b => (String(b[ref?ref:key]).toUpperCase() === String(e[key]).toUpperCase()))
                console.log('joinref', key, {dataTemp, temp, e});
                if(dataTemp !== null)
                    res = { ...res, [target]: render(dataTemp) }
                return 0
            })
        return({...e, ...res})
    })
}