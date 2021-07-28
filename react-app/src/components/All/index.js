import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";
import { getAllUsers } from "../../store/users";
import source from "../../images/soup.jpeg";
import "./index.css";

const All = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
        dispatch(getAllUsers())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const users = useSelector((state) => state.users.users);

    return (
        <div className="all-container">
            <div>
                <h1>All Posts</h1>
                {Object.values(posts)?.map((post) => {
                    const name = subfeedits[post?.subfeeditId]?.name
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
            </div>
            <img src={source} alt="soup"></img>
        </div>
    )
}

export default All;
