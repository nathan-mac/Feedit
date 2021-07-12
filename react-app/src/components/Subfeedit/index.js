import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";
import { getAllUsers } from "../../store/users";
import { addUserSubscription, getAllSubscriptions, removeUserSubscription } from "../../store/subscriptions";
import "./index.css";

function Subfeedit() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const user = useSelector((state) => state.session.user);

    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
        dispatch(getAllUsers())
        dispatch(getAllSubscriptions())
    }, [dispatch, params.subfeeditName])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const users = useSelector((state) => state.users.users);
    const subscriptions = useSelector((state) => state.subscriptions.allSubscriptions);

    let subId;
    let subscriptionId;

    Object.values(subfeedits).forEach((subfeedit) => {
        if (subfeedit.name === params.subfeeditName) {
            subId = subfeedit.id
        }
    })

    if (user ) {
        Object.values(subscriptions).forEach((sub) => {
            if (subfeedits[sub.subfeeditId]?.name === params.subfeeditName && sub.userId === user.id) {
                setSubscribed(true);
                subscriptionId = sub.id;
            }
        })
    }

    const onSubscribe = async (e) => {
        setSubscribed(true);
        await dispatch(addUserSubscription(user.id, subId));
        return
    }

    const onUnsubscribe = async (e) => {
        setSubscribed(false);
        await dispatch(removeUserSubscription(subscriptionId));
        return
    }

    return (
        <>
            <h1>{params.subfeeditName}</h1>
            <div className="sub-container">
                <div className="sub-posts">
                    {Object.values(posts)?.map((post) => {
                        const name = subfeedits[post.subfeeditId]?.name;
                        const matched = name === params.subfeeditName;
                        return (
                            matched ?
                                <div key={post.id} onClick={() => history.push(`/${name}/${post.id}`)} className="sub-post-container">
                                    <div className="sub-post-title">
                                        <a href={`/${name}/${post.id}`}>{post.title}</a>
                                    </div>
                                    <div className="sub-post-subfeedit">
                                        <a href={`/${name}`}>{name}</a>
                                    </div>
                                    <div className="sub-post-author">
                                        <p>Posted by {users[post.userId]?.username}</p>
                                    </div>
                                    <div className="sub-post-time">
                                        <p>On {post.time}</p>
                                    </div>
                                </div>
                            : <></>
                        )
                    })}
                </div>
                <div className="sub-sidebar">
                    <div className="sub-new">
                        <button onClick={() => history.push(`/${params.subfeeditName}/new`)} className="new-post">
                            Create a New Post!
                        </button>
                    </div>
                    {user ?
                        <div className="sub-subscribe">
                            {!subscribed ?
                                <button onClick={(e) => onSubscribe()} className="subscribe-button">
                                    Subscribe
                                </button>
                                :
                                <button onClick={(e) => onUnsubscribe()} className="unsubscribe-button">
                                    Unsubscribe
                                </button>
                            }
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Subfeedit;
