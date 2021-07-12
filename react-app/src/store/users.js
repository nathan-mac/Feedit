const GET_USERS = "users/GET_USERS"

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    dispatch(getUsers(data));
    return data;
}

const initialState = {
    users: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_USERS:
            newState = {
                users: {}
            }
            action.payload.users.forEach(user => {
                newState.users[user.id] = user
            })
            return newState;
        default:
            return state;
    }
}
