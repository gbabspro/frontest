import React, { Component } from 'react';
import { Divider } from 'antd';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Login from './user/login/Login';
import { getCurrentUser } from './util/APIUtils';
import Register from './user/register/Register';
import Profile from './user/profile/Profile';

import AppHeader from "./common/AppHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    // this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    // notification.config({
    //   placement: 'topRight',
    //   top: 70,
    //   duration: 3,
    // });    
  }


  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  handleLogin() {
    // notification.success({
    //   message: 'Polling App',
    //   description: "You're successfully logged in.",
    // });
    this.loadCurrentUser();
    this.props.history.push("/profile");
  }

  render() {
    // if(this.state.isLoading) {
    //   return (<div></div>);
    // }
    return (
      <div>
        <section className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <div className="app-content">
            <div className="container">
              <Switch>      
                {/* <Route exact path="/" 
                  render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route> */}
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                {/* <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute> */}
                {/* <Route component={NotFound}></Route> */}
              </Switch>
            </div>
          </div>
        </section>
        </div>
    );
  }

}
export default App;
