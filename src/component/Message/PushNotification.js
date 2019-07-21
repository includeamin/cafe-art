import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SendMessange from "./sub/SendMessange";
import ShowMessage from "./sub/ShowMessage/ShowMessage";




const PushNotification = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/sendmessage`} />
            <Route path={`${match.url}/sendmessage`} component={SendMessange} />
            <Route path={`${match.url}/showmessage`} component={ShowMessage} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default PushNotification;