const ALL_POSTS = "posts/ALL_POSTS"
const ONE_POST = "posts/ONE_POST"
const NEW_POST = "posts/NEW_POST"
const EDIT_POST = "post/EDIT_POST"
const DELETE_POST = "post/DELETE_POST"

const allPosts = (posts) => ({
    type: ALL_POSTS,
    payload: posts
})

const onePost = (post) => ({
    type: ONE_POST,
    payload: post
})

const newPost = (post) => ({
    type: NEW_POST,
    payload: post
})

const edit = (post) => ({
    type: EDIT_POST,
    payload: post
})

const remove = (post) => ({
    type: DELETE_POST,
    payload: post
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    const data = await response.json();
    dispatch(allPosts(data));
    return data;
}

export const getOnePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/`);
    const data = await response.json();
    dispatch(onePost(data));
    return data;
}

export const createPost = (title, content, subfeeditId) => async (dispatch) => {
    const response = await fetch("/api/posts/new-post/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
            subfeeditId
        }),
    });

    const data = await response.json();

    if (data.errors) {
      return
    }

    dispatch(newPost(data))
}

export const editPost = (title, content, subfeeditId, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/edit-post/${postId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
            subfeeditId
        }),
    });

    const data = await response.json();

    if (data.errors) {
      return
    }

    dispatch(edit(data))
}

export const deletePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/delete/${id}/`)
    const data = await response.json();
    dispatch(remove(data));
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
                posts: action.payload.posts,
                post: state.post
            }
            return newState;
        case ONE_POST:
            newState = {
                posts: state.posts,
                post: action.payload.post
            }
            return newState;
        case NEW_POST:
            newState = {
                posts: state.posts,
                post: state.post
            }
            newState.posts[action.payload.post?.id] = action.payload.post
            return newState;
        case EDIT_POST:
            newState = {
                posts: state.posts,
                post: state.post
            }
            newState.posts[action.payload.post?.id] = action.payload.post
            return newState;
        case DELETE_POST:
            newState = {
                posts: state.posts,
                post: state.post
            }
            delete newState.posts[action.payload.post?.id]
            return newState;
        default:
            return state;
    }
}
