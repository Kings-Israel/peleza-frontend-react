import Disclaimer from "./disclaimer.abstract";
// import { connect } from "react-redux";
// import { store } from "store";
import api from "api/api";
import { getQueryString } from "utils/functions";
import { Component } from "react";

class _InvalidReport extends Component {
  state = {
    report: {},
    loading: true,
    errored: false
  }

  async getReport() {
    await api
      .get(
        `/request/${getQueryString("package_id")}/${getQueryString("request_ref")}/`
      )
      .then((data) => {
        this.setState({ report: data.data })
      });
  }

  componentDidMount() {
    this.setState({
      loading: true
    },
    () => {
      this.getReport()
    });    
  }

  render() {
    return (
      <>
        <div className="d-flex flex-column text-center mx-4">
          <h1>Invalid Record</h1>
          <h4>Our Comments: {this.state.report.comments}</h4>
          <p className="mt-3">*** The above information is per records held by the Registrar of Companies ***</p>
        </div>
        <div className="mx-4">
          <Disclaimer />
        </div>
      </>
    )
  }
}

export default _InvalidReport;
