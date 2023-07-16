import React from "react";
import Home from "./Home";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import NotFound from "./NotFound";
import "./../styles/App.css";
import AdminDashboard from "./Admin/AdminDashboard";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminRoute from "./Admin/AdminRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserList from "./User/UserList";
import Settings from "./User/Settings";
import UserDetails from "./User/UserDetails";
import CreatePostForm from "./Post/CreatePostForm";
import SavedPostList from "./Post/SavedPostList";
import PostsCommentList from "./Post/PostsCommentList";
import ChatList from "./User/ChatList";
import Chat from "./User/Chat";
// import UserRoute from "./User/UserRoute";
import TypeList from "./Type/TypeList";
import CreateTypeForm from "./Type/CreateTypeForm";
import EditTypeForm from "./Type/EditTypeForm";
import TagList from "./Tag/TagList";
import CreateTagForm from "./Tag/CreateTagForm";
import EditTagForm from "./Tag/EditTagForm";
import LocationList from "./Location/LocationList";
import CreateLocationForm from "./Location/CreateLocationForm";
import EditLocationForm from "./Location/EditLocationForm";
import LocationDetails from "./Location/LocationDetails";
import PostDetails from "./Post/PostDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/chats" component={ChatList} />
          <Route exact path="/chat/:userId/:chatId" component={Chat} />
          <Route exact path="/user/savedPosts" component={SavedPostList} />
          <Route exact path="/settings/:userId" component={Settings} />
          <Route exact path="/home" component={Home} />

          <Route exact path="/user" component={UserList} />
          <Route exact path="/user/:userId/follows" component={UserList} />
          <Route exact path="/user/:userId/followers" component={UserList} />
          <Route exact path="/post/:postId/likers" component={UserList} />
          <Route exact path="/user/:userId" component={UserDetails} />

          {/* auth routes */}
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />

          {/* post routes */}
          <Route exact path="/post/create" component={CreatePostForm} />
          <Route
            exact
            path="/post/:postId/comments"
            component={PostsCommentList}
          />
          <Route exact path="/post/:postId" component={PostDetails} />

          {/* type routes */}
          <Route exact path="/type" component={TypeList} />
          <Route exact path="/type/create" component={CreateTypeForm} />
          <Route exact path="/type/edit/:typeId" component={EditTypeForm} />
          {/* <Route exact path="/type/:typeId" component={TypeDetails} /> */}

          {/* tag routes */}
          <Route exact path="/tag" component={TagList} />
          <Route exact path="/tag/create" component={CreateTagForm} />
          <Route exact path="/tag/edit/:tagId" component={EditTagForm} />
          {/* <Route exact path="/tag/:tagId" component={TagDetails} /> */}

          {/* location routes */}
          <Route exact path="/location" component={LocationList} />
          <Route exact path="/location/create" component={CreateLocationForm} />
          <Route
            exact
            path="/location/edit/:locationId"
            component={EditLocationForm}
          />
          <Route
            exact
            path="/location/:locationId"
            component={LocationDetails}
          />

          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
