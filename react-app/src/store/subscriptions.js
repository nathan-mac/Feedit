const USER_SUBSCRIPTIONS = "subscriptions/USER_SUBSCRIPTIONS"
const ADD_SUBSCRIPTION = "subscriptions/ADD_SUBSCRIPTION"
const REMOVE_SUBSCRIPTION = "subscriptions/REMOVE_SUBSCRIPTION"

const userSubscriptions = (subscriptions) => ({
    type: USER_SUBSCRIPTIONS,
    payload: subscriptions
})

const addSubscription = (subscription) => ({
    type: ADD_SUBSCRIPTION,
    payload: subscription
})

const removeSubscription = (subscription) => ({
    type: REMOVE_SUBSCRIPTION,
    payload: subscription
})

export const getUserSubscriptions = (userId) => async (dispatch) => {
    const response = await fetch(`/api/subscriptions/${userId}`);
    const data = await response.json();
    dispatch(userSubscriptions(data));
    return data;
}

export const addUserSubscription = (userId, subId) => async (dispatch) => {
    const response = await fetch(`/api/subscriptions/add/${userId}/${subId}`);
    const data = await response.json();
    dispatch(addSubscription(data));
    return data;
}

export const removeUserSubscription = (userId, subId) => async (dispatch) => {
    const response = await fetch(`/api/subscriptions/remove/${userId}/${subId}`);
    const data = await response.json();
    dispatch(removeSubscription(data));
    return data;
}

const initialState = {
    subscriptions: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case USER_SUBSCRIPTIONS:
            newState = {
                subscriptions: action.payload.subscriptions
            }
            return newState;
        case ADD_SUBSCRIPTION:
            newState = {
                subscriptions: state.subscriptions
            }
            newState.subscriptions[action.payload.subscription?.id] = action.payload.subscription
            return newState;
        case REMOVE_SUBSCRIPTION:
            newState = {
                subscriptions: state.subscriptions
            }
            delete newState.subscriptions[action.payload.subscription?.id]
            return newState
        default:
            return state;
    }
}
