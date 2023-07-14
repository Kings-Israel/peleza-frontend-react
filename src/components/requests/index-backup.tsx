import { filterObjectArray, getQueryString, sortBy } from "utils/functions";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Component } from "react";
import { store } from "store";
import { withRouter } from "react-router";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { RouteComponentProps } from "react-router-dom";
import { apiGetRequests ,apiGetSummary,apiSummary } from "api/requests";
import { Request, RequestData } from "store/reducers/requests";
import { throttle } from "lodash";
import { HeadFooterRow, Row } from "components/home/abstract";
import { Button } from "@material-ui/core";
import { CSVLink } from "react-csv";
import moment from "moment";
import Select from 'react-select';
import DTable from '../home/datatable'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import custom from '../home/customdata'
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
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

const kyc_types=[ {
  label: "COMPANY SEARCH",
  value: "company",
  Package_id: 52,
  module_id: 88
},
{
  label: "BUSINESS SEARCH",
  value: "business",
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
  value: "trusts",
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

class _Requests extends Component<RouteComponentProps> {
  state = { key: "" };
  constructor(props: any) {
    super(props);
    this.getRequestData = this.getRequestData.bind(this);
    this.setState = this.setState.bind(this);
    this.setPage = this.setPage.bind(this);
    this.search = this.search.bind(this);
  }

  // SEARCH
  search = throttle(
    (keyword: string) => {
      if (String(keyword).length < 4) return;
      this.getRequestData("search", keyword);
    },
    3000,
    { trailing: true }
  );

  get requestData(): any {
    return this.request.data;
  }
  get request(): Request {
    return store.getState().requests;
  }

   getRequestData(page?: string | number, keyword?: string, status?: string) {
    if (this.state.key) return;
    const updateRequest = (data: any) => {
      this.setState({ ...this.state, key: null, error: data });
      
    };
    
    const key =
      page === "next" && this.request.next
        ? apiGetRequests(store, this.props.location, this.page + 1, status, updateRequest)
        
        : page === "prev" && this.request.prev
        ? apiGetRequests(store, this.props.location, this.page - 1, status, updateRequest)
        : apiGetRequests(store, this.props.location, 1, status, updateRequest);
  
    if (key) this.setState({ ...this.state, key });
   
  }
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
        this.getRequestData();
      }
    });
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

    return (
      <div className="container-fluid">
        {this.loading && (
          <span className="spinner-border float-right m-4 spinner-sm text-info"></span>
        )}
        {/* <DataTable
          className="small"
          data={data}
          title={`${this.q === "all" ? "ALL" : "MY"} REPORTS`}
          page={this.page}
          setPage={this.setPage}
          next={this.request.next}
          search={this.search}
        /> */}
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
  state = { sortField: { field: "", sorting: "" }, filter: "", tempData:[] , selected_type:"",FromselectedDate:new Date(),ToselectedDate:new Date(),kyc_selected:"",rows:[],columns:[]};
 
  constructor(props: any) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.setSortField = this.setSortField.bind(this);
  }

  get requestData() {
    const filter: string = this.state.filter;
 
    let _recentReports: any = sortBy(
      this.props.data,
      this.state.sortField["field"],
      this.state.sortField["sorting"]
    );

    _recentReports =
      filter && filter.length
        ? filterObjectArray(this.props.data, filter)
        : _recentReports;

    if (filter && this.props.search) this.props.search(filter);

    return _recentReports;
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

   processKycRespData = async (kyc_type: any,data: []) => {
     let dt: {}[]=[];
    if(kyc_type && kyc_type=='ngo') {
      dt= data.map(function(num) {
 
                return {
                  id:num[51] ,
                  request_id:num[51] ,
                  company_reg_id:num[0],
                  company_name:num[1] ,
                  email_address:num[2] ,
                  status:num[3] ,
                  registration_number:num[4] ,
                  mobile_number:num[5] ,
                  added_by:num[6] ,
                  verified_by:num[7] ,
                  user_id:num[8] ,
                  search_id:num[9] ,
                  registration_date:num[10] ,
                  country:num[11] ,
                  shafile:num[12] ,
                  data_source:num[13] ,
                  data_notes:num[14] ,
                  match_status:num[15] ,
                  address:num[16] ,
                  offices:num[17] ,
                  operation_status:num[18] ,
                  industry:num[19] ,
                  data_id:num[20] ,
                  date_added:num[21] ,
                  module_name:num[22] ,
                  verified_date:num[23] ,
                  review_status:num[24] ,
                  review_notes:num[25] ,
                  business_type:num[26] ,
                  nature_of_business:num[27] ,
                  kra_pin:num[28] ,
                  postal_address:num[29] ,
                  member_count:num[30] ,
                  objective:num[31] ,
                  verified:num[32] ,
                  request_ref_number:num[35] ,
                  bg_dataset_name:num[34] ,

                  request_plan:num[36] ,
                  dataset_citizenship:num[37] ,
                  bg_dataset_email:num[38] ,
                  bg_dataset_mobile:num[39] ,
                  client_number:num[40] ,
                  company_type:num[41] ,
                  dataset_incorporation_no:num[42] ,
                  dataset_kra_pin:num[43] ,
                  request_type:num[44] ,
                  dataset_name:num[45] , //'company'
                  request_package:num[46] ,
           
                  number_of_shares:num[48] ,
                  nominal_value:num[49] ,
                  name:num[50] ,
                  business_id:num[51] ,
                  module_code:num[52] ,
                  client_id:num[53] ,
                  client_login_id:num[54] ,
                  client_name:num[55] ,
                  request_date:num[56] ,
                  package_id:num[61],
                  url:kyc_type
                }
       })
     } 
    
     return dt;
   }

   handleClick= async () => {
     let columns=[]; 
     const resp: unknown = await apiSummary(this.state.filter,this.state.FromselectedDate,this.state.ToselectedDate,"");
     let rows=await this.processKycRespData(this.state.filter,(resp as {data: []; b: string; }).data);
  

  }



  render() {
    // console.log(this.requestData)
    let csvdata: RequestData[] = Object.values(this.requestData);
    // const business = report.business;
   // console.log("csv date",csvdata);

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

      
    }))

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


  
    return (
      <div className="bg-white shadow my-4 py-3 px-3 text-muted">
        <p className="font-weight-bold pt-3">
          <BarChartIcon />
          {this.props.title}
          {this.state.filter}
        </p>

        <div></div>
        <div className="row">  
        <div className="col-md-4">
            <Select 
            options={kyc_types}  
            onChange={this.handleToKyc}
            />
          </div>
          <div className='col-md-4'>
       
       <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="From"
            format="MM/DD/yyyy"
            value={this.state.FromselectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={handleFromDateChange}
         />
        <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="To"
            format="MM/DD/yyyy"
            value={this.state.ToselectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    
          </div>
          <div className='col-md-4'>
          <Button onClick={() => this.handleClick()} variant="contained" color="primary" style={{ height: '60%' }}>
                Search
              </Button>
          </div>
          </div>
        <div className="d-flex justify-content-end mb-1">

          {/* View CSV */}
          <div style={{ paddingRight: "10px" }}>
            
            {/* <CSVLink
              data={data}
              headers={headers}
              filename={createCsvFileName()}
              target="_blank"
              style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
            >
              <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                CSV (Export by Kyc Search type)
              </Button>
            </CSVLink> */}
            {/* <CSVLink {...csvReport}>
              <Button variant="outlined" color="primary">
                Export Csv
              </Button></CSVLink> */}
            {/* </CSVLink> */}
          </div>

          {/* Or */}
          {/* <CSVDownload data={csvData} target="_blank" /> */}

          {/* <div style={{ paddingRight: "10px" }}>
            <Button variant="outlined" color="secondary">
              Download Pdf
            </Button>
          </div> */}
           {/* 
          <div>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              onChange={(e) => this.setFilter(e.target.value)}
            />
          </div>
          View CSV */}
        </div>
        <div>
        <DTable rows={this.state.rows} columns={this.state.columns} ></DTable>
        </div>
        <table
          className={`table table-striped data-table ${this.props.className}`}
        >
          <thead>
            <HeadFooterRow {...{ setSortField: this.setSortField }} />
          </thead>
          <tbody>
            {this.requestData && this.requestData.length ? (
              this.requestData.map((obj: any, index: number) => (
                <Row key={index} {...{ obj, index }} />
              ))
            ) : (
              <tr>
                <td align="center" colSpan={10}>
                  <h6 className="text-muted text center">
                    {this.state.filter
                      ? `Nothing containing "${this.state.filter}" Found`
                      : "Nothing here yet"}
                  </h6>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <HeadFooterRow />
          </tfoot>
        </table>
        <div className="pagination py-2">
          <Pagination
            setPage={this.props.setPage}
            page={this.props.page}
            next={this.props.next}
          />
        </div>
      </div>
    );
  }
}

class Pagination extends Component<{
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
