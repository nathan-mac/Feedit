import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editPost } from '../../store/posts';
import { getOnePost } from "../../store/posts";
import source from "../../images/bowl.jpeg";
import "./index.css";

const EditPostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [subfeeditId, setSubfeeditId] = useState("");
    const params = useParams();

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
        await dispatch(editPost(title, content, subfeeditId, params.postId));
        return history.push(`/${params.subfeeditName}/${params.postId}`);
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    if (!user || !user.id === post.userId) {
        return history.push(`/${params.subfeeditName}/${params.postId}`);
    }

    return (
        <div className="edit-container">
            <form onSubmit={onEdit} method="POST">
                <div className="greeting">
                    <h1>Edit Post</h1>
                </div>
                <div className="form-element">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder={title}
                        required={true}
                        onChange={updateTitle}
                        value={title}
                    ></input>
                </div>
                <div className="form-element">
                    <label>Content</label>
                    <textarea
                        name="content"
                        placeholder={content}
                        onChange={updateContent}
                        value={content}
                    ></textarea>
                </div>
                <div className="button-container">
                    <button type="submit">Save</button>
                    <button onClick={() => {history.push(`/${params.subfeeditName}/${params.postId}`)}}>Cancel</button>
                </div>
            </form>
            <img src={source} alt="bowl"></img>
        </div>
    );
};

export default EditPostForm
