import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from 'react-router-dom'
import { editPost } from '../../store/posts';
import { getOnePost } from "../../store/posts";

const EditPostForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [subfeeditId, setSubfeeditId] = useState("");
    const params = useParams();

    console.log(params)

    useEffect(() => {
        dispatch(getOnePost(parseInt(params.postId)))
    }, [dispatch, params])

    const post = useSelector((state) => state.posts.post);

    useEffect(() => {
        setTitle(post.title)
        setContent(post.content)
        setSubfeeditId(post.subfeeditId)
    }, [post.title, post.content, post.subfeeditId])

    const onEdit = async (e) => {
        e.preventDefault();
        await dispatch(editPost(title, content, subfeeditId));
        return <Redirect to="/" />
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    if (!user || !user.id === post.userId) {
        return <Redirect to="/" />;
    }

    return (
            <div className="container">
                <form onSubmit={onEdit} method="POST">
                    <div className="greeting">
                        <h1>Edit Post</h1>
                    </div>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={title}
                            onChange={updateTitle}
                            value={title}
                        ></input>
                    </div>
                    <div>
                        <label>Content</label>
                        <input
                            type="text"
                            name="content"
                            placeholder={content}
                            onChange={updateContent}
                            value={content}
                        ></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
    );
};

export default EditPostForm
