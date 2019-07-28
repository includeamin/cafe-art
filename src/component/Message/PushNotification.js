import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SendMessange from "./sub/SendComponents/SendMessange";
import ShowMessage from "./sub/ShowMessage/ShowMessage";
import ShowEvents from "./sub/ShowEvent/ShowEvents";
import SendComponent from "./sub/SendComponent";




const PushNotification = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/sendmessage`} />
            <Route path={`${match.url}/sendmessage`} component={SendComponent} />
            <Route path={`${match.url}/showmessage`} component={ShowMessage} />
            <Route path={`${match.url}/showevents`} component={ShowEvents} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default PushNotification;