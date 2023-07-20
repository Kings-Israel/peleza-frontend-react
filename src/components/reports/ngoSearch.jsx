import { connect } from "react-redux";
import { withRouter } from "react-router";
import { arrayToObject } from "utils/functions";
import Disclaimer from "./disclaimer.abstract";
import ReportHeader from "./header.abstract";
import Page, { Data, HData, InnerReportHeader } from "./page.abstract";
// import { ReportData } from "../../api/index";


export const _NGOSearchReport = ({ report, location }) => {
  // console.log(" Ngo report",report)

  const business = report.business;
  const pathname = String(location.pathname).toLowerCase();

  const officials = arrayToObject(business?.officials, "role");
 
  const share_capital = arrayToObject(business?.share_capital, "name");
  let pts=[ <div> No Partner Data</div>]
  if(business && business.partners) {
    pts =business.partners.map((pt) =>
      <div key={pt.id}>
        <Data className="shade">First Name</Data>
        <Data>{pt?.first_name|| "-"}</Data>
        <Data className="shade">ID Number</Data>
        <Data>{pt?.id_number || "-"}</Data>
        <Data className="shade">Number of Shares</Data>
        <Data>{pt?.number_of_shares || "-"}</Data>
      </div>   
    )
  }
 

  const term = pathname.includes("trust")
    ? "TRUST'S"
    : pathname.includes("cbo")
    ? "CBO'S"
    : pathname.includes("societ")
    ? "SOCIETY's"
    : "NGO'S";

  return (
    <Page>
      <ReportHeader />
      <div className="inner-page">
        <InnerReportHeader report={report} term={term} />
        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>{`${term} REGISTRATION DETAILS`}</HData>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Data className="shade">{`${term} Name`}</Data>
              <Data>
                {business?.business_name ? business.business_name : "-"}
              </Data>{" "}
            </tr>
            <tr>
              <Data className="shade">Registration Number</Data>
              <Data>
                {business?.registration_number
                  ? business.registration_number
                  : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Date of Registration</Data>
              <Data>
                {business?.registration_date ? business.registration_date : "-"}
              </Data>
            </tr>
            <tr>
              <Data className="shade">Objective</Data>
              <Data>{business?.objective ? business.objective : "-"}</Data>
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
              <HData colSpan={12}>OFFICIALS DETAILS</HData>
            </tr>
          </thead>
          <tbody className="text-capitalize">
            <tr>
              <Data className="shade">Chairman</Data>
              <Data>{officials?.chairman?.name || "-"}</Data>
              <Data className="shade">Vice Chairman</Data>
              <Data>{officials?.vice_chairman?.name || "-"}</Data>
            </tr>
            <tr>
              <Data className="shade">Secretary</Data>
              <Data>{officials?.secretary?.name || "-"}</Data>
              <Data className="shade">Vice Secretary</Data>
              <Data>{officials?.vice_secretary?.name || "-"}</Data>
            </tr>
            <tr>
              <Data className="shade">Treasurer</Data>
              <Data>{officials?.treasurer?.name || "-"}</Data>
              <Data className="shade">Vice Treasurer</Data>
              <Data>{officials?.vice_treasurer?.name || "-"}</Data>
            </tr>
          </tbody>
        </table>

        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>SHARE CAPITAL DETAILS</HData>
            </tr>
          </thead>
          <tbody className="text-capitalize">
            <tr>
              <Data className="shade">Ordinary</Data>
              <Data>{share_capital?.ORDINARY?.nominal_value|| "-"}</Data>
              <Data className="shade">Number of Shares</Data>
              <Data>{share_capital?.ORDINARY?.number_of_shares || "-"}</Data>
            </tr>
        
            <tr>
              <Data className="shade">Preferential</Data>
              <Data>{share_capital?.PREFERENTIAL?.nominal_value || "-"}</Data>
              <Data className="shade">Number of Shares</Data>
              <Data>{share_capital?.PREFERENTIAL?.number_of_shares || "-"}</Data>
            </tr>
          </tbody>
        </table>

        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>PARTNERS DETAILS</HData>
            </tr>
          </thead>
          <tbody className="text-capitalize">
          
         
          <tr >
               {pts}
            </tr>
         
          
      
          </tbody>
        </table>


        <div className="seperator" />
        <table className="table-no-padding w-100 dark-table center">
          <thead className="dark-header">
            <tr>
              <HData colSpan={12}>ADDITIONAL DETAILS</HData>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Data className="shade">No. of Members</Data>
              <Data>
                {business?.member_count ? business.member_count : "-"}
              </Data>
            </tr>
          </tbody>
        </table>
        {/*  */}
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

export const NGOSearchReport = withRouter(
  connect( function (state) {
    // console.log(" == I am in NGO search report ===",state.global)
    return {
      report: state.global.report,
    };
  })(_NGOSearchReport)
);
export default NGOSearchReport;
