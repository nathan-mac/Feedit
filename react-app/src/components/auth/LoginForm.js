import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import source from "../../images/bowl.jpeg";
import "./index.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return history.push("/");
  }

  const formatError = (err) => {
    const [name, msg] = err.split(" : ");
    const splitName = name.split("");
    splitName[0] = splitName[0].toUpperCase();
    const newName = splitName.join("");
    return `${newName} : ${msg}`;
  }

  return (
    <div className="auth-container">
      <form onSubmit={onLogin}>
        <div className="auth-form-element error-list">
          {errors.map((error) => (
            <div>{formatError(error)}</div>
            ))}
        </div>
        <div className="auth-form-element">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            required={true}
            onChange={updateEmail}
            />
        </div>
        <div className="auth-form-element">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required={true}
            onChange={updatePassword}
            />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
      </form>
      <img src={source} alt="bowl"></img>
    </div>
  );
};

export default LoginForm;
