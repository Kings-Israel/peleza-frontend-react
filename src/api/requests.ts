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

const baseURL = process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:8000/api/` : '/api/'
export const apiGetRequests = (
  store: any,
  location: any,
  page?: any,
  status?: string,
  callback: (error: string | null | undefined) => void = () => void null,
  recents: boolean = false
) => {
  const key = requestKey();
  store.dispatch(setLoadingAction(key));

  const q = recents === true ? "recents" : getQueryString("q", location);
  const url = "/requests/";

  api
    .get(url, { params: { page: page <= 0 ? 1 : page, q, status } })
    .then((response) => {
      store.dispatch(setRequestsAction(response.data));
     
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


export const apiGetStats = (dispatch: any, final: () => void) => {
  const key = requestKey();
  dispatch(setLoadingAction(key));

  api
    .get("/stats/")
    .then((response) => {
      //console.log(" === Response Data for stats  == ",response.data)
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
      console.log(data.data)
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

  export const apiSummary =(kyc_type:any,from_date:any,to_date:any,status:any) => {
    return new Promise(async function(resolve, reject) {
      try {
        let resp = await api.get("/list/?module_code="+kyc_type + "&date_from="+from_date+"&date_to="+to_date+"&status="+status);
        
        return resolve(resp);
      }
      catch (err) {
           return reject(err)
      }
    })  
  }

  export const apiReq = (status: any) => {
    return new Promise(async function(resolve, reject) {
      try {
        let resp = await api.get("req/");
        const transformedData = transformData(resp.data);
        
        resolve(transformedData); 
      } catch (err) {
        return reject(err);
      }
    });
  };
  
  function transformData(data: any[]) {
    return data.map((item, index) => ({
      id: index,
      request_id: item[2],
      search_id: item[0],
      client_number: item[50],
      company_name: item[28],
      email_address: item[5],
      registration_number: item[49],
      request_plan: item[1],
      request_date: item[40],
      module_code: item[1],
      package_id: item[52],
      request_ref_number: item[3],
      country: item[8],
    }));
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




