import React, { useEffect, useState } from "react";
import { ApiAddUser } from "../../api/index";
import { store } from "store";
import { apiGetProfile } from "api";

interface AddUserFormProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  city: string | undefined;
  address: string | undefined;
  added_by_id: string | undefined;
  company: string | undefined;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  city,
  address,
  added_by_id,
  company,
}) => {
  const [loading, setLoading] = useState(false);

  const [userformData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    added_by_id: "",
    company: "",
  });

  useEffect(() => {
    apiGetProfile(store, (data: any) => {
      const userProfile = data?.data;

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        address: "",
        added_by_id: userProfile?.client_id || "",
        company: userProfile?.client_parent_company || "",
      });
      setLoading(false);
    });
  }, []);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [permissions, setPermissions] = useState({
    create_request: false,
    view_request: false,
    add_user: false,
    view_user: false,
    create_batch_request: false,
    view_batch_request: false,
  });

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
    setSuccessMessage("");

    // Create a FormData object to send the form data including the image file
    const userformDataToSend = new FormData();
    userformDataToSend.append("firstName", userformData.firstName || "");
    userformDataToSend.append("lastName", userformData.lastName || "");
    userformDataToSend.append("email", userformData.email || "");
    userformDataToSend.append("phoneNumber", userformData.phoneNumber || "");
    userformDataToSend.append("city", userformData.city || "");
    userformDataToSend.append("address", userformData.address || "");
    userformDataToSend.append("added_by_id", userformData.added_by_id || "");
    userformDataToSend.append("company", userformData.company || "");

    Object.entries(permissions).forEach(([key, value]) => {
        userformDataToSend.append(key, value ? "1" : "0");
      });
    // Call the API function to submit the form data
    ApiAddUser(userformDataToSend)
      .then((response) => {
        // Handle the response
        setLoading(false);
        console.log(response);

        // Clear the form fields
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            city: "",
            address: "",
            added_by_id: "",
            company: "",
          });
          setPermissions({
            create_request: false,
            view_request: false,
            add_user: false,
            view_user: false,
            create_batch_request: false,
            view_batch_request: false,
          });
        // Set a success message (replace "successMessage" with your desired state variable)
        setSuccessMessage("User added successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // 5000 milliseconds = 5 seconds
      })
      .catch((error) => {
        // Handle the error
        setLoading(false);
        setError("An error occurred while submitting the form.");
        console.log(error);
      });
  }

  return (
    <div className="question-form-container">
      {/* Rest of the code */}
      <div className="box_form">
        <div className="form_title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h2>
            <strong>Add User</strong>
          </h2>
        </div>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        {successMessage && <p id="success-message" style={{ color: "green" }}>{successMessage}</p>}
        <form name="questionForm" onSubmit={handleSubmit} action="add-user/" method="POST">
          {/* Form Fields */}
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
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              value={userformData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Address"
              name="address"
              value={userformData.address}
              onChange={handleChange}
              required
            />
          </div>
             {/* Permissions Section */}
          {/* Permissions Section */}
<div className="form-group">
  <h5>Permissions:</h5>
  <ul>
    <li>
      <label>
        <input
          type="checkbox"
          name="create_request"
          checked={permissions.create_request}
          onChange={handlePermissionChange}
        />
        Create Request
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          name="view_request"
          checked={permissions.view_request}
          onChange={handlePermissionChange}
        />
        View Request
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          name="add_user"
          checked={permissions.add_user}
          onChange={handlePermissionChange}
        />
        Add User
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          name="view_user"
          checked={permissions.view_user}
          onChange={handlePermissionChange}
        />
        View User
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          name="create_batch_request"
          checked={permissions.create_batch_request}
          onChange={handlePermissionChange}
        />
        Create Batch Request
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          name="view_batch_request"
          checked={permissions.view_batch_request}
          onChange={handlePermissionChange}
        />
        View Batch Request
      </label>
    </li>
  </ul>
</div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;

