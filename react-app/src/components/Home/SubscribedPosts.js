import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";
import { getUserSubscriptions } from "../../store/subscriptions";
import { getAllUsers } from "../../store/users";
import "./index.css";

const Subscribed = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
        dispatch(getAllUsers())
        dispatch(getUserSubscriptions(user.id))
    }, [dispatch, user.id])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const users = useSelector((state) => state.users.users);
    const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
    const subIds = Object.values(subscriptions)?.map((sub) => sub.subfeeditId);
    const subPosts = Object.values(posts)?.filter((post) => {
        return subIds.includes(post.subfeeditId)
    });

    return (
        <>
            <h1>Posts For You</h1>
            {subPosts.map((post) => {
                const name = subfeedits[post.subfeeditId]?.name
                return (
                    <div key={post.id} onClick={() => history.push(`/${name}/${post.id}`)} className="post-container">
                        <div className="post-title">
                            <a href={`/${name}/${post.id}`}>{post.title}</a>
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
                    </div>
                )
            })}
        </>
    )
}

export default Subscribed;
