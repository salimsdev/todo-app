import { useReducer, useEffect } from 'react';

function useLocalStorageReducer(key, defaultVal, reducer) {
    //  Make piece of state based off of value in localstorage (or default)
    const [state, dispatch] = useReducer(reducer, defaultVal, () => {
        let val;
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        } catch (e) {
            val = defaultVal;
        }
        return val;
    });
    // use useEffect to update localstorage when state changes
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return [state, dispatch];
};

export default useLocalStorageReducer;