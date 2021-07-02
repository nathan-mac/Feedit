import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import { getAllSubfeedits } from "../../store/subfeedits";

function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const posts = useSelector((state) => state.posts.posts)
    const subfeedits = useSelector((state) => state.subfeedits.subfeedits)


    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch("/api/posts/");
    //         const responseData = await response.json();
    //         setPosts(responseData.posts);
    //     }
    //     fetchData();
    // }, []);

    // const postComponents = posts.map((post) => {
    //     return (
    //         <li key={post.id}>
    //             <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
    //         </li>
    //     );
    // });

    return (
        <>
            <h1>Posts:</h1>
            {Object.values(posts)?.map((post) => {
                const name = Object.values(subfeedits)[post.subfeeditId - 1].name
                return (
                    <div key={post.id}>
                        <a href={`/${name}/${post.id}`}>{post.title}</a>
                    </div>
                )
            })}
        </>
    )
}

export default Home;
