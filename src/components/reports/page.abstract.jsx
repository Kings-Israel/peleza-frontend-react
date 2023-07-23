import { createPDF, getDate } from "../../utils/functions";
import "../../assets/css/reports.css";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";
import PanoramaFishEye from "@material-ui/icons/RemoveRedEye";
import ReportLoading from "./report.loading";
import { apiGetReport } from "api/requests";
import { store } from "store";
import { Component } from "react";
import { withRouter } from "react-router";

class _Page extends Component {
  state = {
    loading: true,
    errored: false,
  };
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  downloadReport(e) {
    e.preventDefault();
    e.stopPropagation();
    createPDF(document.getElementById("page"), false);
  }
  previewReport(e) {
    e.preventDefault();
    e.stopPropagation();
    createPDF(document.getElementById("page"), true);
  }
  getReport() {
    apiGetReport(store)
      .catch(() => {
        this.setState({ errored: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.setState({ loading: true }, () => this.getReport());
    localStorage.setItem('preserve-filters', 'true');
  }
  goBack(e) {
    e.stopPropagation();
    this.props.history.go(-1);
  }

  render() {
    return (
      <div
        className="fixed-top  vh-100 p-2  hide-scroll"
        onClick={this.goBack}
        style={{
          overflow: "scroll",
          background: "rgba(0,0,0,.7)",
        }}
      >
        <button
          className="btn btn-danger position-fixed btn-sm text-light justify-content-center align-items-center"
          style={{
            right: "1rem",
            top: "1rem",
            fontSize: "30px",
            height: "34px",
            width: "34px",
            display: "flex",
          }}
        >
          &times;
        </button>
        {this.state.loading || this.state.errored ? (
          <ReportLoading errored={this.state.errored} />
        ) : (
          <div
            data-size="A4"
            onClick={(e) => e.stopPropagation()}
            className="page"
            id={"page"}
            style={
              {
                // padding: 0,
              }
            }
          >
            {this.props.children}
            <div
              className="position-fixed d-flex flex-column"
              style={{
                bottom: "20px",
                right: "20px",
              }}
            >
              <button
                className="btn btn-sm bg-danger text-light rounded-circle my-1"
                onClick={this.downloadReport}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <CloudDownloadOutlined style={{ width: "20px" }} />
              </button>
              <button
                className="btn btn-sm btn-danger text-light rounded-circle my-1"
                onClick={this.previewReport}
                style={{
                  width: "35px",
                  height: "35px",
                }}
              >
                <PanoramaFishEye style={{ width: "18px" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(_Page);

// function toHTML(data) {
//   return String(data)
//     .toString()
//     .replaceAll(" ", "&nbsp;")
//     .replaceAll(null, " ");
// }
export class Data extends Component {
  render() {
    return (
      <td {...this.props}>
        <span
          dangerouslySetInnerHTML={{
            __html: this.props.children ? this.props.children : "",
          }}
        />
      </td>
    );
  }
}

export class HData extends Component {
  render() {
    return (
      <th {...this.props}>
        <span
          dangerouslySetInnerHTML={{
            __html: this.props.children ? this.props.children : "",
          }}
        />
      </th>
    );
  }
}

export const InnerReportHeader = ({ report, term }) => {
  return (
    <table className="peleza-table inner-report text-uppercase">
      <tbody>
        <tr>
          <Data className="title">ORGANISATION</Data>
          <Data className="info">{report?.company_name}</Data>
          <Data className="title">Report Status</Data>
          <Data className="info">
            {report.status && (report.status === "11" || report.status === 11)
              ? "FINAL"
              : "IN PROGRESS"}
          </Data>
        </tr>
        <tr>
          <Data className="title">{`${term} NAME`}</Data>
          <Data className="info">{report.business?.business_name}</Data>
          <Data className="title">Report&nbsp;Dated</Data>
          <Data className="info">
            {report?.verified_date
              ? String(report?.verified_date).slice(0, -6)
              : getDate()}
          </Data>
        </tr>
        <tr>
          <Data className="title">Screening&nbsp;Package</Data>
          <Data className="info">{report.request_plan}</Data>
          <Data className="title">Reference NO.</Data>
          <Data className="info">{report.request_ref_number}</Data>
        </tr>
        <tr>
          <Data className="title">Requested&nbsp;By</Data>
          <Data className="info">{report?.client_name}</Data>
          <Data className="title">Email</Data>
          <Data className="info">{report?.user_name}</Data>
        </tr>
      </tbody>
    </table>
  );
};
