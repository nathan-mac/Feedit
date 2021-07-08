import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";

const Subscribed = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);

    return (
        <>
            <h1>Posts:</h1>
            {Object.values(posts)?.map((post) => {
                const name = subfeedits[post?.subfeeditId]?.name
                return (
                    <div key={post?.id}>
                        <a href={`/${name}/${post?.id}`}>{post?.title}</a>
                    </div>
                )
            })}
        </>
    )
}

export default Subscribed;
