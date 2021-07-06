import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../../store/posts";

function Post() {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts);
    const post = posts[parseInt(params.postId)];

    console.log(post);

    return (
        <>
            {
                post ?
                    <div>
                        <h1>{post.title}</h1>
                        <div>
                            <p>
                                {post.content}
                            </p>
                        </div>
                    </div>
                : <></>
            }
        </>
    )
}

export default Post;
