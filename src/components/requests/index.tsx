import { filterObjectArray, getQueryString, sortBy } from "utils/functions";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Component } from "react";
import { store } from "store";
import { withRouter } from "react-router";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { RouteComponentProps } from "react-router-dom";
import { apiGetRequests ,
   apiGetSummary, apiReq,
  apiSummary ,apiSummaryDownload } from "api/requests";
import { Request, RequestData } from "store/reducers/requests";
import { throttle } from "lodash";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Button } from "@material-ui/core";
import { CSVLink } from "react-csv";
import moment from "moment";
import Select from 'react-select';
import DTable from '../home/datatable'
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import custom from '../home/customdata'
import Loader from "react-loader-spinner";
import {
  // DatePicker,
  // TimePicker,
  // DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// Print CSV
const createCsvFileName = () => `report_${moment().format()}.csv`;
// const business = report.business;

const headers = [
    { label: 'Company Name', key: "companyName" },
    { label: 'Registration Number', key: "registrationNumber" },
    { label: 'Registration Date', key: "registrationDate" },
    { label: 'Report Date', key: "reportDate" },
    { label: 'Nominal Share Capital', key: "shareCapital" },
    { label: 'Number and Type of Shares', key: "typeofShares" },
    { label: 'Registered Office', key: "registeredOffice" },
    { label: 'Postal Address', key: "postalAddress" },
    { label: 'Encumbrances', key: "encumbrances" },
    { label: 'Name', key: "name" },
    // { label: 'Status', key: "status" },
    { label: 'Address', key: "address" },
    { label: 'Nationality', key: "nationality" },
    { label: 'Shares', key: "shares" },
    { label: 'KRA PIN', key: "kraPin" },
    { label: 'ID Number', key: "idNumber" },
    { label: 'Email', key: "email" },
    { label: 'Mobile Number', key: "mobile" },
    { label: 'Incorporation Number', key: "incorporationNumber" },
    { label: 'Request Plan', key: "requestPlan" },
    { label: 'Parent Name', key: "parentName" },
    { label: 'Company Email', key: "companyEmail" },
];


  const kyc_types: { label: string; value: string; Package_id: number; module_id: number; }[]  =[ {
  label: "COMPANY SEARCH",
  value: "co",
  Package_id: 52,
  module_id: 88
},
{
  label: "BUSINESS SEARCH",
  value: "bn",
  Package_id: 52,
  module_id: 93
},
{
  label: "COMMUNITY BASED ORGANISATION",
  value: "cbo",
  Package_id: 52,
  module_id: 92
},
{
  label: "COMPANY LIMITED BY GUARANTEE",
  value: "clg",
  Package_id: 52,
  module_id: 95
},
{
  label: "COOPERATIVE SACCOS",
  value: "sacco",
  Package_id: 52,
  module_id: 89
},
{
  label: "NGO SEARCH",
  value: "ngo",
  Package_id: 52,
  module_id: 97
},
{
  label: "SOCIETIES SEARCH",
  value: "societies",
  Package_id: 52,
  module_id: 90
},
{
  label: "TRUSTS SEARCH",
  value: "tr",
  Package_id: 52,
  module_id: 94
},
{
  label: "LIMITED LIABILITY PARTNERSHIPS",
  value: "llp",
  Package_id: 52,
  module_id: 91
},
]

const status=[ 
  {
   label: "New",
    value: "new",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Complete",
    value: "completed",
  },
  {
    label: "Interim",
    value: "interim",
  },
  {
    label: "Ivalid",
    value: "invalid",
  },
]
interface DataItem {
  id: number;
  pk: number;
  request_id: string | null;
  search_id: number;
  client_number: string;
  company_name: string;
  email_address: string | null;
  registration_number: string;
  request_plan: string;
  request_date: string;
  module_code: string;
  package_id: number;
  request_ref_number: string;
  country: string;
}

interface _RequestsState {
  key: string | null;
  filter: string;
  status_selected: string;
  FromselectedDate: Date;
  ToselectedDate: Date;
  columns: string[];
  rows: any[];
  showAllRequests: boolean; // Add showAllRequests property to state interface
  loading: boolean;
  
}

class _Requests extends Component<RouteComponentProps, _RequestsState> {
  state: _RequestsState = {
    key: "",
    filter: "", // Set filter to an empty string
    status_selected: "",
    FromselectedDate: new Date(),
    ToselectedDate: new Date(),
    columns: [],
    rows: [],
    loading: true,
    showAllRequests: false, // Add this line
  
  };
  constructor(props: any) {
    super(props);
    this.getRequestData = this.getRequestData.bind(this);
    this.setState = this.setState.bind(this);
    this.setPage = this.setPage.bind(this);
    this.dateFormater = this.dateFormater.bind(this); // Add this line
  }

  dateFormater = (d: any) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    let fd = `${ye}-${mo}-${da}`;
    return fd;
  };

  // SEARCH
  search = throttle(
    (keyword: string) => {
      if (String(keyword).length < 4) return;
     // this.getRequestData("search", keyword);
    },
    3000,
    { trailing: true }
  );

  

  get requestData(): any {
    //console.log(this.request.data)
    return this.request.data;
  }
  
  get request(): Request {
    //console.log(store.getState().requests)
    return store.getState().requests;
  }

  getRequestData(page?: string | number, keyword?: string, status?: string) {
    if (this.state.key) return;
    const updateRequest = (data: any) => {
      this.setState({ ...this.state, key: null});
    };
  
    // Fetch requests based on showAllRequests flag
    const key = this.state.showAllRequests
      ? apiGetRequests(store, this.props.location, 1, status, updateRequest)
      : page === "next" && this.request.next
      ? apiGetRequests(store, this.props.location, this.page + 1, status, updateRequest)
      : page === "prev" && this.request.prev
      ? apiGetRequests(store, this.props.location, this.page - 1, status, updateRequest)
      : apiGetRequests(store, this.props.location, 1, status, updateRequest);
  
    if (key) this.setState({ ...this.state, key });
  }
  
  toggleShowAllRequests = () => {
    this.setState((prevState) => ({
      showAllRequests: !prevState.showAllRequests,
    }), () => {
      this.getRequestData(); // Call getRequestData after updating showAllRequests state
    });
  };
  
  
  
  setPage = this.getRequestData;
  

  get page() {
   
    return this.request.page ? this.request.page : 1;
  }

  unlisten: any = undefined;
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (
        location.pathname.startsWith("/requests") &&
        this.q !== getQueryString("q", location)
      ) {
       // this.getRequestData();
      }
    });
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");

    if (status) {
      this.setState({
        status_selected: status
      });
    } else {
      this.setState({
        status_selected: ""
      });
    } 
    

    this.getRequestData();
    
  }
  componentWillUnmount() {
    this.unlisten();
  }

  


  get loading() {
    return this.state.key ? true : false;
  }

  get q() {
    return getQueryString("q", this.props.location);
  }

  render() {
    // Dynamic data.
    let data: RequestData[] = Object.values(this.requestData);
    //console.log(this.requestData)
    //const { columns, rows } = this.state;
  
 
    return (
      <div className="container-fluid">
       
        <DataTable
         data={data} 
         title={`${this.q === "all" ? "ALL" : "MY"} REPORTS`}
         page={this.page}
         setPage={this.setPage}
         next={this.request.next}
         search={this.search}
         className="small"
         
         />  
      </div>
    );
  }
}
export const Requests = withRouter(_Requests);

