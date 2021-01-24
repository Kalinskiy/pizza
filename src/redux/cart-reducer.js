const initialState = {
    isLoaded: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_PRELOADER': {
            return {...state, isLoaded: action.payload}
        }
        default: {
            return state;
        }

    }


}
//action
export const setPreloader = (preloader) => ({type: 'SET_PRELOADER', payload: preloader})

//thunk

export default appReducer;