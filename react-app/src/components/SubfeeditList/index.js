import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubfeedits } from "../../store/subfeedits";


function SubfeeditList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const subfeedits = useSelector((state) => state.subfeedits.subfeedits)

    return (
        <>
            <h1>Subfeedits:</h1>
            {Object.values(subfeedits)?.map((subfeedit) => {
                return (
                    <div key={subfeedit.id}>
                        <a href={`/${subfeedit.name}`}>{subfeedit.name}</a>
                    </div>
                )
            })}
        </>
    )
}

export default SubfeeditList;
