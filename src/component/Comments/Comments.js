import React, {Component} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import ShowComments from "./sub/ShowComments";
import MainComments from "./MainComments";
import CommentChart from "./CommentChart";
import CategoriesChart from "./CategoriesChart";




const Comments = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/showcomments`} />
            <Route path={`${match.url}/showcomments`} component={MainComments} />
            <Route path={`${match.url}/commentschart`} component={CommentChart} />
            <Route path={`${match.url}/categorieschart`} component={CategoriesChart} />
            {/*<Route path={`${match.url}/showmessage`} component={ShowMessage} />*/}
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Comments;