import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriptions } from "../../store/subscriptions";
import { getAllSubfeedits } from "../../store/subfeedits";


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
        <>
            <h1>Subscriptions:</h1>
            {Object.values(subscriptions)?.map((subscription) => {
                const name = subfeedits[subscription.subfeeditId]?.name
                return (
                    <div key={subscription.id}>
                        <a href={`/${name}}`}>{name}</a>
                    </div>
                )
            })}
        </>
    )
}

export default Subscriptions;
