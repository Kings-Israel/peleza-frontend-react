import { AxiosError } from "axios";
import { setLoadedAction, setLoadingAction } from "store/actions/api";
import { setProfile } from "store/actions/auth";
import { addNotificationAction } from "store/actions/notification";
import { setRequestsAction, setStatsAction } from "store/actions/requests";
import { clearToken, setToken } from "utils/auth.token";
import api from "./api";
import { setCountries } from "store/actions/countries";
import { setCompanies } from "store/actions/companies";
import { setIndustries } from "store/actions/industries";
import { getQueryString, requestKey } from "utils/functions";

export const ApiLogin = (info: any) => {

  const request = api.post("auth/login/", info);
  request.then((data) => {
    if (data.status === 200) {
      setToken(data.data);
      localStorage.setItem('company_logo', data.data.company_logo);
      localStorage.setItem('permissions', JSON.stringify(data.data.permissions));
    } else {
      clearToken();
    }
    return data;
  });

  return request;
};

export const ApiHelp = (formData: FormData, store: any) => {
  return api
    .post("submit-help/", formData)
    .then((response) => {
      
      // console.log(response.data);
      // Handle successful response
      const body = "Your message was sent successfully.";
      store.dispatch(addNotificationAction(body, "success"));
      return response.data;
    })
    .catch((error: AxiosError) => {
      const body = "An error occurred while sending the message.";
      store.dispatch(addNotificationAction(body, "danger"));
      console.log(error);
      // Handle error response
      throw error;
    });
};

export const ApiAddUser = (userformData: FormData, store: any) => {
  return api
    .post("add-user/", userformData)
    .then((response) => {
      const body = "User was added successfully.";
      store.dispatch(addNotificationAction(body, "success"));

      // Handle successful response
      return response.data;
    })
    .catch((error: AxiosError) => {
      const body = "An error occurred while adding the user.";
      store.dispatch(addNotificationAction(body, "danger"));
      console.log(error);
      // Handle error response
      throw error;
    });
};

export const ApiRegister = (info: any) => {
  const request = api.post("auth/register/", info);
  request.then((data) => {
    if (data.status === 200) {
      setToken(data.data);
      localStorage.setItem('company_logo', data.data.company_logo);
      localStorage.setItem('permissions', JSON.stringify(data.data.permissions));
    } else {
      clearToken();
    }
    return data;
  });

  return request;
};

export const ApiForgotPassword = (info: any, store: any) => {
  return new Promise((resolve, reject) => {
    api.post('auth/password/forgot/', info)
      .then(response => {
        const body = "Password Reset Email Sent Successfully.";
        store.dispatch(addNotificationAction(body, "success"));
        resolve(response)
      })
      .catch(err => {
        const body = "An error occurred. Please check details";
        store.dispatch(addNotificationAction(body, "danger"));
        reject(err)
      })
  })
}

export const ApiNewRequest = (
  data: any,
  store: any,
  callback: (error: string | null | undefined) => void = () => void null
) => {
  const key: string = requestKey();
  const _callback = callback;

  store.dispatch(setLoadingAction(key));
  api
    .post("request/", data)
    .then((response) => {
      api
        .get(
          `/request/${response.data.package_id}/${response.data.request_ref_number}/`
        )
        .then((data) => {
          const body = "Your request has been queued for processing.";
          store.dispatch(addNotificationAction(body, "success"));
    
          // store.dispatch(setRequestsAction([response.data]));
    
          const state = store.getState();
    
          store.dispatch(
            setStatsAction({
              ...state.global?.stats,
              new: state.global?.stats.new + 1,
              recent: [data.data],
            })
          );
      });
    })
    .catch((error: AxiosError) => {
      const body = `Request with Reg No. ${error.request?.data && error.request?.data["registration_number"]
          ? error.request.data["registration_number"]
          : "-"
        } failed!. Please try again.`;
      store.dispatch(addNotificationAction(body, "danger"));
      callback(error.response?.data || "Network Error");
    })
    .finally(() => {
      store.dispatch(setLoadedAction(key));
      _callback(null);
    });
  return key;
};

