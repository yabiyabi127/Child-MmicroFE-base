import a from "axios";
import url from "url";
import { getAccessHeader } from "./DataUser";

const {REACT_APP_API_SELECTOR } = process.env
const additional_path='/v2' // dikarenakan pemanggilan API key menggunakan pathname awal maka yg /v2 harus dihilangkan
                            // karena kalau tidak yg ke ambil jadi v2 dan hasilnya keynya jadi undefined  

let cancelToken;



// const flag = window.location.origin === "http://localhost:3000"
class HttpRequest {
    getPath(uri) {
        return url
            .parse(uri)
            // .pathname.replace("-", "_")
            .pathname.replace('-', '_').replace(additional_path, '')
            .split("/")[1]
            .toLowerCase();
    }

    apiWhitelist(uri = '') {
        const prod = ['sce_ws', 'amws', 'hdfs', 'interchange', 'newCekFaktur', 'integrasimanifes']
        // const prod = ['amws', 'hdfs', 'interchange', 'referensi','parser','v1','formulir','report-service']
        const dev = ['']
        // const dev = ['sce_ws']
        const path = this.getPath(uri)
        const listProd = prod.filter(e => path === e).length > 0
        const listDev = dev.filter(e => path === e).length > 0
        return ({ listProd, listDev })
    }

    urlSelector(uri = '') { 
        const { listProd, listDev } = this.apiWhitelist(uri)
        const pathname = url.parse(uri).pathname
        const query = url.parse(uri).search
        return ((( !listDev) || listProd) ? uri
                : `${REACT_APP_API_SELECTOR}${pathname || ''}${query || ''}`)
    }

    getToken(url) {
        const { listProd, listDev } = this.apiWhitelist(url)
        const path = this.getPath(url),
            {
    
                REACT_APP_API_AWMS_DEV_KEY,
				REACT_APP_API_RUSH_HANDLING_DEV_KEY,
                
            } = process.env,
            token = {
                //    rushhandling: newProds ? REACT_APP_API_ALL_V2_KEY : newDevs ? REACT_APP_API_ALL_V2_DEV_KEY : prod ? REACT_APP_API_ALL_KEY : REACT_APP_API_RUSH_HANDLING_DEV_KEY
            }


        // if (path === 'amws') return {headers: {}}
        // else if (!token[path]) return false
        return {
            headers: {
                "Beacukai-Api-Key": token[path]
            }
        }
    }

    mergeRecursive(obj1, obj2) {

        if (!obj1) return obj2
        for (let p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor === Object) {
                    obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];

                }

            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    async get(resourceHttpRequest) {
        cancelToken = a.CancelToken.source();
        let accesstToken
        try {
            accesstToken = await getAccessHeader()
        } catch (e) {
            accesstToken = { headers: {} }
        }
        const { url, config } = resourceHttpRequest,
            token = this.getToken(url)

        if (this.getPath(url) === 'browse_service') {
            return a.get(this.urlSelector(url), { ...this.mergeRecursive(this.mergeRecursive(config, token)) })
        } else if (!token) {
            return a.get(url, config)
        }
        // CreateLog.set(3, {urldata: url})
        return a.get(this.urlSelector(url), { ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken) })
    }

    async post(resourceHttpRequest) {
        cancelToken = a.CancelToken.source();
        let accesstToken
        try {
            accesstToken = await getAccessHeader()
        } catch (e) {
            accesstToken = { headers: {} }
        }
        const { url, config, data } = resourceHttpRequest,
            token = this.getToken(url)
        // if (url !== 'https://api.beacukai.go.id/amws/v1/user-log/add') {
        //   CreateLog.set(2, {urldata: url})
        // }
        if (this.getPath(url) === 'service_modul') {
            return a.post(this.urlSelector(url), data, { ...this.mergeRecursive(this.mergeRecursive(config, token)) })
        }
        return a.post(this.urlSelector(url), data, { ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken) })
    }

    async put(resourceHttpRequest) {
        cancelToken = a.CancelToken.source();
        let accesstToken
        try {
            accesstToken = await getAccessHeader()
        } catch (e) {
            accesstToken = { headers: {} }
        }
        const { url, config, data } = resourceHttpRequest,
            token = this.getToken(url)
        // CreateLog.set(4, {urldata: url})
        return a.put(this.urlSelector(url), data, { ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken) })
    }

    async delete(resourceHttpRequest) {
        cancelToken = a.CancelToken.source();
        let accesstToken
        try {
            accesstToken = await getAccessHeader()
        } catch (e) {
            accesstToken = { headers: {} }
        }
        const { url, config } = resourceHttpRequest,
            token = this.getToken(url)
        // CreateLog.set(5, {urldata: url})
        return a.delete(this.urlSelector(url), { ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken) })
    }

    clean() {
        if (cancelToken)
            cancelToken.cancel("cancel request");
    }

}

export default new HttpRequest();