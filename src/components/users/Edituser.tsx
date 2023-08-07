import React, { useEffect, useState } from "react";
import { updateUser } from "../../api/index";
import { store } from "store";
// import { apiGetProfile } from "api";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

interface EditUserFormProps {
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  postalCode: string | undefined;
  title: string | undefined;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  postalCode,
  title,
}) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [loading, setLoading] = useState(false);

  const [userformData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    title: "",
  });

  const [permissions, setPermissions] = useState({
    create_request: false,
    view_request: false,
    add_user: false,
    view_user: false,
    create_batch_request: false,
    view_batch_request: false,
  });

  let params: any = useParams()

  useEffect(() => {
    localStorage.setItem('preserve-filters', 'false');
    getUser(params.id)
  }, [params.id]);

  const getUser = async (id: any) => {
    try {
      const response: any = await axios.get(`/get-user/${id}`)
      const permission_response: any = await axios.get(`/get-user-permissions/${id}`)
      // console.log(permission_response.data)
      setFormData({
        id: response.data.client_id,
        firstName: response.data.client_first_name,
        lastName: response.data.client_last_name,
        email: response.data.client_login_username,
        phoneNumber: response.data.client_mobile_number,
        postalCode: response.data.client_postal_code,
        title: response.data.title,
      })
      const user_permissions: any[] = []
      permission_response.data.forEach((permission: { permission: any }) => {
        user_permissions.push(permission.permission.permission)
      })
      setPermissions({
        create_request: user_permissions.includes('create requests') ? true : false,
        view_request: user_permissions.includes('view requests') ? true : false,
        add_user: user_permissions.includes('create users') ? true : false,
        view_user: user_permissions.includes('view users') ? true : false,
        create_batch_request: user_permissions.includes('create batch requests') ? true : false,
        view_batch_request: user_permissions.includes('view batch requests') ? true : false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [error, setError] = useState("");

  let history = useHistory();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handlePermissionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({ ...prevPermissions, [name]: checked }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Create a FormData object to send the form data including the image file
    const userformDataToSend = new FormData();
    userformDataToSend.append("id", userformData.id || "");
    userformDataToSend.append("firstName", userformData.firstName || "");
    userformDataToSend.append("lastName", userformData.lastName || "");
    userformDataToSend.append("email", userformData.email || "");
    userformDataToSend.append("phoneNumber", userformData.phoneNumber || "");
    userformDataToSend.append("postalCode", userformData.postalCode || "");
    userformDataToSend.append("title", userformData.title || "");

    Object.entries(permissions).forEach(([key, value]) => {
      userformDataToSend.append(key, value ? "1" : "0");
    });
    // Call the API function to submit the form data
    updateUser(userformDataToSend, store)
      .then((response) => {
        // Handle the response
        setLoading(false);

        // Clear the form fields
        setFormData({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          postalCode: "",
          title: ""
        });
        setPermissions({
          create_request: false,
          view_request: false,
          add_user: false,
          view_user: false,
          create_batch_request: false,
          view_batch_request: false,
        });
        history.push('/users')
      })
      .catch((error) => {
        // Handle the error
        setLoading(false);
        setError(error.response?.data?.message);
      });
  }

  return (
    <div className="question-form-container">
      {/* Rest of the code */}
      <div className="box_form">
        <div className="form_title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h2>
            <strong>Edit User</strong>
          </h2>
        </div>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <form name="questionForm" onSubmit={handleSubmit} action="add-user/" method="POST">
          {/* Form Fields */}
          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={userformData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={userformData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title (Company Position)"
                  name="title"
                  value={userformData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={userformData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={userformData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Postal Code"
                      name="postalCode"
                      value={userformData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* Permissions Section */}
              <div className="form-group">
                <h5>Permissions:</h5>
                <ul className="d-flex justify-content-between flex-wrap">
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="create_request"
                        checked={permissions.create_request}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        Create Request
                      </span>
                    </label>
                  </li>
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="view_request"
                        checked={permissions.view_request}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        View Request
                      </span>
                    </label>
                  </li>
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="add_user"
                        checked={permissions.add_user}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        Add User
                      </span>
                    </label>
                  </li>
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="view_user"
                        checked={permissions.view_user}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        View User
                      </span>
                    </label>
                  </li>
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="create_batch_request"
                        checked={permissions.create_batch_request}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        Create Batch Request
                      </span>
                    </label>
                  </li>
                  <li className="pr-3">
                    <label className="permission-label">
                      <input
                        className="permission-checkbox"
                        type="checkbox"
                        name="view_batch_request"
                        checked={permissions.view_batch_request}
                        onChange={handlePermissionChange}
                      />
                      <span className="permission-text">
                        View Batch Request
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary float-right"
              disabled={
                loading 
                  ? true
                  : false
              }
            >
              {loading && (
                <div className="spinner-border spinner-sm mr-2"></div>
              )}
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;

