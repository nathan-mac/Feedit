import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";


const SearchPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const query = params.query;

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts);
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);

    const filterPosts = (posts, query) => {
        if (!query || !posts) {
            return [];
        }
        return posts.filter((post) => {
            const postTitle = post.title.toLowerCase();
            const postContent = post.content.toLowerCase();
            return postTitle.includes(query.toLowerCase()) || postContent.includes(query.toLowerCase());
        })
    }

    const filteredPosts = filterPosts(posts, query);

    return (
        <div>
            <p>{query}</p>
            <p>{filteredPosts}</p>
            {/* <p>{posts}</p> */}
        </div>
    )

}

export default SearchPage;
