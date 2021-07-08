import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { deletePost } from "../../store/posts";

const DeletePost = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(deletePost(params.postId))
    }, [dispatch, params])

    return (
        <Redirect to="/" />
    )
}

export default DeletePost
