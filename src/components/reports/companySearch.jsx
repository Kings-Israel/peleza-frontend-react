import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onlyUnique } from "utils/functions";
import Disclaimer from "./disclaimer.abstract";
import ReportHeader from "./header.abstract";
import Page, { Data, HData, InnerReportHeader } from "./page.abstract";

const _CompanySearchReport = ({ report, location }) => {
  const business = report.business;
  const pathname = String(location?.pathname);
  const term = pathname.includes("clg") ? "CLG" : "COMPANY";
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
        {!pathname.includes("clg") && (
          <>
            <div className="seperator" />
            <table className="table-no-padding w-100 dark-table center">
              <thead className="dark-header">
                <tr>
                  <HData colSpan={12}>SHARE CAPITAL</HData>
                </tr>
                <tr>
                  <HData>Name</HData>
                  <HData>Nominal Value</HData>
                  <HData>No of Shares</HData>
                </tr>
              </thead>
              <tbody>
                {business?.share_capital?.length > 0 ? (
                  business.share_capital.filter(onlyUnique).map((i, index) => {
                    return (
                      <tr key={index}>
                        <Data>{i?.name}</Data>
                        <Data>{i.nominal_value ? i.nominal_value : "-"}</Data>
                        <Data>
                          {i.number_of_shares ? i.number_of_shares : "-"}
                        </Data>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <Data>-</Data>
                    <Data>-</Data>
                    <Data>-</Data>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
        <div className="seperator" />
        <table
          className="table-no-padding w-100 dark-table center"
          style={{ fontSize: "10pt" }}
        >
          <thead className="dark-header">
            <tr>
              <HData colSpan={10}>{`${
                pathname?.includes("clg")
                  ? "DIRECTORS AND MEMBERS"
                  : "SHAREHOLDING & DIRECTORSHIP"
              }`}</HData>
            </tr>
            <tr>
              <HData>Name</HData>
              <HData>ID Number</HData>
              <HData>Description</HData>
              {!pathname.includes("clg") ? (
                <HData>No of Shares</HData>
              ) : (
                <>
                  <HData>Description</HData>
                  <HData>Address</HData>
                  <HData>Nationality</HData>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {business?.partners?.length > 0 ? (
              business.partners.filter(onlyUnique).map((i, index) => {
                return (
                  <tr key={index}>
                    <Data>
                      {[i.first_name, i.second_name, i.third_name].join(" ")}
                    </Data>
                    <Data>{i?.id_number ? i.id_number : "-"}</Data>
                    <Data>{i.description ? i.description : "-"}</Data>
                    {!pathname.includes("clg") ? (
                      <Data>
                        {i.number_of_shares ? i.number_of_shares : "-"}
                      </Data>
                    ) : (
                      <>
                        <Data>{i.description ? i.description : "-"}</Data>
                        <Data>{i.address ? i.address : "-"}</Data>
                        <Data>{i.nationality ? i.nationality : "-"}</Data>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <Data>-</Data>
                <Data>-</Data>
                <Data>-</Data>
                {pathname.includes("clg") ? (
                  <>
                    <Data>-</Data>
                    <Data>-</Data>
                    <Data>-</Data>
                  </>
                ) : (
                  <Data>-</Data>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <div className="seperator" />
        {!pathname.includes("clg") && (
          <>
            <table className="table-no-padding w-100 dark-table center">
              <thead className="dark-header">
                <tr>
                  <HData colSpan={10}>ENCUMBRANCES</HData>
                </tr>
                <tr>
                  <HData>Description</HData>
                  <HData>Date of Instrument</HData>
                  <HData>Secured Amounts</HData>
                </tr>
              </thead>
              <tbody>
                {business?.encumbrances?.length > 0 ? (
                  business.encumbrances.map((i) => (
                    <tr>
                      <td>{i.description_of_evidence || "-"}</td>
                      <td>{i.date_of_evidence || "-"}</td>
                      <td>{i.secured_amounts || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
        <div className="seperator" />
        {/*  */}
        <p className="center w-100">
          *** The above information is per records held by the Registrar of
          Companies ***
        </p>
        <Disclaimer />
      </div>
    </Page>
  );
};

export const CompanySearchReport = connect(function (state) {
  return {
    report: state.global.report,
  };
})(withRouter(_CompanySearchReport));
export default CompanySearchReport;
