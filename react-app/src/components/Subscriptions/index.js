import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriptions } from "../../store/subscriptions";
import { getAllSubfeedits } from "../../store/subfeedits";
import source from "../../images/board.jpeg";
import "./index.css";


function Subscriptions() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllSubfeedits())
        dispatch(getUserSubscriptions(user.id))
    }, [dispatch, user.id])

    const subfeedits = useSelector((state) => state.subfeedits.subfeedits);
    const subscriptions = useSelector((state) => state.subscriptions.subscriptions);

    return (
        <div className="list-container">
            <h1>Your Subscriptions</h1>
            {Object.values(subscriptions)?.map((subscription) => {
                const name = subfeedits[subscription.subfeeditId]?.name
                return (
                    <div key={subscription.id} className="list-item">
                        <a href={`/${name}}`}>{name}</a>
                    </div>
                )
            })}
            <img src={source} alt="board"></img>
        </div>
    )
}

export default Subscriptions;
