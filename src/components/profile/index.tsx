import { apiGetProfile, apiUpdateProfile } from "api";
import { UserProfile } from "models";
import { Component } from "react";
import { connect } from "react-redux";
import { State, store } from "store";
import { Base64 } from "utils/functions";



class _Profile extends Component<{ profile: UserProfile }> {
  state = {
    loading: true,
    password: null,
    confirm_password: null,
    password_changing: false,
  };
  constructor(props: any) {
    super(props);
    this.handleChage = this.handleChage.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    apiGetProfile(store, (data: any) =>
      this.setState({ ...this.state, loading: false })
    );
  }
  changePassword(e: any) {
    e.preventDefault();
    if (this.disabled) return;
    this.setState({ password_changing: true }, () =>
      apiUpdateProfile(
        {
          password: Base64.encode(this.state.confirm_password),
        },
        () => {
          const form: HTMLFormElement | any =
            document.getElementById("changepwdform");
          form.reset();

          this.setState({ password_changing: false });
        }
      )
    );
  }
  updateProfile(e: any) {
    e.preventDefault();
  }
  handleChage(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }
  get disabled() {
    return (
      this.state.password !== this.state.confirm_password &&
      this.state.confirm_password
    );
  }
  render() {
    const disable = this.disabled;
    const { profile } = this.props;
    return (
      <>
    
        {this.state.loading === true ? (
          <div className="vh-100 vw-100 fixed-top d-flex justify-content-center align-items-center">
            <div className="spinner-border"></div>
          </div>
        ) : (
          <div className="container margin_60">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="box_general_3 cardt">
                  <div className="message">
                    <p>Your Created Profile:</p>
                  </div>
                  <div className="form_title">
                    <h3>
                      <strong>1</strong>Personal Details:
                    </h3>
                    <p>
                      To edit details kindly contact Peleza PSMT administrator.
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>First name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="client_first_name"
                            name="client_first_name"
                            defaultValue={this.props.profile?.client_first_name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Other names</label>
                          <input
                            type="text"
                            className="form-control"
                            id="client_last_name"
                            name="client_last_name"
                            placeholder="Doe"
                            defaultValue={this.props.profile.client_last_name}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            id="added_date"
                            name="added_date"
                            className="form-control"
                            placeholder="00 44 678 94329"
                            defaultValue={
                              this.props.profile.client_parent_company?.company_country
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label>Parent Company</label>
                          <input
                            type="text"
                            id="added_date"
                            name="added_date"
                            className="form-control"
                            placeholder="00 44 678 94329"
                            defaultValue={
                              this.props.profile.client_parent_company?.company_name
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label>Industry</label>
                          <input
                            type="text"
                            id="added_date"
                            name="added_date"
                            className="form-control"
                            placeholder="00 44 678 94329"
                            defaultValue={
                              this.props.profile.client_parent_company?.company_industry
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="form_title">
                    <h3>
                      <strong>2</strong>Contact and Billing Address Details:
                    </h3>
                    <p>
                      To edit (Email and Mobile Phone) details kindly contact
                      Peleza PSMT administrator.
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            id="client_email_address"
                            name="client_email_address"
                            className="form-control"
                            placeholder="jhon@doe.com"
                            defaultValue={
                              this.props.profile.client_login_username
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Mobile Phone</label>
                          <input
                            type="text"
                            id="client_mobile_number"
                            name="client_mobile_number"
                            className="form-control"
                            placeholder="00 44 678 94329"
                            defaultValue={
                              this.props.profile.client_mobile_number
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <form
                      className="form-horizontal sm-t-40"
                      id="addressform"
                      name="adressform"
                      method="POST"
                      onClick={this.updateProfile}
                    >
                      <div className="row">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>Postal Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="client_postal_address"
                              name="client_postal_address"
                              placeholder="Jhon"
                              defaultValue={
                                this.props.profile.client_postal_address
                              }
                              style={{
                                backgroundImage: 'url("data:image/png',
                                backgroundRepeat: "no-repeat",
                                backgroundAttachment: "scroll",
                                backgroundSize: "16px 18px",
                                backgroundPosition: "98% 50%",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="client_postal_code"
                              name="client_postal_code"
                              placeholder="Doe"
                              defaultValue={
                                this.props.profile.client_postal_code
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>Postal City</label>
                            <input
                              type="text"
                              className="form-control"
                              id="client_city"
                              name="cPostallient_city"
                              placeholder="Doe"
                              defaultValue={this.props.profile.client_city}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm py-2 px-3"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                      <input
                        type="hidden"
                        name="MM_update"
                        defaultValue="adressform"
                      />
                    </form>
                  </div>
                  <hr />
                  {/*End step */}
                  <div className="form_title">
                    <h3>
                      <strong>3</strong>Credentials
                    </h3>
                    <p>You can Change and Edit Password.</p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Login Username</label>
                          <input
                            type="text"
                            id="card_number"
                            name="card_number"
                            className="form-control"
                            placeholder="xxxx - xxxx - xxxx - xxxx"
                            defaultValue={
                              this.props.profile.client_login_username
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <form
                          className="form-horizontal m-t-40"
                          id="changepwdform"
                          name="changepwdform"
                          method="POST"
                          onSubmit={this.changePassword}
                        >
                          <input
                            type="hidden"
                            className="form-control"
                            id="client_id"
                            name="client_id"
                            placeholder="Jhon"
                            defaultValue={2}
                          />
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label>Password</label>
                                <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  className="form-control"
                                  style={{
                                    backgroundRepeat: "no-repeat",
                                    backgroundAttachment: "scroll",
                                    backgroundSize: "16px 18px",
                                    backgroundPosition: "98% 50%",
                                  }}
                                  onChange={this.handleChage}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label>Repeat Password</label>
                                <input
                                  type="password"
                                  id="confirm_password"
                                  name="confirm_password"
                                  className="form-control"
                                  style={{
                                    backgroundRepeat: "no-repeat",
                                    backgroundAttachment: "scroll",
                                    backgroundSize: "16px 18px",
                                    backgroundPosition: "98% 50%",
                                  }}
                                  onChange={this.handleChage}
                                />
                              </div>

                              {disable && (
                                <small className="text-danger px-2 floating-error">
                                  Passwords must match
                                </small>
                              )}
                            </div>
                            <div className="col-6">
                              {this.state.password_changing && (
                                <div className="spinner-border spinner-sm"></div>
                              )}
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                              <button
                                className="btn btn-primary btn-sm py-2 px-3"
                                type="submit"
                                disabled={
                                  disable ||
                                  (!this.state.confirm_password &&
                                    !this.state.password)
                                    ? true
                                    : false
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    profile: state.global.profile,
  };
};
export const Profile = connect(mapStateToProps)(_Profile);
