
import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        // this.handleMenuClick = this.handleMenuClick.bind(this);   
    }
    render() {
        return(     <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="#">
          <img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
        </Link>
 </nav>);

    }

}

export default AppHeader;