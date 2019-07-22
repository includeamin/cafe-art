import React, {Component} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import ShowComments from "../Comments/sub/ShowComments";
import AddItem from "./sub/AddItem";
import ShowItem from "./sub/ShowItem";

const Items = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/additem`} />
            <Route path={`${match.url}/additem`} component={AddItem} />
            <Route path={`${match.url}/showitem`} component={ShowItem} />
            {/*<Route path={`${match.url}/showmessage`} component={ShowMessage} />*/}
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Items;