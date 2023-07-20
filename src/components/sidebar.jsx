import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardOutlined from "@material-ui/icons/DashboardOutlined";
import PostAddRounded from "@material-ui/icons/PostAddRounded";
import HistoryOutlined from "@material-ui/icons/HistoryOutlined";
import { HelpOutline } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import { CloudUploadOutlined, Person } from "@material-ui/icons";
import SettingsApplications from "@material-ui/icons/TimelineRounded";
import { checkPermission } from "utils/functions";
// import { State } from "store";
//let logo = "https://1.bp.blogspot.com/-ouZiY6UwNOE/XZcQaZIWTJI/AAAAAAAAD-g/cQ0rRga90JYy6ywIGVtce7MaUjPCdM60QCNcBGAsYHQ/s1600/FB_IMG_1570175379664.jpg";

export function SideBar() {
  let logo =localStorage.getItem('company_logo')
  return (
    <div className="bg-primary-light my-0 shadow-sm d-flex flex-column sidebar-cont text-light overflow-hidden">
      <div className="bg-primary w-100">
        <div className="d-flex justify-content-end" style={{ height: "60px" }}>
          <button
            className="btn text-light bg-transparent nav-close"
            onClick={() =>
              document
                .getElementsByTagName("html")[0]
                .classList.remove("nav-open")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"
              />
            </svg>
          </button>
        </div>
        <div className="top text-light" style={{ height: "80px" }}></div>
        <div className="d-flex no-gutters">
          <div className="col d-flex flex-column justify-content-end">
            <div
              className="top bg-primary-light"
              style={{ height: "40px" }}
            ></div>
          </div>
          <div
            className="bg-primary-light overflow-hidden d-flex flex-column"
            style={{ width: "80px", height: "80px" }}
          >
            <div className="d-block" style={{ width: "80px", zIndex: 0 }}>
              <img
                src={logo}
                alt=""
                className="img-thumbnail border-0 p-0 bg-transparent rounded-0"
              />
            </div>
          </div>
          <div className="col d-flex flex-column justify-content-end">
            <div
              className="top bg-primary-light"
              style={{ height: "40px" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex-fill bg-primary-light d-flex flex-column ">
        <div className="p-2">
          <nav className="navbar sidebar-nav">
            <ul className="navbar-nav w-100">
              <li className="nav-item rounded mb-2">
                <Link to="/" className="nav-link">
                  <DashboardOutlined className="mr-2" />
                  Dashboard
                </Link>
              </li>
              {checkPermission('create requests') ? (
                <li className="nav-item rounded mb-2">
                  <Link to="/request" className="nav-link">
                    <PostAddRounded className="mr-2" />
                    New Request
                  </Link>
                </li>
              ) : ''}
              {checkPermission('view batch requests') ? (
                <li className="nav-item rounded mb-2">
                  <Link to="/batch" className="nav-link">
                    <CloudUploadOutlined className="mr-2" />
                    Batch Requests
                  </Link>
                </li>
              ): ''}
              {checkPermission('create requests') ? (
                <li className="nav-item rounded mb-2">
                  <Link to="/requests?q=mine" className="nav-link">
                    <HistoryOutlined className="mr-2" />
                    Reports
                  </Link>
                </li>
              ): ''}
              {checkPermission('view requests') ? (
                <li className="nav-item rounded mb-2">
                  <Link to="/requests?q=all" className="nav-link">
                    <SettingsApplications className="mr-2" />
                    All Requests
                  </Link>
                </li>
              ): ''}
              {checkPermission('view users') ? (
                <li className="nav-item rounded mb-2">
                  <Link to="/users" className="nav-link">
                    <PeopleIcon className="mr-2" />
                    Users
                  </Link>
                </li>
              ) : ''}
              <li className="nav-item rounded mb-2">
                <Link className="nav-link" to="/profile">
                <Person className="mr-2" />
                  My Profile
                </Link>
              </li>
              {/* <li className="nav-item rounded mb-2">
                <Link to="/batch" className="nav-link">
                  <CloudUploadOutlined />
                  Batch Requests Upload
                </Link>
              </li> */}
              <li className="nav-item rounded mb-2">
                <Link to="/help" className="nav-link">
                  <HelpOutline className="mr-2" />
                  Help
                </Link>
              </li>
            </ul>
          </nav>
          <div className="h-100 d-flex align-items-end">
            <nav className="navbar sidebar-nav">

            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
