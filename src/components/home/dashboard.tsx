import { filterObjectArrayField, sortBy } from "utils/functions";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Component } from "react";
import { apiGetStats } from "api/requests";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

import { State } from "store";
import { Row, HeadFooterRow } from "./abstract";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { HelpOutlineRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { store } from "store";
import { setRequestsDateFilter } from "store/actions/requests";
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';

const kyc_types = [
  {
    label: "ALL",
    value: "",
    Package_id: 0,
    module_id: 0,
  },
  {
    label: "COMPANY SEARCH",
    value: "co",
    Package_id: 52,
    module_id: 88,
  },
  {
    label: "BUSINESS SEARCH",
    value: "bn",
    Package_id: 52,
    module_id: 93,
  },
  {
    label: "COMMUNITY BASED ORGANISATION",
    value: "cbo",
    Package_id: 52,
    module_id: 92,
  },
  {
    label: "COMPANY LIMITED BY GUARANTEE",
    value: "clg",
    Package_id: 52,
    module_id: 95,
  },
  {
    label: "COOPERATIVE SACCOS",
    value: "sacco",
    Package_id: 52,
    module_id: 89,
  },
  {
    label: "NGO SEARCH",
    value: "ngo",
    Package_id: 52,
    module_id: 97,
  },
  {
    label: "SOCIETIES SEARCH",
    value: "soc",
    Package_id: 52,
    module_id: 90,
  },
  {
    label: "TRUSTS SEARCH",
    value: "tr",
    Package_id: 52,
    module_id: 94,
  },
  {
    label: "INTERNATIONAL COMPANY SEARCH",
    value: "ico",
    Package_id: 52,
    module_id: 96,
  },
  {
    label: "LIMITED LIABILITY PARTNERSHIPS",
    value: "llp",
    Package_id: 52,
    module_id: 91,
  },
];

const durations = [
  {
    label: "All",
    value: "all"
  },
  {
    label: "Today",
    value: "today",
  },
  {
    label: "This Month",
    value: "current_month",
  },
  {
    label: "Last Month",
    value: "prev_month",
  },
  {
    label: "Last 2 Months",
    value: "prev_2_months"
  },
  {
    label: "Last 4 Months",
    value: "prev_4_months"
  },
  {
    label: "Last 6 Months",
    value: "prev_6_months"
  },
  {
    label: "Last 8 Months",
    value: "prev_8_months"
  },
  {
    label: "Last 12 Months",
    value: "prev_12_months"
  }
]

class _Dashboard extends Component<{
  stats: any;
  dispatch: any;
}> {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true }, () =>
      apiGetStats(store, this.props.dispatch, () => {
        this.setState({ loading: false });
        localStorage.setItem('preserve-filters', 'false');
      })
    );
  }

  durationChange(e: any) {
    this.setState({ loading: true });
    store.dispatch(setRequestsDateFilter(e.value))
    apiGetStats(store, this.props.dispatch, () => {
      this.setState({ loading: false });
    })
  }
  
  render() {
    return (
      <>
        <div className="w-100">
          {this.state.loading && this.props.stats?.recent?.length <= 0 ? (
            <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center">
              <div className="spinner-border"></div>
            </div>
          ) : (
            <DataTable
              className="small"
              data={Object.values(this.props?.stats?.recent)}
              title={`RECENT REPORTS`}
              onDurationChange={this.durationChange.bind(this)}
            />
          )}
        </div>
      </>
    );
  }
}
export const Dashboard = connect((state: State) => ({
  stats: state.global.stats,
}))(_Dashboard);

class DataTable extends Component<{
  data: any;
  title: string;
  className?: string;
  onDurationChange: any;
}> {
  state = {
    sortField: { field: "request_date", sorting: "" },
    filter: "",
    duration: "",
    fromDate: new Date(),
    toDate: new Date(),
    currentPage: 1,
  };
  constructor(props: any) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.setSortField = this.setSortField.bind(this);
  }
  
  get recentReports() {
    const filter: string = this.state.filter;

    let _recentReports: any = sortBy(
      this.props.data,
      this.state.sortField["field"],
      this.state.sortField["sorting"]
    );

    _recentReports =
      filter && filter.length
        ? filterObjectArrayField(this.props.data, filter)
        : _recentReports;

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
    this.setFilter(kyc.value);
  };

  handleDurationChange = (duration: any) => {
    this.props.onDurationChange(duration)
  }

  handleFromDateChange = (date: any) => {
    this.setState({ fromDate: date });
  };

  handleToDateChange = (date: any) => {
    this.setState({ fromDate: date });
  };

  handlePageChange = (selectedPage: { selected: number }) => {
    this.setState({ currentPage: selectedPage.selected + 1 });
  };
  
  render() {
    const { currentPage } = this.state;
    const itemsPerPage = 10; // Adjust this value based on your requirement
    const totalItems = this.recentReports.length;
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    // Calculate the start and end indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the recentReports array based on the current page
    const paginatedReports = this.recentReports.slice(startIndex, endIndex);
    return (
      <div
        className={`bg-white shadow my-4 py-3 px-3 text-muted ${this.props.className}`}
      >
        <p className="font-weight-bold pt-3">
          <BarChartIcon />
          {this.props.title}
        </p>
        <div>
          <div className="d-flex justify-content-between">
            <div className="row mb-1 w-75">
              <div className="col-4">
              <label htmlFor="Search Type">Search</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search"
                  onChange={(e) => this.setFilter(e.target.value)}
                />
              </div>
              <div className="col-4" style={{ zIndex: 99 }}>
                <label htmlFor="Search Type">Search Type</label>
                <Select
                  options={kyc_types}
                  onChange={this.handleToKyc}
                  value={kyc_types.find(
                    (option) => option.value === this.state.filter
                  )}
                  placeholder="Select Type..."
                />
              </div>
              <div className="col-4" style={{ zIndex: 99 }}>
              <label htmlFor="Search Type">Search In Duration</label>
                <Select
                  options={durations}
                  onChange={this.handleDurationChange}
                  value={durations.find(
                    (option) => option.value === this.state.duration
                  )}
                  placeholder="Select Duration..."
                />
              </div>
            </div>
            <Link to={'/help'}>
              <HelpOutlineRounded style={{ fontSize: '24px' }} />
            </Link>
          </div>
          <div className="table-responsive table-body">
            <table className="table table-striped data-table">
              <thead>
                <HeadFooterRow {...{ setSortField: this.setSortField }} />
              </thead>
              <tbody>
                {paginatedReports.length ? (
                  paginatedReports.map((obj: any, index: number) => (
                    <Row key={index} obj={obj} index={index} />
                  ))
                ) : this.recentReports && this.recentReports.length ? (
                  this.recentReports.map((obj: any, index: number) => (
                    <Row key={index} obj={obj} index={index} />
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
            <div className="pagination-container">
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={1} // Set the page range to 1 to display only the current page
                marginPagesDisplayed={1} // Adjust this value based on your requirement
                onPageChange={this.handlePageChange}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                previousLabel={<span>&#8592;</span>} // Custom arrow for previous page
                nextLabel={<span>&#8594;</span>} // Custom arrow for next page
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