export const ApiNewBatchRequest = (
  data: any,
  store: any,
  config: any,
  callback: (error: string | null | undefined) => void = () => void null
) => {
  const key: string = requestKey();
  const _callback = callback;

  store.dispatch(setLoadingAction(key));

  api
    .post("fileUpload/", data, config)
    .then((response) => {
      const body = "Your batch request has been been submitted successfully.";
      // Success -> Color Success.
      // alert(body);
      //console.log('Submitted Successfully!!')
      store.dispatch(addNotificationAction(body, "success"));
      store.dispatch(setRequestsAction([response.data]));
      setRequestsAction([response.data]);

      const state = store.getState();

      store.dispatch(
        setStatsAction({
          ...state.global?.stats,
          new: state.global?.stats.new + 1,
          recent: [response.data],
        })
      );

    })
    .catch((error: AxiosError) => {
      const body = `The uploaded file request. ${error.request?.data && error.request?.data["myfile"]
          ? error.request.data["myfile"]
          : "-"
        } failed!. Please try again.`;
      // Failed -> Color danger!
      console.log(body);
      store.dispatch(addNotificationAction(body, "danger"));
      callback(error.response?.data || "Network Error");
    })
    .finally(() => {
      setLoadedAction(key);
      _callback(null);
    });
  return key;
};

export const apiGetProfile = (store: any, callback: (data: any) => void) => {
  const key: string = requestKey();

  store.dispatch(setLoadingAction(key));
  api
    .get("/auth/profile/")
    .then((data) => {
      store.dispatch(setProfile(data.data));
      callback(data);
    })
    .finally(() => {
      store.dispatch(setLoadedAction(key));
    });

  return key;
};

export const apiUpdateProfile = (data: object, callback: any) => {
  const key: string = requestKey();
  api.put("/auth/profile/", data).finally(() => callback());
  return key;
};

export const ReportData =async (info: any) => {
  return new Promise(async function(resolve, reject) {
    try {

      return resolve("resp");
    }
    catch (err) {
         return reject(err)
    }
  }) 
}

export const ApiGetCountries = async (store: any, callback: (data: any) => void) => {
  return new Promise(async function(resolve, reject) {
    await api.get("/countries")
    .then(response => {
      store.dispatch(setCountries(response.data))
      callback(response.data)
      resolve(response)
    })
    .catch(err => reject(err))
  })
}

export const ApiGetCompanies = async (store: any, callback: (data: any) => void) => {
  return new Promise(async function(resolve, reject) {
    await api.get("/companies")
    .then(response => {
      store.dispatch(setCompanies(response.data))
      callback(response.data)
      resolve(response.data)
    })
    .catch(err => reject(err))
  })
}

export const ApiGetIndustries = async (store: any, callback: (data: any) => void) => {
  return new Promise(async function(resolve, reject) {
    await api.get("/industries")
    .then(response => {
      store.dispatch(setIndustries(response.data))
      callback(response.data)
      resolve(response.data)
    })
    .catch(err => reject(err))
  })
}

// export const getHelpItems = async (store: any, callback: (data: any) => void) => {
//   return new Promise(async function(resolve, reject) {
//     await api.get("/help-items")
//       .then(response => {
//         console.log(response)
//         callback(response.data)
//         resolve(response.data)
//       })
//       .catch(err => reject(err))
//   })
// }

export const ApiGetHelpItems = (
  store: any,
  location: any,
  page?: any,
  callback: (error: string | null | undefined) => void = () => void null,
) => {
  const key = requestKey();
  store.dispatch(setLoadingAction(key));

  const q = getQueryString("q", location);
  const status = getQueryString("status", location);

  const url = "/help-items/";

  api
    .get(url, { params: { page: page <= 0 ? 1 : page, q, status } })
    .then((data) => {
      store.dispatch(setRequestsAction(data.data));
    })
    .catch((error) => {
      callback(error.response?.data || "Network Error");
    })
    .finally(() => {
      store.dispatch(setLoadedAction(key));
      callback(null);
    });
  return key;
};