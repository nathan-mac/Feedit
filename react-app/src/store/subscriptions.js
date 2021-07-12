const ALL_SUBSCRIPTIONS = "subscriptions/ALL_SUBSCRIPTIONS"
const USER_SUBSCRIPTIONS = "subscriptions/USER_SUBSCRIPTIONS"
const ADD_SUBSCRIPTION = "subscriptions/ADD_SUBSCRIPTION"
const REMOVE_SUBSCRIPTION = "subscriptions/REMOVE_SUBSCRIPTION"

const allSubscriptions = (subscriptions) => ({
    type: ALL_SUBSCRIPTIONS,
    payload: subscriptions
})

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

export const getAllSubscriptions = () => async (dispatch) => {
    const response = await fetch("/api/subscriptions");
    const data = await response.json();
    dispatch(allSubscriptions(data));
    return data;
}

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

export const removeUserSubscription = (subscriptionId) => async (dispatch) => {
    const response = await fetch(`/api/subscriptions/remove/${subscriptionId}`);
    const data = await response.json();
    dispatch(removeSubscription(data));
    return data;
}

const initialState = {
    allSubscriptions: {},
    subscriptions: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case ALL_SUBSCRIPTIONS:
            newState = {
                allSubscriptions: action.payload.allSubscriptions,
                subscriptions: state.subscriptions
            }
            return newState;
        case USER_SUBSCRIPTIONS:
            newState = {
                allSubscriptions: state.allSubscriptions,
                subscriptions: action.payload.subscriptions
            }
            return newState;
        case ADD_SUBSCRIPTION:
            newState = {
                allSubscriptions: state.allSubscriptions,
                subscriptions: state.subscriptions
            }
            newState.subscriptions[action.payload.subscription?.id] = action.payload.subscription
            return newState;
        case REMOVE_SUBSCRIPTION:
            newState = {
                allSubscriptions: state.allSubscriptions,
                subscriptions: state.subscriptions
            }
            delete newState.subscriptions[action.payload.subscription?.id]
            return newState
        default:
            return state;
    }
}
