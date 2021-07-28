import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deletePost } from "../../store/posts";

const DeletePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch(deletePost(params.postId))
    }, [dispatch, params])

    return (
        <>
            {history.push(`/${params.subfeeditName}`)}
        </>
    )
}

export default DeletePost
