import { setLoadedAction, setLoadingAction } from "store/actions/api";
import {
  setReportAction,
  setRequestsAction,
  setStatsAction,
} from "store/actions/requests";
import { getQueryString, requestKey } from "utils/functions";
import { 
  // clearToken, 
  getToken } from 'utils/auth.token';
import api from "./api";

const baseURL = process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:8000/peleza-backend-server/api/` : '/api/'
export const apiGetRequests = (
  store: any,
  location: any,
  page?: any,
  callback: (error: string | null | undefined) => void = () => void null,
  recents: boolean = false
) => {
  const key = requestKey();
  store.dispatch(setLoadingAction(key));

  const _qs = getQueryString("q", location);
  const status = getQueryString("status", location);

  const url = "/requests/";
  const q = recents === true ? "recents" : _qs;

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

export const apiGetStats = (store:any, dispatch: any, final: () => void) => {
  const key = requestKey();
  dispatch(setLoadingAction(key));
  const duration_filter = store.getState().global.requests_duration_filter

  api
    .get("/stats/?duration=" + duration_filter)
    .then((response) => {
      dispatch(setStatsAction(response.data));
    })
    .finally(() => {
      final();
      setLoadedAction(key);
    });

  return key;
};

export const apiGetReport = (store: any) =>
  api
    .get(
      `/request/${getQueryString("package_id")}/${getQueryString(
        "request_ref"
      )}/`
    )
    .then((data) => {
      store.dispatch(setReportAction(data.data));
  });

  export const apiGetSummary= async (
    kyc_type:any,
    from_date:any,
    to_date:any,
    callback:any
  ) => {
    try {
     
     // api/test2/?module_code=NGO&date_from=2021-06-17&date_to=2021-12-22&request_id=2924
      let resp = await api.get("/test2/?module_code="+kyc_type + "&date_from=2021-06-17&date_to=2021-12-22&request_id=2924");
      callback(null,resp);
    }
    catch (err){
      callback(err,null)
    }
  }

  export const apiSummary =(q:any,kyc_type:any,from_date:any,to_date:any,status:any) => {
    return new Promise(async function(resolve, reject) {
      try {
        let resp = await api.get("/list/?q="+q+"&module_code="+kyc_type + "&date_from="+from_date+"&date_to="+to_date+"&status="+status);
        return resolve(resp);
      }
      catch (err) {
           return reject(err)
      }
    })  
  }

  export const apiSummaryDownload =(kyc_type:any,from_date:any,to_date:any,status:any) => {
    return new Promise(async function(resolve, reject) {
      try {
        fetch(baseURL+"test_download/?module_code="+kyc_type + "&date_from="+from_date+"&date_to="+to_date+"&status="+status, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/xlsx',
            'Authorization':'Bearer ' + getToken(),
          },
        })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([blob]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `download.xlsx`,
          );
      
          // Append to html link element page
          document.body.appendChild(link);
      
          // Start download
          link.click();
      
          // Clean up and remove the link
          //link.parentNode.removeChild(link);
        });
        return resolve({})
      }
      catch (err) {
        return reject(err)
      }
    })  
  }




