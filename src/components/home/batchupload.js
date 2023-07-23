import CheckBoxOutlineBlankRounded from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxRounded from "@material-ui/icons/CheckBoxRounded";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "store";

import { ApiNewBatchRequest } from "api";
import { getToken,getSesionItem } from "utils/auth.token";
import { ExportCSV } from "./ExportCSV";

import { ExportCSVKYC } from "./ExportCSVKYC";

// import { BatchRequestTable } from "./batchRequestTable";
// import { KycGuideTable } from "./kycGuideTable";


export const BatchUpload = () => {

  // Row Data
  const batchRequests = () => {
    let batchR = []

    for (let i = 0; i <= 1; i++) {
      batchR.push({
        client_number: `GH000${i}`,
        company_name: `Batch Co Ltd ${i}`,
        registration_number: `B${i}-PVT-1234567A`,
        country: `Kenya`,
        kyc_type: `LLP`
      });
    }

    return batchR

  }

  // KYC Data
  const kycGuides = () => {
    let kycG = []


    kycG.push(
      {
        kyc_type: "CO",
        kyc_type_name: "Company",
      },
      {
        kyc_type: "BN",
        kyc_type_name: "Business",
      },
      {
        kyc_type: "SOC",
        kyc_type_name: "Societies",
      },
      {
        kyc_type: "CBO",
        kyc_type_name: "Community Based Organisation",
      },
      {
        kyc_type: "TR",
        kyc_type_name: "TrustS",
      },
      {
        kyc_type: "ICO",
        kyc_type_name: "International Company",
      },
      {
        kyc_type: "SACCO",
        kyc_type_name: "Cooperative SACCO",
      },
      {
        kyc_type: "LLP",
        kyc_type_name: "Limited Liability Patnerships",
      },
      {
        kyc_type: "CLG",
        kyc_type_name: "Company Limited By Guarantee",
      },
      {
        kyc_type: "NGO",
        kyc_type_name: "NGO Search",
      },
    );

    return kycG
  }

  localStorage.setItem('preserve-filters', 'false');

  let fileName = "Sample-Batch-request"
  let fileNameKyc = "KYC-Guide-2021"

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [key, setKey] = useState(null);
  const loading = key !== null ? true : false;



  const [formData, setFormData] = useState({
    terms_and_conditions: false,
  });

  const [error, setError] = useState(null);

  let history = useHistory();

  function goBack(e) {
    history.push("/");
  }
  const disableSubmission = key
    ? true
    : isFilePicked &&
      formData.terms_and_conditions
      ? false
      : true;

  // Submit CSV File
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  // On Submit File
  const handleSubmission = (e) => {
    e.preventDefault();
    // If Terms & Condition is not checked and File is Not Uploaded:
    if (disableSubmission) {
      return;
    }

    let formData = new FormData();
    formData.append("myfile", selectedFile);
    formData.append('user',getSesionItem('user'))

    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
    }


    // Call API to Post
    const _key = ApiNewBatchRequest(formData, store, config, function (data) {
      if (data) {
        setError(data);
      } else {
        setFormData({
          terms_and_conditions: false,
        });
        setIsFilePicked(false);
        document.getElementsByTagName("form")[0].reset();
      }
      setKey(null);
    });
    setKey(_key);

  }

  return (
    <>
      <div
        className="container-fluid fixed-top"
        style={{ background: "rgba(0,0,0,.7)" }}
        onClick={goBack}
      >
        <div className="row justify-content-center vh-100 hide-scroll overflow-y-scroll">
          <div className="col-md-6 col-lg-5 col-11 py-4 flex-fill rounded-lg overflow-hidden">
            <div
              className="card blur-cont border-0 rounded-lg h-100 px-3"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="card-header bg-transparent border-secondary d-flex">
                <h4 className="m-0 col">Batch Request</h4>
                <button className="btn btn-sm text-danger" onClick={goBack}>
                  <h3 className="text-danger">&times;</h3>
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmission} action="#">
                  <div className="form-group">
                    <label htmlFor="">Download Sample Excel to Edit</label>
                    <br />
                    <br />

                    <div className="row">
                      <div className="col-md-8">
                        <h5>Batch Request Sample Excel:</h5>
                      </div>
                      <div className="col-md-4 center">
                        <ExportCSV csvData={batchRequests()} fileName={fileName} />
                      </div>

                      {/* <BatchRequestTable batchRequests={batchRequests()}/> */}
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-8">
                        <h5>KYC Naming Guide:</h5>
                      </div>
                      <div className="col-md-4 center">
                        <ExportCSVKYC csvData={kycGuides()} fileNameKyc={fileNameKyc} />
                      </div>

                      {/* <KycGuideTable batchRequests={kycGuides()} /> */}
                    </div>

                  </div>

                  <hr />

                  <div className="form-group">
                    <label htmlFor="">Kindly upload only the batch request Excel Sheet:</label>
                    <br />
                    <br />
                    <input
                      type="file"
                      name="myfile"
                      onChange={changeHandler}
                      className="form-control blur-cont border-0"
                      disabled={loading}
                    />
                    {error?.myfile && (
                      <small className="text-danger floating-error">
                        {error?.myfile}
                      </small>
                    )}
                    {/* After File is Selected. */}
                    {isFilePicked ? (
                      <div>
                        <p>Filename: {selectedFile.name}</p>
                        {/* <p>Filetype: {selectedFile.type}</p> */}
                        {/* <p>Size in bytes: {selectedFile.size}</p> */}
                        <p>
                          lastModifiedDate:{' '}
                          {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                      </div>
                    )
                      :
                      (
                        <>
                          <p style={{ color: "grey" }}>Select a file to upload.</p>
                        </>
                      )
                    }
                  </div>

                  <hr />

                  <div className="py-2 d-md-block d-none"></div>

                  <div
                    className="checkbox align-items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData({
                        ...formData,
                        terms_and_conditions: !formData.terms_and_conditions,
                      });
                    }}
                  >
                    <label htmlFor="">Terms & Conditions</label>
                    <div
                      className="d-flex align-items-center small"
                      style={{ lineHeight: "15px" }}
                    >
                      {formData.terms_and_conditions ? (
                        <CheckBoxRounded className="my-0 mr-1 text-primary" />
                      ) : (
                        <CheckBoxOutlineBlankRounded className="my-0 mr-1" />
                      )}
                      I accept terms and conditions and general policy of
                      Background Screening Request. I also accept that the data
                      set above mentioned has given consent for us to conduct
                      background screening
                    </div>
                  </div>
                  <hr className="d-none d-md-block" />
                  <div className="buttons pt-3">
                    {loading && (
                      <div className="spinner-border text-info spinner-sm"></div>
                    )}
                    <button
                      type="submit"
                      onClick={handleSubmission}
                      className="btn btn-sm btn-primary border-0 float-right py-2"
                      disabled={disableSubmission}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}