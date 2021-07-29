import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deletePost } from "../../store/posts";
import { getOnePost } from "../../store/posts";
import { getAllUsers } from "../../store/users";
import "./index.css"

const DeletePost = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch(getOnePost(parseInt(params.postId)))
        dispatch(getAllUsers())
    }, [dispatch, params.postId])

    const onDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePost(params.postId));
        return history.push(`/${params.subfeeditName}`);
    }

    const user = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.posts.post);
    const users = useSelector((state) => state.users.users);
    const name = params.subfeeditName;

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
                    <div className="delete-confirm">
                        <p>Are you sure you would like to delete this post?</p>
                    </div>
                    <button onClick={(e) => onDelete(e)}>
                        Confirm
                    </button>
                    <button onClick={() => history.push(`/${params.subfeeditName}/${params.postId}`)}>
                        Cancel
                    </button>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default DeletePost
