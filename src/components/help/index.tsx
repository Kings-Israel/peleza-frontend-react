import React, { useEffect, useState, useRef } from "react";
import { ApiHelp } from "../../api/index";
import { UserProfile } from "models";
import {  store } from "store";
import { apiGetProfile } from "api";
import axios from "axios";
// import { Help, HelpData } from "store/reducers/help";

interface QuestionFormProps {
  subject:  string | undefined;
  image: string | undefined;
  message:  string | undefined;
  profile: UserProfile | null;
}

interface HelpItem {
  id: string;
  subject: string;
  messages: string;
  responses: string | undefined;
  unread_responses: string | undefined;
}

interface FetchedHelpItem {
  id: string | undefined;
  subject: string | undefined;
  messages: [] | undefined;
  responses: [] | undefined;
}

interface Message {
  id: string | undefined;
  message: string | undefined;
  response: string | undefined;
  created_at: string | undefined;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  subject,
  image,
  message,
  profile,
}) => {
  const [helpItems, setHelpItems] = useState<HelpItem[]>([])
  const [fetchedHelpItem, setFetchedHelpItem] = useState<Partial<FetchedHelpItem>>({})
  const [messages, setMessages] = useState<Message[]>([])

  const messagesBox = useRef<null | HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    userId: "",
    // firstName:  "", 
    // lastName:  "",
    // email:  "",
    // phoneNumber: "", 
    subject: "",
    image: "",
    message: "",
    helpId: "",
  });

  const fetchHelpItems = async () => {
    try {
      const response = await axios.get('/help')
      setHelpItems(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const scrollToLastMessage = () => {
    const lastChildElement = messagesBox.current?.lastElementChild
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchHelpItem = async (id: string) => {
    try {
      const response = await axios.get(`/help/${id}`)
      setFetchedHelpItem(response.data)
      formData.helpId = id
      setMessages([...response.data.messages, ...response.data.responses].sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at)))
      scrollToLastMessage()
    } catch (error) {
      console.log(error)
    }
  }

  function closeHelpItem() {
    setFetchedHelpItem({})
  }

  useEffect(() => {
    apiGetProfile(store, (data: any) => {
      const userProfile = data?.data;
      
      setFormData({
        userId: userProfile?.client_id || "",
        // firstName: userProfile?.client_first_name || "",
        // lastName: userProfile?.client_last_name || "",
        // email: userProfile?.client_login_username || "",
        // phoneNumber: userProfile?.client_mobile_number || "",
        subject: "",
        image: "",
        message: "",
        helpId: "",
      });
      setLoading(false);
    });

    fetchHelpItems();
  }, []);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

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
  
    // Create a FormData object to send the form data including the image file
    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId || "");
    // formDataToSend.append("firstName", formData.firstName || "");
    // formDataToSend.append("lastName", formData.lastName || "");
    // formDataToSend.append("email", formData.email || "");
    // formDataToSend.append("phoneNumber", formData.phoneNumber || "");
    formDataToSend.append("subject", formData.subject || "");
    formDataToSend.append("image", formData.image || "");
    formDataToSend.append("message", formData.message || "");
    formDataToSend.append("help_id", formData.helpId || "");
  
    // Call the API function to submit the form data
    ApiHelp(formDataToSend, store)
      .then((response) => {
        if (formData.helpId !== "") {
          fetchHelpItem(formData.helpId)
        } else {
          fetchHelpItems()
        }
        // Handle the response
        setLoading(false);
        formData.subject = ""
        formData.image = ""
        formData.message = ""
        formData.helpId = ""
      })
      .catch((error) => {
        // Handle the error
        setLoading(false);
        setError("An error occurred while submitting the form.");
        console.log(error);
      });
  }

  return (
    <>
      <div className="question-form-container">
        {/* Rest of the code */}
        <div className="box_form">
          <div className="form_title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>
              <strong>Need Help?</strong>
            </h1>
          </div>
          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
          <div className="row">
            <div className="col-md-6">
              <h3 className="mx-auto">My Enquiries</h3>
              {helpItems.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-md-10">
                      <h4>Subject</h4>
                    </div>
                    <div className="col-md-2">
                      <h4>Unread</h4>
                    </div>
                  </div>
                  <>
                  {helpItems.map((helpItem, index) => (
                    <div key={index} onClick={() => fetchHelpItem(helpItem.id)} style={{ cursor: 'pointer' }} className={fetchedHelpItem && fetchedHelpItem.id === helpItem.id ? 'row fetch-active help-item' : 'row help-item'}>
                      <div className="col-md-10 my-auto">
                        <h6 className="">{helpItem.subject}</h6>
                      </div>
                      <div className="col-md-2 my-auto">
                        <p className="pt-2">{helpItem.unread_responses}</p>
                      </div>
                      {/* <td>{helpItem.message}</td> */}
                    </div>
                  ))}
                  </>
                </>
                // <table className="user-table">
                //   <thead>
                //     <tr>
                //       <th>Subject</th>
                //       {/* <th>Message</th> */}
                //       <th>Response Count</th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     {helpItems.map((helpItem, index) => (
                //       <tr key={index} onClick={() => fetchHelpItem(helpItem.id)} style={{ cursor: 'pointer' }} className={fetchedHelpItem && fetchedHelpItem.id === helpItem.id ? 'fetch-active' : ''}>
                //         <td>{helpItem.subject}</td>
                //         {/* <td>{helpItem.message}</td> */}
                //         <td>{helpItem.responses?.length}</td>
                //       </tr>
                //     ))}
                //   </tbody>
                // </table>
              ) : (
                <p>No help items found</p>
              )}
            </div>
            <div className="col-md-6">
              {fetchedHelpItem.id === undefined ? (
                <>
                  <h3 className="mx-auto">Submit Enquiry</h3>
                  <form name="questionForm" onSubmit={handleSubmit} action="/submit-help" method="POST">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        autoFocus
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group d-none">
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
                        rows={10}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between">
                    <h3 className="">{fetchedHelpItem.subject}</h3>
                    <button className="btn btn-sm btn-danger mb-2" onClick={() => closeHelpItem()}>Close</button>
                  </div>
                  <div className="messages-box" ref={messagesBox}>
                    {messages.length > 0 ? messages.map(message => (
                        message.message ? (
                          <div key={message.created_at}>
                            <div className="message-box sent d-flex justify-content-between">
                              <span>{message.message}</span>
                              <span>{message.created_at}</span>
                            </div>
                          </div>
                        ) : (
                          <div key={message.created_at}>
                            <div className="message-box received d-flex justify-content-between">
                              <span>{message.response}</span>
                              <span>{message.created_at}</span>
                            </div>
                          </div>
                        )
                    )) : (
                      <>
                        <div className="no-messages"> No Messages Found</div>
                      </>
                    )}
                  </div>
                  <form name="questionForm" onSubmit={handleSubmit} action="/submit-help" method="POST">
                      <input
                        type="hidden"
                        name="helpId"
                        value={fetchedHelpItem.id}
                        onChange={handleChange}
                        required
                      />
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        autoFocus
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}
            
export default QuestionForm;
            





