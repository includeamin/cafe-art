import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import dashboards from "./dashboards";
import pages from "./pages";
import applications from "./applications";
import ui from "./ui";
import menu from "./menu";
import blankPage from "./blank-page";
import SendMessage from "../../component/Message/PushNotification";
import Comments from "../../component/Comments/Comments";
import Items from "../../component/Items/Items";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
          <Route path={`${match.url}/dashboards`} component={dashboards} />
            <Route path={`${match.url}/items`} component={Items} />
          <Route path={`${match.url}/message`} component={SendMessage} />
          <Route path={`${match.url}/comments`} component={Comments} />
          <Route path={`${match.url}/applications`} component={applications} />
          <Route path={`${match.url}/pages`} component={pages} />
          <Route path={`${match.url}/ui`} component={ui} />
          <Route path={`${match.url}/menu`} component={menu} />
          <Route path={`${match.url}/blank-page`} component={blankPage} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
