const ALL_POSTS = "posts/ALL_POSTS"
const ONE_POST = "posts/ONE_POST"

const allPosts = (posts) => ({
    type: ALL_POSTS,
    payload: posts
})

const onePost = (post) => ({
    type: ONE_POST,
    payload: post
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    const data = await response.json();
    dispatch(allPosts(data));
    return data;
}

export const getOnePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    dispatch(onePost(data));
    return data;
}

const initialState = {
    posts: {},
    post: {}
}

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case ALL_POSTS:
            newState = {
                posts: {},
                post: state.post
            }
            action.payload.posts.forEach(post => {
                newState.posts[post.id] = post
            })
            return newState;
        case ONE_POST:
            newState = {
                posts: state.posts,
                post: action.payload.post
            }
            return newState;
        default:
            return state;
    }
}
