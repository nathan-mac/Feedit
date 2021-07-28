import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onDemo = async (e) => {
    await dispatch(login("demo@aa.io", "password"));
    return history.push("/");
  };

  return <button onClick={onDemo}>Demo</button>;
};

export default DemoButton;
