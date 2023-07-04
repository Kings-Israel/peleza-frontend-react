import logo from "../../assets/images/banner-logo.png";
export default function ReportHeader() {
  return (
    <div className="page-row">
      <h3 className="info-text">CONFIDENTIAL&nbsp;REPORT</h3>
      <img src={logo} alt="" className="logo" />
    </div>
  );
}
