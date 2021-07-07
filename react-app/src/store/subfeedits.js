const ALL_SUBFEEDITS = "subfeedits/ALL_SUBFEEDITS"
const ONE_SUBFEEDIT = "subfeedits/ONE_SUBFEEDIT"

const allSubfeedits = (subfeedits) => ({
    type: ALL_SUBFEEDITS,
    payload: subfeedits
})

const oneSubfeedit = (subfeedit) => ({
    type: ONE_SUBFEEDIT,
    payload: subfeedit
})

export const getAllSubfeedits = () => async (dispatch) => {
    const response = await fetch("/api/subfeedits/")
    const data = await response.json()
    dispatch(allSubfeedits(data))
    return data;
}

export const getOneSubfeedit = (id) => async (dispatch) => {
    const response = await fetch(`/api/subfeedits/${id}`);
    const data = await response.json();
    dispatch(oneSubfeedit(data));
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
        case ONE_SUBFEEDIT:
            newState = {
                subfeedits: state.subfeedits,
                subfeedit: action.payload.subfeedit
            }
            return newState;
        default:
            return state;
    }
}
