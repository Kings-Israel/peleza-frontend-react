import React, { useEffect, useState } from "react";
import { ApiHelp } from "../../api/index";


interface QuestionFormProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  subject:  string | undefined;
  image: string | undefined;
  message:  string | undefined;
}



const QuestionForm: React.FC<QuestionFormProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  subject,
  image,
  message
}) => {
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
  
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    image: "",
    message: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      // Get the file path and set it in the state
      const filePath = URL.createObjectURL(selectedFile);
      setFormData((prevState) => ({
        ...prevState,
        image: filePath,
      }));
    }
  };
  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
  
    // Create a FormData object to send the form data including the image file
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName || "");
    formDataToSend.append("lastName", formData.lastName || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("phoneNumber", formData.phoneNumber || "");
    formDataToSend.append("subject", formData.subject || "");
    formDataToSend.append("image", formData.image || "");
    formDataToSend.append("message", formData.message || "");
  
    // Call the API function to submit the form data
    ApiHelp(formDataToSend)
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
          subject: "",
          image: "",
          message: "",
        });
  
        // Set a success message (replace "successMessage" with your desired state variable)
        setSuccessMessage("Form submitted successfully");
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
              <h1>
                <strong>Help Page</strong>
              </h1>
                   
          </div>
          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
          {successMessage && <p id="success-message" style={{ color: "green" }}>{successMessage}</p>}
          <form name="questionForm" onSubmit={handleSubmit} action="/submit-help" method="POST">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
               
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
               
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />

            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>           
  );
}
            
export default QuestionForm;
            





