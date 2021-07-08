import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from 'react-router-dom';
import { createPost } from '../../store/posts';
import { getAllSubfeedits } from "../../store/subfeedits";

const NewPostForm = () => {
    const dispatch = useDispatch();
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

    console.log(params.subfeeditName, subfeedit, subfeeditId)

    const onPost = async (e) => {
        e.preventDefault();
        await dispatch(createPost(title, content, subfeeditId));
        return <Redirect to="/" />
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    // const updateSubfeeditId = (e) => {
    //     setSubfeeditId(e.target.value);
    // };

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
            <div className="container">
                <form onSubmit={onPost} method="POST">
                    <div className="greeting">
                        <h1>New Post</h1>
                    </div>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={"Title"}
                            onChange={updateTitle}
                            value={title}
                        ></input>
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea
                            name="content"
                            placeholder={"Content"}
                            onChange={updateContent}
                            value={content}
                        ></textarea>
                    </div>
                    {/* <div>
                        <label for="subfeedit-select">Subfeedit</label>
                        <select
                            name="subfeedit"
                            id="subfeedit-select"
                            onChange={updateSubfeeditId}
                            value={subfeeditId}
                        >
                            {Object.values(subfeedits)?.map((subfeedit) => {
                                return (
                                    <option value={`${subfeedit.name}`}>{subfeedit.name}</option>
                                )
                            })}
                        </select>
                    </div> */}
                    <div className="hidden">
                        <input
                            type="hidden"
                            name="subfeedit"
                            value={subfeeditId}
                        >
                        </input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
    );
};

export default NewPostForm
