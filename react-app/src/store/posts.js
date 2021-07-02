const ALL_POSTS = "posts/ALL_POSTS"

const allPosts = (posts) => ({
    type: ALL_POSTS,
    payload: posts
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    const data = await response.json()
    dispatch(allPosts(data))
    return data
}

const initialState = {
    posts: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case ALL_POSTS:
            newState = { posts: {} }
            action.payload.posts.forEach(post => {
                newState.posts[post.id] = post
            })
            return newState
        default:
            return state;
    }
}
