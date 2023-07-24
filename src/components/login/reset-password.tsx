import { useEffect, useState } from "react";
import { ApiForgotPassword } from "../../api/index";
import {  store } from "store";
import { useHistory } from "react-router-dom";

import logo from "../../assets/images/banner-logo.png";
import { Link } from "react-router-dom";

export function ResetPassword(props: any) {
  useEffect(() => {
    document.onload = () => {
      const element = document.getElementById("scroll-here");

      element?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    };
  }, []);

  let history = useHistory();

  const [formData, setFormData] = useState({
    username: null,
    client_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    client_id: null,
    username: null,
    detail: null,
  });
  const [success, setSuccess] = useState('')

  function handleChange(e: any) {
    const name: "username" | "client_id" | "password" = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    setError({ client_id: null, username: null, detail: null });

    setSuccess('')

    ApiForgotPassword(formData, store)
      .then((response: any) => {
        setSuccess(response?.data.data || "Password Reset Email sent successfully")
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      })
      .catch((e) => {
        setError(e.response?.data || error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div
        id="mm-0"
        className="mm-page mm-slideout"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div id="page">
          <header className="header_sticky">
            <a href="#menu" className="btn_mobile">
              <div className="hamburger hamburger--spin" id="hamburger">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </a>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div id="logo">
                    <img
                      src={logo}
                      data-retina="true"
                      alt=""
                      width="163"
                      height="36"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div id="hero_register" className="py-5">
              <div className="container-fluid margin_120_95_login px-4">
                <div className="row">
                  <div className="col-lg-6">
                    <h1>Redefining Background Screening!</h1>
                    <p className="lead">
                      We at Peleza are redefining how you conduct background
                      screening by offering you a self service platform.
                    </p>
                    <div className="box_feat_2">
                      <i className="pe-7s-note2"></i>
                      <h3>Consent!</h3>
                      <p>
                        Always get a consent from the individual/organisation
                        before you conduct background checks.
                      </p>
                    </div>
                    <div className="box_feat_2">
                      <i className="pe-7s-note"></i>
                      <h3>Collect data</h3>
                      <p>
                        Collect data for the individual/organisation and submit
                        to us easily for Backgorund screening.
                      </p>
                    </div>
                    <div className="box_feat_2">
                      <i className="pe-7s-display1"></i>
                      <h3>Reports</h3>
                      <p>
                        Track progress, and receive digital reports which you
                        can print from the comfort of your desk.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-lg-5 ml-auto"
                    style={{ marginTop: "50px" }}
                  >
                    {error.detail && (
                      <p className="text-danger text-center w-100 pt-1 floating-error px-5">
                        {error?.detail}
                      </p>
                    )}
                    {success && (
                      <p className="text-success text-center w-100 pt-1 floating-error px-5">
                        {success}
                      </p>
                    )}
                    <div className="box_form">
                      <div id="message-register"></div>
                      <h4>RESET PASSWORD</h4>
                      <form
                        name="loginuser"
                        onSubmit={handleSubmit}
                        method="POST"
                      >
                        <div className="row">
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Client Login ID"
                                name="client_id"
                                autoComplete=""
                                onChange={handleChange}
                                autoFocus
                                required
                              />
                              {error.client_id && (
                                <small className="text-danger px-2 floating-error">
                                  {error?.client_id}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Username"
                                name="username"
                                id="username"
                                required
                                onChange={handleChange}
                              />
                              {error.username && (
                                <small className="text-danger px-2 floating-error">
                                  {error?.username}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col">
                            <div className="form-group">
                              <button
                                disabled={loading}
                                type="submit"
                                className="btn bg-primary py-1 small mono text-light"
                              >
                                SEND RESET CODE
                              </button>
                              <span id="scroll-here"></span>
                            </div>
                          </div>
                          {loading && (
                            <div className="spinner-border text-info spinner-sm"></div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div>
                        <Link to="/login">
                          <button
                            disabled={loading}
                            className="btn bg-secondary py-1 small mono text-light"
                          >
                            LOGIN
                          </button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <footer>
          <div className="container margin_60_35">
            <hr />
            <div className="row">
              <div className="col-md-8">
                <ul id="additional_links">
                  <li>
                    <a href="#0">Terms and conditions</a>
                  </li>
                  <li>
                    <a href="#0">Privacy</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <div id="copy">© {new Date().getFullYear()} PSMT</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
