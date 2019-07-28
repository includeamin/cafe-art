import React, {Component} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import ShowGallery from "./ShowGallery";
import Gallery from "./Gallery";

const MainGallery = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/addgallery`} />
            <Route path={`${match.url}/addgallery`} component={Gallery} />
            <Route path={`${match.url}/showgallery`} component={ShowGallery} />
            {/*<Route path={`${match.url}/showmessage`} component={ShowMessage} />*/}
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default MainGallery;