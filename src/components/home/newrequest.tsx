import CheckBoxOutlineBlankRounded from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxRounded from "@material-ui/icons/CheckBoxRounded";
import { ApiNewRequest } from "api";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { State, store } from "store";
import { GlobalState } from "store/reducers/global";
import { toggleModal } from "../../utils/functions";

export function NewRequest() {
  let state: State = store.getState();

  let modules: GlobalState["modules"] = Object.entries(state.global.modules);
  const [key, setKey]: [any, any] = useState(null);
  const loading = key !== null ? true : false;

  useEffect(() => {
    localStorage.setItem('preserve-filters', 'false');
    toggleModal();
    return () => {
      toggleModal();
    };
  }, []);

  const [formData, setFormData] = useState({
    registration_number: null,
    dataset_name: null,
    dataset_citizenship: null,
    client_number: null,
    terms_and_conditions: false,
    module_id: modules[0][0],
    package_id: modules[0][1].package_id,
    req_plan: modules[0][1].url,
  });

  const [error, setError]: [any, any] = useState(null);

  let history = useHistory();

  function goBack(e: any) {
    history.push("/");
  }

  const disableSubmission = key
    ? true
    : formData.dataset_name &&
      formData.client_number &&
      formData.module_id &&
      formData.dataset_citizenship &&
      formData.registration_number &&
      formData.terms_and_conditions
    ? false
    : true;

  function handleSubmit(e: any) {
    e.preventDefault();
    if (disableSubmission) {
      return;
    }
    const _key = ApiNewRequest(formData, store, function (data) {
      if (data) {
        setError(data);
      } else {
        setFormData({
          module_id: null,
          dataset_citizenship: null,
          client_number: null,
          package_id: null,
          dataset_name: null,
          registration_number: null,
          terms_and_conditions: false,
          req_plan: null,
        });
        document.getElementsByTagName("form")[0].reset();
      }
      setKey(null);
    });
    setKey(_key);
  }

  function handleSubmitAndRedirect(e: any) {
    e.preventDefault();
    if (disableSubmission) {
      return;
    }
    const _key = ApiNewRequest(formData, store, function (data) {
      if (data) {
        setError(data);
      } else {
        setFormData({
          module_id: null,
          dataset_citizenship: null,
          client_number: null,
          package_id: null,
          dataset_name: null,
          registration_number: null,
          terms_and_conditions: false,
          req_plan: null,
        });
        document.getElementsByTagName("form")[0].reset();
        goBack(null);
      }
      setKey(null);
    });
    setKey(_key);
  }

  function handleChange(e: any) {
    const key:
      | "module_id"
      | "package_id"
      | "dataset_citizenship"
      | "client_number"
      | "registration_number"
      | "terms_and_conditions"
      | "req_plan"
      | "dataset_name" = e.target.name;
     

    setFormData({ ...formData, [key]: e.target.value });
  }
  function setModule(module: any) {
    if (loading) {
      return;
    }
    
    setFormData({
      ...formData,
      module_id: module[0],
      package_id: module[1].package_id,
      req_plan: module[1].url,
    });
  }
  let label = formData.module_id
    ? modules.find((i: any) => i[1].package_id === formData.package_id)[1].label
    : "Company";

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
                <h4 className="m-0 col">New Request</h4>
                <button className="btn btn-sm text-danger" onClick={goBack}>
                  <h3 className="text-danger">&times;</h3>
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} action="#">
                  <div className="form-group">
                    <label htmlFor="">Client Number</label>
                    <input
                      type="text"
                      className="form-control blur-cont border-0"
                      placeholder="Client Number"
                      name="client_number"
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {error?.client_number && (
                      <small className="text-danger floating-error">
                        {error?.client_number}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="">{`${label} Name`}</label>
                    <input
                      type="text"
                      className="form-control blur-cont border-0"
                      placeholder={`${label} Name`}
                      name="dataset_name"
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {error?.dataset_name && (
                      <small className="text-danger floating-error">
                        {error?.dataset_name}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Registration Number</label>
                    <input
                      type="text"
                      className="form-control blur-cont border-0"
                      placeholder="Registration Number"
                      name="registration_number"
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    {error?.registration_number && (
                      <small className="text-danger floating-error">
                        {error?.registration_number}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      className="form-control blur-cont border-0"
                      placeholder="Kenya"
                      name="dataset_citizenship"
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {error?.dataset_citizenship && (
                      <small className="text-danger floating-error">
                        {error?.dataset_citizenship}
                      </small>
                    )}
                  </div>

                  <label htmlFor="">Company Type</label>
                  <div className="form-row">
                    {modules &&
                      modules.map((module: any) => (
                        <div className=" col-12 col-lg-6" key={module[1].name}>
                          <div
                            onClick={() => setModule(module)}
                            className=" border-0 mb-1 cursor-pointer h-100 p-1"
                          >
                           
                            <div className="card-body p-2 blur-cont h-100 rounded-sm d-flex justify-content-center flex-column">
                              <div className="d-flex align-items-center">
                                <p className="m-0 small w-100">
                                  {module[1].name}
                                </p>
                                <div className="icon">
                                  {module[0] === formData.module_id ? (
                                    <CheckBoxRounded className="text-primary" />
                                  ) : (
                                    <CheckBoxOutlineBlankRounded className="text-secondary" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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
                  <div className="row">
                    <div className="col-4">
                      {!loading && disableSubmission && (
                        <div className="text-danger">*Please fill all fields to submit.</div>
                      )}
                      {loading && (
                        <div className="spinner-border text-info spinner-sm"></div>
                      )}
                    </div>
                    <div className="col-8">
                      <div className="d-flex justify-content-between">
                        <div className="buttons pt-3">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-sm btn-primary border-0 float-right py-2"
                            disabled={disableSubmission}
                          >
                            SUBMIT AND MAKE NEW REQUEST
                          </button>
                        </div>
                        <div className="buttons pt-3">
                          <button
                            type="button"
                            onClick={handleSubmitAndRedirect}
                            className="btn btn-sm btn-primary border-0 float-right py-2"
                            disabled={disableSubmission}
                          >
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </div>
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
