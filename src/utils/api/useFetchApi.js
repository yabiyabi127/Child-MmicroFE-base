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

    const makeRequest = useCallback(async (url, { method = 'get', config = {}, data = {}, persist=false, type=false } = {}) => {
        dispatch({type: 'LOADING', method: type || method});
        try {
            let val = null
            if(persist){
                val = await lf.getItem(url)
            }
            if(val === null){
                console.log("response : ", persist)
                const response = await httpRequest[method]({url, config, data})
                if(persist) {
                    await lf.setItem(url, JSON.stringify(response))
                }
                dispatch({type: 'SUCCESS', response, method: type || method});
            }
            else{
                const temp = await JSON.parse(await val)
                dispatch({type: 'SUCCESS', response: temp, method: type || method});
            }
        } catch (e) {
            
            dispatch({type: 'ERROR', response: e, method: type || method});
        } finally {
            // return httpRequest.clean()
        }
    }, []);


    return [state, makeRequest];
};

export default useApiRequest;