const ALL_SUBFEEDITS = "subfeedits/ALL_SUBFEEDITS"

const allSubfeedits = (subfeedits) => ({
    type: ALL_SUBFEEDITS,
    payload: subfeedits
})

export const getAllSubfeedits = () => async (dispatch) => {
    const response = await fetch("/api/subfeedits/")
    const data = await response.json()
    dispatch(allSubfeedits(data))
    return data;
}

const initialState = {
    subfeedits: {},
    subfeedit: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case ALL_SUBFEEDITS:
            newState = {
                subfeedits: {},
                subfeedit: state.subfeedit
            }
            action.payload.subfeedits.forEach(subfeedit => {
                newState.subfeedits[subfeedit.id] = subfeedit
            })
            return newState;
        default:
            return state;
    }
}
