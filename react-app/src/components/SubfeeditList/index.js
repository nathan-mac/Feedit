import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubfeedits } from "../../store/subfeedits";
import source from "../../images/table.jpeg";
import "./index.css";


function SubfeeditList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSubfeedits())
    }, [dispatch])

    const subfeedits = useSelector((state) => state.subfeedits.subfeedits)

    return (
        <div className="list-container">
            <h1>Subfeedits</h1>
            {Object.values(subfeedits)?.map((subfeedit) => {
                return (
                    <div key={subfeedit.id} className="list-item">
                        <a href={`/${subfeedit.name}`}>{subfeedit.name}</a>
                    </div>
                )
            })}
            <img src={source} alt="table"></img>
        </div>
    )
}

export default SubfeeditList;
