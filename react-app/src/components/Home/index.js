import React from "react"
import All from "./AllPosts"
import Subscribed from "./SubscribedPosts"
import { useSelector } from "react-redux"

const Home = () => {

    const user = useSelector((state) => state.session.user)

    if (user) {
        return (
            <Subscribed />
        )
    } else {
        return (
            <All />
        )
    }
}

export default Home
