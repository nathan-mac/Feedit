import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";
import "./index.css"


const SearchBar = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
    }, [dispatch]);

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);

    const filterPosts = (posts, query) => {
        if (!query) {
            return [];
        }
        return posts.filter((post) => {
            const postTitle = post.title.toLowerCase();
            const postContent = post.content.toLowerCase();
            return postTitle.includes(query.toLowerCase()) || postContent.includes(query.toLowerCase());
        })
    }

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || "");
    const filteredPosts = filterPosts(posts, searchQuery);

    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        e.preventDefault()
    };

    return (
        <div className="search-container">
            <form action="/" method="get" className="search-form" autoComplete="off" onSubmit={onSubmit}>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search teams</span>
                </label>
                <input
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Search posts"
                    name="s"
                    className="search-input"
                    />
                <button type="submit" className="search-button visually-hidden">Search</button>
                <div className="search-results">
                    <ul className="search-list">
                        {filteredPosts.map((post) => {
                            const name = subfeedits[post.subfeeditId]?.name;
                            return <a key={post.id} href={`/${name}/${post.id}`} className="search-result">
                                <p>{post.title}</p>
                            </a>
                        })}
                    </ul>
                </div>
            </form>
        </div>
    )
}
export default SearchBar;
