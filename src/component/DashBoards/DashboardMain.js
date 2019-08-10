import React, {Component} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Showdashboard from "./sub/showdashboard";


const DashboardMain = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/showdashboard`} />
            <Route path={`${match.url}/showdashboard`} component={Showdashboard} />
            {/*<Route path={`${match.url}/showitem`} component={ShowItem} />*/}
            {/*<Route path={`${match.url}/showmessage`} component={ShowMessage} />*/}
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default DashboardMain;