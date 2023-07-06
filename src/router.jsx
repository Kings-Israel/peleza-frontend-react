import Home from "components/home";
import { NewRequest } from "components/home/newrequest";
// import { BatchUpload } from "components/home/batchupload";
import { Login } from "components/login";
import { SideBar } from "components/sidebar";
// eslint-disable-next-line no-unused-vars
import { Component, useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import { Profile } from "components/profile";
import { fadeOut, getBodyHeight } from "utils/functions";
import { connect } from "react-redux";
import BusinessSearchReport from "components/reports/businessSearch";
import { clearToken } from "utils/auth.token";
import { Requests } from "components/requests";
import { NGOSearchReport } from "components/reports/ngoSearch";
import CompanySearchReport from "components/reports/companySearch";
import LLPSearchReport from "components/reports/llpSearch";
import { removeNotificationAction } from "store/actions/notification";
import BatchRequest from "components/home/BatchRequest";
import { Register } from "components/register";

const Base = connect(function (state) {
  return {
    user: state.global.user,
  };
})(
  withRouter(({ user, location, history }, props) => {
    let [bodyHeight, setBodyHeight] = useState(0);
    const height = `${bodyHeight}px`;

    const watchUserAuthentication = useCallback(() => {
      const currentURL = window.location.href;

      if ((!user || !user.access) && !currentURL.startsWith("/login")) {
        const currentState = location.state;
        // history.push(`/login?next=${encodeURIComponent(currentURL)}`, {
          history.push(`/login`, {
          nextState: currentState,
        });
      }
    }, [location, history, user]);

    useEffect(() => {
      window.onload = window.onresize = () => getBodyHeight(setBodyHeight);
      watchUserAuthentication();
    }, [
      watchUserAuthentication,
      setBodyHeight
    ]);

    return (
      <>
        <div className="d-flex w-100 main">
          <SideBar />
          <section
            className="d-flex flex-column w-100 hide-scroll main"
            style={{
              height,
              overflowY: "scroll",
            }}
          >
            <Header first_name={user.first_name} />
            <Switch>
              <Route path="/requests">
                <Requests />
              </Route>
              <Route path="/batch">
                <BatchRequest />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>

              <Route path="/reports/clg">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/co">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/societies">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/SOC">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/bn">
                <BusinessSearchReport />
              </Route>
              <Route path="/reports/business">
                <BusinessSearchReport />
              </Route>
              <Route path="/reports/BUSINESS SEARCH">
                <BusinessSearchReport />
              </Route>
              <Route path="/reports/co">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/company">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/COMPANY SEARCH">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/ico">
                <CompanySearchReport />
              </Route>
              <Route path="/reports/ngo">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/cbo">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/trusts">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/TR">
                <NGOSearchReport />
              </Route>
              <Route path="/reports/international">
                <BusinessSearchReport />
              </Route>
              <Route path="/reports/ICO">
                <BusinessSearchReport />
              </Route>
              <Route path="/reports/llp">
                <LLPSearchReport />
              </Route>
              <Route path="/reports/SACCO">
                <BusinessSearchReport />
              </Route>
              <Route path="">
                <Home />
                <Route exact path="/request">
                  <NewRequest />
                </Route>
              </Route>
              {/* <Route path="">
                <Home />
                <Route exact path="/batch-request">
                  <BatchUpload />
                </Route>
              </Route> */}
            </Switch>
          </section>
        </div>
      </>
    );
  })
);

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Notifications />
            <Base />
          </Route>
        </Switch>
      </Router>
    );
  }
}

class _AppPageTitle extends Component {
  render() {
    return (
      <>
        <div className="pb-4">
          <div className="app-page-title bg-blue-gradient text-white">
            <div className="page-title-wrapper">
              <div className="page-title-heading">
                <div className="text-white">
                  <h4 className="text-light">
                    Welcome back,
                    {this.props.user.first_name
                      ? this.props.user.first_name
                      : "loading..."}
                  </h4>
                  <div className="page-title-subheading">
                    You have{" "}
                    <b>
                      {this.props.stats.credits ? this.props.stats.credits : 0}
                    </b>{" "}
                    credits
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const AppPageTitle = connect(function (state) {
  return {
    user: state.global.user,
    stats: state.global.stats,
  };
})(_AppPageTitle);

function Header() {
  // let store = _store.getState();

  // const date = new Date(Date.now());
  // const months = store?.global.months;
  // const days = store?.global.days;

  function handleLogout(e) {
    e.preventDefault();
    clearToken();
  }

  return (
    <div
      className="navbar-container d-flex flex-column primaryColor  shadow-sm"
      style={{ minHeight: "180px" }}
    >
      <nav className="navbar navbar-light bg-light shadow d-flex">
        <button
          type="button"
          className="btn btn-sm bg-primary mx-1 py-1 nav-toggler m-0"
          style={{ height: "30px" }}
          onClick={() =>
            document
              .getElementsByTagName("html")[0]
              .classList.toggle("nav-open")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ padding: 0, marginTop: "-2px" }}
          >
            <path
              fill="white"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </svg>
        </button>
        <div className="col d-flex justify-content-end">
          <button
            className="btn btn-sm btn-danger mono"
            style={{ borderRadius: "2px" }}
            onClick={handleLogout}
          >
            SIGN OUT
          </button>
        </div>
      </nav>
      <div className="p-3 primaryColor h-100 d-flex flex-column justify-content-end">
        <AppPageTitle />
      </div>
    </div>
  );
}

class _Notifications extends Component {
  render() {
    return (
      <>
        {this.props.notifications && (
          <div
            className="px-2 position-fixed"
            style={{ width: "320px", float: "right", zIndex: 100000, right: 0 }}
          >
            {this.props.notifications?.map((i) => {
              return (
                <Notification
                  key={i.id}
                  dispatch={this.props.dispatch}
                  {...i}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
}
const Notifications = connect(function (state) {
  return {
    notifications: state.notifications.data,
  };
})(_Notifications);

class Notification extends Component {
  componentDidMount() {
    setTimeout(() => {
      fadeOut(this.props.id, () => {
        this.props.dispatch(removeNotificationAction(this.props.id));
      });
    }, 2500);
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={`alert alert-${this.props.type ? this.props.type : "info"
          } mono alert-dismiss my-1`}
      >
        <div className="alert-header border-bottom">
          <h6 className="alert-title">
            {this.props.title ? this.props.title : "Info"}
          </h6>
        </div>
        <div className="alert-body">{this.props.body}</div>
      </div>
    );
  }
}
