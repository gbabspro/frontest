import React, { Component } from 'react';
import { getUserProfile } from '../../util/APIUtils';
// import { formatDate } from '../../util/Helpers';
import { Avatar, Tabs } from 'antd';
// import LoadingIndicator  from '../../common/LoadingIndicator';
// import './Profile.css';
// import NotFound from '../../common/NotFound';
// import ServerError from '../../common/ServerError';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {

           
            this.setState({
                user: response,
                isLoading: false
            });

            console.log("reponse ",response);
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        if(this.state.isLoading) {
            // return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            // return <NotFound />;
        }

        if(this.state.serverError) {
            // return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <span className="badge user-avatar-circle" style={{ backgroundColor: "#cfcfcf"}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </span>
                                </div>
                                <div className="user-summary">
                                    <div className="email">{this.state.user.email}</div>
                                </div>
                            </div>
                            <div className="user-poll-details">    

                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;