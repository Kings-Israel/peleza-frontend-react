import { ApiGetCompanies, } from "api";
import { Component } from "react";
import { connect } from "react-redux";
import { State, store } from "store";
import { ApiRegister } from "../../api/index";
import { Link } from "react-router-dom";
import logo from "../../assets/images/banner-logo.png";
import Select from 'react-select';

class _Register extends Component<{ countries: any, companies: any, industries: any }> {
  state = {
    loading: false,
    first_name: null,
    last_name: null,
    email: null,
    mobile_number: null,
    password: null,
    company_id: null,
    // country: null,
    company: null,
    // client_type: 'psmt',
    // industry: null,
    city: null,
  };
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // ApiGetCountries(store, (data: any) =>
    //   this.setState({ ...this.state })
    // );
    ApiGetCompanies(store, (data: any) => {
      this.setState({ ...this.state });
    })
    // ApiGetIndustries(store, (data: any) => {
    //   this.setState({ ...this.state });
    // })
  }

  handleChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCompanyChange(e: any) {
    this.setState({ company_id: e.value })
  }

  handleCountryChange(e: any) {
    this.setState({ country: e.value })
  }

  handleIndustryChange(e: any) {
    this.setState({ industry: e.value })
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      mobile_number: this.state.mobile_number,
      password: this.state.password,
      // country: this.state.country,
      company_id: this.state.company_id,
      // account_type: this.state.client_type,
      // client_industry: this.state.industry,
      company: this.props.companies.filter((company: any) => company.value === this.state.company_id)[0].label,
      city: this.state.city,
    }
    ApiRegister(data)
      .then(() => {
        window.location.replace("/");
      })
      .catch((e: any) => {
        console.error(e);
      })
  }
  render() {
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
              <div className="container-fluid px-4">
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
                    style={{ marginTop: "10px" }}
                  >
                    <div className="box_form">
                      <div id="message-register"></div>
                      <form
                        name="loginuser"
                        onSubmit={this.handleSubmit}
                        method="POST"
                      >
                         <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="first_name"
                                id="first_name"
                                required
                                onChange={this.handleChange}
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="last_name"
                                id="last_name"
                                required
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                autoComplete=""
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number"
                                name="mobile_number"
                                autoComplete=""
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter City"
                                name="city"
                                autoComplete=""
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <Select
                                options={this.props.countries}
                                onChange={this.handleCountryChange}
                                placeholder="Select Country..."
                                name="country"
                              />
                            </div>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <Select
                                options={this.props.companies}
                                onChange={this.handleCompanyChange}
                                placeholder="Select Company..."
                                name="company"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <Select
                                options={this.props.industries}
                                onChange={this.handleIndustryChange}
                                placeholder="Select Industry..."
                                name="industry"
                              />
                            </div>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                id="password"
                                required
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col">
                            <div className="form-group">
                              <button
                                disabled={this.state.loading}
                                type="submit"
                                className="btn bg-primary py-1 small mono text-light"
                              >
                                REGISTER
                              </button>
                              <span id="scroll-here"></span>
                            </div>
                          </div>
                          {this.state.loading && (
                            <div className="spinner-border text-info spinner-sm"></div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div>
                      <span>Already Have an Account? </span>
                        <Link to="/login">
                          <button
                            disabled={this.state.loading}
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
}

const mapStateToProps = (state: State) => {
  return {
    countries: state.global.countries,
    companies: state.global.companies,
    industries: state.global.industries,
  };
};
export const Register = connect(mapStateToProps)(_Register);
