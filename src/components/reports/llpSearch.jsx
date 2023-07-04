import { connect } from "react-redux";
import { onlyUnique } from "utils/functions";
import Disclaimer from "./disclaimer.abstract";
import ReportHeader from "./header.abstract";
import Page, { Data, HData, InnerReportHeader } from "./page.abstract";

const _LLPSearchReport = ({ report }) => {
  const business = report?.business;
  return (
    <Page>
      <ReportHeader />
      <div className="inner-page">
        <InnerReportHeader report={report} term={"LLP"} />
        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>
                LIMITED LIABILITY PARTNERSHIPS REGISTRATION DETAILS
              </HData>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Data className="shade">Business&nbsp;Name</Data>
              <Data>
                {business?.business_name ? business.business_name : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Business Registration Number</Data>
              <Data>
                {business?.registration_number
                  ? business?.registration_number
                  : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Date of Registration</Data>
              <Data>
                {business?.registration_date
                  ? business?.registration_date
                  : "-"}
              </Data>
            </tr>

            <tr>
              <Data className="shade">KRA PIN</Data>
              <Data>{business?.kra_pin ? business.kra_pin : "-"}</Data>
            </tr>
          </tbody>
        </table>
        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>REGISTERED OFFICE ADDRESSES</HData>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Data className="shade">Physical Address</Data>
              <Data>
                {business?.physical_address ? business.physical_address : "-"}
              </Data>
            </tr>

            <tr>
              <Data className="shade">Postal Address</Data>
              <Data>
                {business?.postal_address ? business.postal_address : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Registered Telephone</Data>
              <Data>
                {business?.phone_number ? business.phone_number : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Registered Email</Data>
              <Data>{business?.email ? business.email : "-"}</Data>
            </tr>
            <tr>
              <Data className="shade">Branches</Data>
              <Data>{business?.branches ? business.branches : "-"}</Data>
            </tr>
          </tbody>
        </table>

        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>OWNERSHIP DETAILS</HData>
            </tr>
            <tr>
              <HData>Name</HData>
              <HData>ID Number</HData>
              <HData>ID Type</HData>
              <HData>No of Shares</HData>
            </tr>
          </thead>
          <tbody>
            {business?.partners ? (
              business.partners.filter(onlyUnique).map((i, index) => {
                return (
                  <tr key={index}>
                    <Data>
                      {[i.first_name, i.second_name, i.third_name].join(" ")}
                    </Data>
                    <Data>{i?.id_number ? i.id_number : "-"}</Data>
                    <Data>{i.id_type ? i.id_type : "-"}</Data>
                    <Data>{i.number_of_shares ? i.number_of_shares : "-"}</Data>
                  </tr>
                );
              })
            ) : (
              <tr>
                <Data>-</Data>
                <Data>-</Data>
                <Data>-</Data>
                <Data>-</Data>
              </tr>
            )}
          </tbody>
        </table>
        <div className="seperator" />
        <p className="center w-100">
          *** The above information is per records held by the Registrar of
          Companies ***
        </p>

        <Disclaimer />
      </div>
    </Page>
  );
};

export const LLPSearchReport = connect(function (state) {
  return {
    report: state.global.report,
  };
})(_LLPSearchReport);

export default LLPSearchReport;
