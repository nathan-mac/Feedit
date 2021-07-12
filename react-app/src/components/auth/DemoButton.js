import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();
  const onDemo = async (e) => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return <button onClick={onDemo}>Demo</button>;
};

export default DemoButton;
