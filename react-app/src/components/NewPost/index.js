import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createPost } from '../../store/posts';
import { getAllSubfeedits } from "../../store/subfeedits";
import source from "../../images/bowl.jpeg";
import "./index.css";

const NewPostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subfeeditId, setSubfeeditId] = useState("");
    const params = useParams();

    useEffect(() => {
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const subfeedits = useSelector((state) => state.subfeedits.subfeedits)

    const subfeedit = Object.values(subfeedits)?.filter((subfeedit) => {
        const name = subfeedits[subfeedit.id]?.name;
        return name === params.subfeeditName;
    })

    useEffect(() => {
        setSubfeeditId(subfeedit[0]?.id)
    }, [subfeedit])

    const onPost = async (e) => {
        e.preventDefault();
        await dispatch(createPost(title, content, subfeeditId));
        return history.push(`/${params.subfeeditName}`)
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    if (!user) {
        return history.push("/");
    }

    return (
        <div className="new-container">
            <form onSubmit={onPost} method="POST">
                <div className="greeting">
                    <h1>New Post</h1>
                </div>
                <div className="form-element">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder={"Title"}
                        required={true}
                        onChange={updateTitle}
                        value={title}
                    ></input>
                </div>
                <div className="form-element">
                    <label>Content</label>
                    <textarea
                        name="content"
                        placeholder={"Content"}
                        onChange={updateContent}
                        value={content}
                    ></textarea>
                </div>
                <div className="hidden">
                    <input
                        type="hidden"
                        name="subfeedit"
                        value={subfeeditId}
                    >
                    </input>
                </div>
                <div className="button-container">
                    <button type="submit">Submit</button>
                    <button onClick={() => {history.push(`/${params.subfeeditName}`)}}>Cancel</button>
                </div>
            </form>
            <img src={source} alt="bowl"></img>
        </div>
    );
};

export default NewPostForm
