import { useReducer, useCallback } from 'react';
import httpRequest from '../HttpRequest';
import lf from 'localforage'

const initialState = {
    loading: false,
    data: '',
    error: '',
    type: 'get'
};

const reducer = (state = initialState, { type, response, method } = {}) => {
    switch (type) {
        case 'LOADING':
            return { 
                ...state,
                loading: true,
                data: '',
                error: '',
                type: method
            };
        case 'SUCCESS':
            return {  
                loading: false,
                data: response,
                error: '',
                type: method
            };
        case 'ERROR':
            return {  
                ...state,
                loading: false,
                error: response,
                type: method,
                data: '',
            };
        default:
            return state;
    }
};

const useApiRequest = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const makeRequest = useCallback((urls, type='get') => {
        dispatch({type: 'LOADING', method: type});
        let promises = urls.map(async ({url, method='get', data, config, persist=false}) => {
            let val = null
            if(persist){
                val = await lf.getItem(url)
            }
            if(val === null){
                const response = await httpRequest[method]({url, config, data})
                if(persist) {
                    await lf.setItem(url, JSON.stringify(response))
                }
                return response
            }
            else{
                return await JSON.parse(await val)
            }
        })
        
        

        Promise.all(promises).then(function(response){
            
            dispatch({type: 'SUCCESS', response, method: type});
            // return httpRequest.clean()
        }).catch(function(err){
        
            dispatch({type: 'ERROR', response: err, method: type});
            // return httpRequest.clean()
        })
    }, []);
    return [state, makeRequest];
};

export default useApiRequest;