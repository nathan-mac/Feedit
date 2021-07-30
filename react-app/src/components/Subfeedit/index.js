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
    const [buttonText, setButtonText] = useState("Subscribe");
    const [subscriptionId , setSubscriptionId] = useState(0);

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
        dispatch(getAllUsers())
        dispatch(getAllSubscriptions())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const users = useSelector((state) => state.users.users);
    const subscriptions = useSelector((state) => state.subscriptions.allSubscriptions);

    let subId;

    Object.values(subfeedits).forEach((subfeedit) => {
        if (subfeedit.name === params.subfeeditName) {
            subId = subfeedit.id
        }
    })

    useEffect(() => {
        if (user) {
            Object.values(subscriptions).forEach((sub) => {
                if (subfeedits[sub.subfeeditId]?.name === params.subfeeditName && sub.userId === user.id && subscribed === false) {
                    setSubscribed(true);
                    setButtonText("Unsubscribe");
                    setSubscriptionId(sub.id);
                }
            })
        }
    }, [subscriptions, params.subfeeditName, subfeedits, user])

    const toggleButton = async () => {
        if (subscribed) {
            console.log("UNSUBSCRIBING");
            setSubscribed(false);
            setButtonText("Subscribe");
            await dispatch(removeUserSubscription(subscriptionId));
            await dispatch(getAllSubscriptions())
        } else {
            console.log("SUBSCRIBING");
            setSubscribed(true);
            setButtonText("Unsubscribe");
            const returnedData = await dispatch(addUserSubscription(user.id, subId));
            setSubscriptionId(returnedData.id);
            await dispatch(getAllSubscriptions())
        }
    }

    return (
        <>
            <h1>{params.subfeeditName}</h1>
            <div className="sub-container">
                <div className="sub-posts">
                    {Object.values(posts)?.map((post) => {
                        const name = subfeedits[post?.subfeeditId]?.name;
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
                            : <div key={post.id}></div>
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
                            <button onClick={(e) => toggleButton()} className="subscribe-button">
                                {buttonText}
                            </button>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Subfeedit;
