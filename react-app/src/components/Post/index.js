import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../store/posts";

function Post() {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getOnePost(parseInt(params.postId)))
    }, [dispatch, params.postId])

    const post = useSelector((state) => state.posts.post);

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
