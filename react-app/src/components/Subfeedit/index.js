import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";

function Subfeedit() {

    const dispatch = useDispatch();
    const params = useParams();

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
                const name = subfeedits[post.subfeeditId]?.name;
                const matched = name === params.subfeeditName;
                console.log(name, params.subfeeditName, matched)
                return (
                    matched ?
                        <div key={post.id}>
                            <a href={`/${name}/${post.id}`}>{post.title}</a>
                        </div>
                    : <></>
                )
            })}
        </>
    )
}

export default Subfeedit;
