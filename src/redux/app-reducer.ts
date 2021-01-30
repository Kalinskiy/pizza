const initialState = {
    isLoaded: false
}
export type SetPreloaderType = ReturnType<typeof setPreloader>
type ActionTypes = SetPreloaderType

export const appReducer = (state = initialState, action:ActionTypes) => {
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
export const setPreloader = (preloader:boolean) => ({type: 'SET_PRELOADER', payload: preloader})

//thunk

export default appReducer;