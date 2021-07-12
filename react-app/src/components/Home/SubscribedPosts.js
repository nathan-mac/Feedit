import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";
import { getUserSubscriptions } from "../../store/subscriptions";

const Subscribed = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
        dispatch(getUserSubscriptions(user.id))
    }, [dispatch, user.id])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
    const subIds = Object.values(subscriptions)?.map((sub) => sub.subfeeditId);
    const subPosts = Object.values(posts)?.filter((post) => {
        return subIds.includes(post.subfeeditId)
    });

    return (
        <>
            <h1>Posts From Subscribed Subfeedits:</h1>
            {subPosts.map((post) => {
                const name = subfeedits[post.subfeeditId]?.name
                return (
                    <div key={post.id}>
                        <a href={`/${name}/${post.id}`}>{post.title}</a>
                    </div>
                )
            })}
        </>
    )
}

export default Subscribed;
