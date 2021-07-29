import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePost } from "../../store/posts";
import { getAllUsers } from "../../store/users";
import "./index.css"

function Post() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch(getOnePost(parseInt(params.postId)))
        dispatch(getAllUsers())
    }, [dispatch, params.postId])

    const user = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.posts.post);
    const postId = useSelector((state) => state.posts.post.id);
    const users = useSelector((state) => state.users.users);
    const name = params.subfeeditName;

    console.log("POSTHERALKEJGALKEG", postId)
    if (!postId) {
        return (
            <>
                { history.push(`/${params.subfeeditName}`) }
            </>
        )
    }

    return (
        <div className="post-info-container">
            {
                post ?
                    <div className="post-info">
                        <div className="post-title">
                            <p>{post.title}</p>
                        </div>
                        <div className="post-subfeedit">
                            <a href={`/${name}`}>{name}</a>
                        </div>
                        <div className="post-author">
                            <p>Posted by {users[post.userId]?.username}</p>
                        </div>
                        <div className="post-time">
                            <p>On {post.time}</p>
                        </div>
                        <div className="post-content">
                            <p>{post.content}</p>
                        </div>
                    </div>
                : <></>
            }
            {users[post.userId]?.id === user?.id ?
                <div className="post-owner">
                    <button onClick={() => history.push(`/${params.subfeeditName}/${params.postId}/edit`)}>
                        Edit Post
                    </button>
                    <button onClick={() => history.push(`/${params.subfeeditName}/${params.postId}/delete`)}>
                        Delete Post
                    </button>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default Post;