class DataTable extends Component<{
  data: any;
  title: string;
  page: number;
  next: null | string;
  setPage: (e: any) => void;
  search?: (resultlength: string) => any;
  className?: string;
}> {
  state = {  loading:false,sortField: { field: "", sorting: "" }, filter: "", tempData:[] , selected_type:"",FromselectedDate:new Date(),ToselectedDate:new Date(),kyc_selected:null,rows:[],columns:[],status_selected:null, showTable: true,};
 
  constructor(props: any) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.setSortField = this.setSortField.bind(this);
  }
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");
    
    if (status) {
      this.setState({
        status_selected: status
      });
    } else {
      this.setState({
        status_selected: ""
      });
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false; 
  }
  

  get requestData() {
    const { data, search } = this.props;
    const { filter, sortField } = this.state;
  
    let allRequests = sortBy(data, sortField.field, sortField.sorting);
  
    if (filter && filter.length) {
      allRequests = filterObjectArray(data, filter);
      if (search) search(filter);
    }
   
    return allRequests;
  }
  

  setSortField(field: string) {
    let _already_set = this.state.sortField["field"] === "field" ? true : false;

    let sorting =
      _already_set && this.state.sortField["sorting"] === "asc"
        ? "desc"
        : this.state.sortField["sorting"] === "asc"
          ? "desc"
          : "asc";
    this.setState({ sortField: { field, sorting } });
  }
  get sortWith(): object {
    return this.state.sortField;
  }
  setFilter(filter: string) {
    this.setState({ ...this.state, filter });
  }

  handleToKyc = (kyc: any) => {
    this.setState({
      kyc_selected:kyc.value
    });
 
    this.setFilter(kyc.value)
   
   };

   statusChange = (status: any) => {
    if (status && status.value) {
      this.setState({
        status_selected: status.value,
      });
    } else {
      this.setState({
        status_selected: "", // Set to an empty string or any default value you prefer
      });
    }
  };
  

   processKycRespData = async (kyc_type: any,data: []) => {
     let dt: {}[]=[];
      dt= data.map(function(num) {
 
                return {
                  id:num[0] ,
                  request_id:num[2] ,
                  search_id:num[0] ,
                  client_number:num[50] ,
                  company_name:num[28] ,
                  email_address:num[5] ,
                  registration_number:num[49] ,
                  request_plan:num[1] ,
                  request_date:num[40] ,
                  module_code:num[1] ,
                  package_id:num[52] ,
                  url:num[3] || kyc_type,
                  request_ref_number:num[3] ,
                  country:num[8] ,
                    
                }
       })
     
    
     return dt;
   }

   dateFormater= (d:any) => {
    //let d = new Date(2010, 7, 5);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let fd=`${ye}-${mo}-${da}`
    //console.log(fd);
    return fd;
   }

   handleDownload= async () => {
    const resp: unknown = await apiSummaryDownload(
      this.state.filter,
      this.dateFormater(this.state.FromselectedDate),
      this.dateFormater(this.state.ToselectedDate),
      this.state.status_selected
      );
    console.log(resp)
   }
   handleClick = async () => {
    this.setState({
      loading: true
    });
  
    const currentDate = new Date(); // Get current date
    const fromDate = this.dateFormater(this.state.FromselectedDate);
    const toDate = this.dateFormater(currentDate); // Use current date as the "to_date"
  
    try {
      const resp = await apiSummary(
        this.state.filter,
        fromDate,
        toDate,
        this.state.status_selected
      );
  
      const rows = await this.processKycRespData(
        this.state.filter,
        (resp as { data: [] }).data
      );
  
      this.setState({
        rows: rows,
        columns: custom.table_column_header,
        loading: false
      });
    } catch (error) {
      // Handle error
      console.error(error);
      this.setState({
        loading: false
      });
    }
  };
  
  



  render() {
   // value=status.find(option => option.value === this.state.status_selected)

    // console.log(this.requestData)
     const { status_selected } = this.state;
     const queryParams = new URLSearchParams(window.location.search);
     const q = queryParams.get('q');
    
     // Filter the requests based on the selected status
   
    let csvdata: RequestData[] = Object.values(this.requestData);
    // const business = report.business;
   // console.log("csv date",csvdata);

   const filteredData = csvdata.filter((row) => {
    
    if (status_selected === "complete" && row.status === "11") {
      return true;
    } else if (status_selected === "in_progress" && row.status === "33") {
      return true;
    } else if (status_selected === "new" && row.status === "00") {
      return true;
    }
    
    return false;
  });
  
   console.log(filteredData)
   const data= csvdata.map(item => 
      
      ({    
        companyName: item.dataset_name,	
        registrationNumber: item.registration_number,
        registrationDate: item.request_date,
        reportDate: item.request_date,	
        shareCapital: '',	
        typeofShares: ''	,
        registeredOffice: '',
        postalAddress: '',
        encumbrances: '',
        name: item.client_name,
        // status: item.status,
        address: '',
        nationality: item.dataset_citizenship, 
        shares: '',
        kraPin: item.dataset_kra_pin,
        idNumber:item.bg_dataset_idnumber,
        email: item.bg_dataset_email,
        mobile: item.bg_dataset_mobile,
        names:item.bg_dataset_name,
        incorporationNumber:item.dataset_incorporation_no,
        requestPlan:item.request_plan,
        parentName:item.parent_name,
        companyEmail:item.dataset_ibg_dataset_email_no

      
    }));
  
    //const [selectedDate, handleDateChange] = useState(new Date());
     
    const handleDateChange =(dt:any) =>{
      this.setState({
        ToselectedDate: dt.toDate()
      });
    };
    const handleFromDateChange =(dt:any) =>{
      this.setState({
        FromselectedDate: dt.toDate()
      });
    };
    

    if(this.state.loading){
      return ( 
        <div className="scontainer" >
             <div className="schild">
                <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />  
              </div> 
        </div>
        );

       
    } else if (status_selected) {
      return (
        <div className="bg-white shadow my-4 py-3 px-3 text-muted">
          <p className="font-weight-bold pt-3">
            <BarChartIcon />
            {this.props.title}
           
          </p>
  
          <div></div>
    
          <div className="row">  
          <div className="col-md-4">
          <label >Selected Kyc :  {this.state.filter} </label>
          <Select
            options={kyc_types}
            onChange={this.handleToKyc}
            value={kyc_types.find(option => option.value === this.state.filter)}
          />
  
            </div>
            <div className='col-md-4'>
         
         <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="From"
              format="MM-DD-yyyy"
              value={this.state.FromselectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={handleFromDateChange}
             
           />
           <br/>
           <br/>
          <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="To"
              format="MM-DD-yyyy"
              value={this.state.ToselectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={handleDateChange}
              
          />
        </MuiPickersUtilsProvider>
      
            </div>
            <div className='col-md-4'>
            
  
      
            </div>
      
            </div>
            <div className="row"> 
            <div className="col-md-4">
              <label >Selected Status : {this.state.status_selected} </label>
                <Select 
                options={status} 
                value={status.find(option => option.value === this.state.status_selected)}
                onChange={this.statusChange}
                />
              </div> 
              <div className='col-md-4'>
              <br/>
              <Button onClick={() => this.handleDownload()} variant="contained" color="secondary" >
                    Download
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-1">
  
            {/* View CSV */}
            <div style={{ paddingRight: "10px" }}>
              
              <CSVLink
                data={data}
                headers={headers}
                filename={createCsvFileName()}
                target="_blank"
                style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
              >
                {/* <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                  CSV (Export by Kyc Search type)
                </Button> */}
              </CSVLink>
              {/* <CSVLink {...csvReport}>
                <Button variant="outlined" color="primary">
                  Export Csv
                </Button></CSVLink> */}
              {/* </CSVLink> */}
            </div>
  
          </div>
          <div>
           
         
        </div>
          <div className="bg-white shadow my-4 py-3 px-3 text-muted">
           <table className={`table table-striped data-table ${this.props.className}`}>
   
             <thead>
                <tr>
                  <th>Client Number</th>
                  <th>Plan</th>
                  <th>Company Name</th>
                  <th>Request Date</th>
                  <th>Country</th>
                </tr>
             </thead>
             <tbody>
               {filteredData.map((row, index) => (
                   <tr key={index}>
                     <td>{row.client_number}</td>
                     <td>{row.request_plan}</td>
                     <td>{row.dataset_name}</td>
                     <td>{row.request_date}</td>
                     <td>{row.dataset_citizenship}</td>
                   </tr>
                 ))}
             </tbody>
            </table>
          </div>
          </div>
        );

      } else if (q === 'mine' || q === 'all') {
    return (
      <div className="bg-white shadow my-4 py-3 px-3 text-muted">
        <p className="font-weight-bold pt-3">
          <BarChartIcon />
          {this.props.title}
         
        </p>

        <div></div>
  
        <div className="row">  
        <div className="col-md-4">
        <label >Selected Kyc :  {this.state.filter} </label>
        <Select
          options={kyc_types}
          onChange={this.handleToKyc}
          value={kyc_types.find(option => option.value === this.state.filter)}
        />

          </div>
          <div className='col-md-4'>
       
       <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="From"
            format="MM-DD-yyyy"
            value={this.state.FromselectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={handleFromDateChange}
           
         />
         <br/>
         <br/>
        <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="To"
            format="MM-DD-yyyy"
            value={this.state.ToselectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={handleDateChange}
            
        />
      </MuiPickersUtilsProvider>
    
          </div>
          <div className='col-md-4'>
          <Button onClick={() => this.handleClick()} variant="contained" color="primary" >
                Search
          </Button>

    
          </div>
    
          </div>
          <div className="row"> 
          <div className="col-md-4">
            <label >Selected Status : {this.state.status_selected} </label>
              <Select 
              options={status} 
              value={status.find(option => option.value === this.state.status_selected)}
              onChange={this.statusChange}
              />
            </div> 
            <div className='col-md-4'>
            <br/>
            <Button onClick={() => this.handleDownload()} variant="contained" color="secondary" >
                  Download
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-1">

          {/* View CSV */}
          <div style={{ paddingRight: "10px" }}>
            
            <CSVLink
              data={data}
              headers={headers}
              filename={createCsvFileName()}
              target="_blank"
              style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
            >
              {/* <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                CSV (Export by Kyc Search type)
              </Button> */}
            </CSVLink>
            {/* <CSVLink {...csvReport}>
              <Button variant="outlined" color="primary">
                Export Csv
              </Button></CSVLink> */}
            {/* </CSVLink> */}
          </div>

        </div>
        <div>
         
        <DTable rows={this.state.rows} columns={this.state.columns} ></DTable>
        </div>
       
      </div>
    );
    }

  }
}


export class Pagination extends Component<{
  setPage: (e: any) => void;
  page: number;
  next: null | string;
  disable?: boolean;
}> {
  get styles() {
    return {
      button: {
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        display: "flex",
        alignItems: "center",
        fontWeight: 300,
        // letterSpacing: "-.8px",
      },
    };
  }
  render() {
    return (
      <div className=" py-3 d-flex justify-content-center w-100">
        <div className="btn-group">
          <button
            className="btn btn-sm border-dark"
            style={this.styles.button}
            value="prev"
            onClick={() => this.props.setPage("prev")}
            disabled={this.props.page <= 1 ? true : false}
          >
            <ChevronLeft />
          </button>
          <button
            className="btn btn-sm text-dark mono"
            style={this.styles.button}
          >
            Page {this.props.page ? this.props.page : 1}
          </button>
          <button
            className="btn btn-sm border-dark"
            style={this.styles.button}
            onClick={() => this.props.setPage("next")}
            value="next"
            disabled={this.props.next ? false : true}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    );
  }
}
