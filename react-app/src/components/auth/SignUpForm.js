import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import source from "../../images/bowl.jpeg";
import "./index.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data.errors) {
      setErrors(data.errors);
    };
    return data;
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
      <form onSubmit={onSignUp}>
        <div className="auth-form-element error-list">
          {errors.map((error) => (
            <div>{formatError(error)}</div>
            ))}
        </div>
        <div className="auth-form-element">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            required={true}
            onChange={updateUsername}
            ></input>
        </div>
        <div className="auth-form-element">
          <label>Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            required={true}
            onChange={updateEmail}
            ></input>
        </div>
        <div className="auth-form-element">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required={true}
            onChange={updatePassword}
            ></input>
        </div>
        <div className="auth-form-element">
          <label>Confirm Password</label>
          <input
            name="repeat_password"
            type="password"
            placeholder="Confirm Password"
            value={repeatPassword}
            required={true}
            onChange={updateRepeatPassword}
            ></input>
        </div>
        <div className="button-container">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <img src={source} alt="bowl"></img>
    </div>
  );
};

export default SignUpForm;
