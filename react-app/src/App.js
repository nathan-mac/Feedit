import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList/index";
import User from "./components/User/index";
import All from "./components/All/index";
import Home from "./components/Home/index";
import Post from "./components/Post/index";
import Subfeedit from "./components/Subfeedit/index";
import SubfeeditList from "./components/SubfeeditList/index";
import NewPostForm from "./components/NewPost/index";
import EditPostForm from "./components/EditPost/index";
import DeletePost from "./components/DeletePost/index";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  const currentUser = useSelector((state) => state.session.user)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/all" exact={true}>
          <All />
        </Route>
        <Route path="/subfeedits" exact={true}>
          <SubfeeditList />
        </Route>
        {currentUser ? <Route path="/:subfeeditName/new" exact={true}>
            <NewPostForm />
          </Route> : <Redirect to="/login" />
        }
        <Route path="/:subfeeditName" exact={true}>
          <Subfeedit />
        </Route>
        {currentUser ? <Route path="/:subfeeditName/:postId/delete" exact={true}>
            <DeletePost />
          </Route> : <Redirect to="/login" />
        }
        {currentUser ? <Route path="/:subfeeditName/:postId/edit" exact={true}>
            <EditPostForm />
          </Route> : <Redirect to="/login" />
        }
        <Route path="/:subfeeditName/:postId" exact={true}>
          <Post />
        </Route>
        <ProtectedRoute path="/" exact={true} >
          <Home />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
