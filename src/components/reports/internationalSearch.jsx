import Disclaimer from "./disclaimer.abstract";
import ReportHeader from "./header.abstract";
import Page from "./page.abstract";

export const InternationalSearchReport = () => (
  <Page>
    <ReportHeader />
    <div className="inner-page">
      <div className="table-row">
        <table className="peleza-table w-100">
          <tbody>
            <tr>
              <td>
                <div className="title w-100">Client's Name</div>
              </td>
              <td>
                <div className="info w-100">STANBIC&nbsp;BANK</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="title w-100">LLP&nbsp;Name</div>
              </td>
              <td>
                <div className="info w-100">ABC&nbsp;LIMITED</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="title w-100">Screening&nbsp;Package</div>
              </td>
              <td>
                <div className="info w-100">Company&nbsp;SEARCH</div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="peleza-table w-100">
          <tbody>
            <tr>
              <td>
                <div className="title w-100">Report&nbsp;Status</div>
              </td>
              <td>
                <div className="info w-100">FINAL</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="title w-100">Report&nbsp;Dated</div>
              </td>
              <td>
                <div className="info w-100">
                  12<sup>TH</sup> FEBRUARY 2021
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="title w-100">Reference NO.</div>
              </td>
              <td>
                <div className="info w-100">PSL/VC/00011111</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="seperator" />
      <table className="table-no-padding w-100 dark-table center">
        <thead className="dark-header">
          <tr>
            <td colSpan={12}>COMPANY&nbsp;REGISTRATION&nbsp;DETAILS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shade">International Company&nbsp;Name</td>
            <td>ABC&nbsp;LIMITED</td>
          </tr>
          <tr>
            <td className="shade">Company Registration Number</td>
            <td>BN-ZABC1X8M</td>
          </tr>
          <tr>
            <td className="shade">Date of Incorporation</td>
            <td>21 Feb 2018</td>
          </tr>
        </tbody>
      </table>
      <div className="seperator" />
      <table className="table-no-padding w-100 dark-table center">
        <thead className="dark-header">
          <tr>
            <td colSpan={12}>REGISTERED OFFICE ADDRESSES</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shade">County</td>
            <td>Nairobi</td>
            <td className="shade-fade">District</td>
            <td>Starehe District</td>
          </tr>
          <tr>
            <td className="shade">Locality</td>
            <td>CBD</td>
            <td className="shade-fade">Street</td>
            <td>Kimathi Street</td>
          </tr>
          <tr>
            <td className="shade">Building</td>
            <td>Vescon</td>
            <td className="shade-fade">Registered Address</td>
            <td>P. O. Box 1234 – 10100 – Malindi</td>
          </tr>
          <tr>
            <td className="shade">Registered Telephone</td>
            <td>+254721111444</td>
            <td className="shade-fade">Registered Email</td>
            <td>joy.smith@gmail.com</td>
          </tr>
        </tbody>
      </table>
      <div className="seperator" />
      <table className="table-no-padding w-100 dark-table center">
        <thead className="dark-header">
          <tr>
            <th colSpan={12}>SHAREHOLDING AND DIRECTORSHIP DETAILS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shade">Nominal Share Capital</td>
            <td>-</td>
            <td className="shade-fade">Number of shares</td>
            <td>-</td>
          </tr>
          <tr>
            <td className="shade">Type of Share</td>
            <td>-</td>
            <td className="shade-fade">Value per Shares</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <div className="seperator" />
      <table className="table-no-padding w-100 dark-table center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Citizenship</th>
            <th>Share Type</th>
            <th>Shares</th>
            <th>% Shareholding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shade">John Doe Smith</td>
            <td>Foreign Director</td>
            <td>Foreigner</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td className="shade">Smith Joy Adelle</td>
            <td>Local Representative</td>
            <td>Kenyan</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td className="shade">MNO Limited</td>
            <td>Foreign Director</td>
            <td>Foreigner</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
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
export default InternationalSearchReport;
