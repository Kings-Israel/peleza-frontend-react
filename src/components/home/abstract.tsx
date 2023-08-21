import Status from "components/home/status";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function _Row(props: any) {
  let reportURL: any={};
  reportURL= Object.values(props.modules).find(
    (i: any) => props.obj.package_id === i.package_id
  );
  // just a fix for ncba will rework it later
  // console.log(" ==== props.index === ",props.index)
  // console.log(" ==== reportURL from _Row === ",reportURL)
  //console.log(" ==== props.obj === ",props.obj)
  if(reportURL === undefined) {
    reportURL={};
    reportURL.url=props.obj.request_plan
  } else if(reportURL.url==='ncba') {
    reportURL.url=props.obj.request_plan
  }
  
  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        if(reportURL.url !== props.obj.request_plan) {
          reportURL.url = props.obj.request_plan
        }
        // console.log(props.obj)
        let url = ''
        if (props.obj.status !== "55") {
          url = `/reports/${reportURL.url}/?request_ref=${props.obj.request_ref_number}&package_id=${props.obj.package_id}&dataset_name=${props.obj.dataset_name}`;
        } else {
          url = `reports/invalid/?request_ref=${props.obj.request_ref_number}&package_id=${props.obj.package_id}`
        }
        props.history.push(url);
      }}
    >
      {/* <td>{props.index + 1} </td> */}
      <td>{props.obj.client_number || "-"}</td>
      <td>{props.obj.request_plan || "-"}</td>
      <td>{props.obj.dataset_name || "-"}</td>
      <td>{props.obj.registration_number || "-"}</td>
      <td>{props.obj.request_date || "-"}</td>
      <td>{props.obj.status_date || "-"}</td>
      <td>
        <Status percentage={props.obj.percentage} status={props.obj.status} />
      </td>
    </tr>
  );
}

export const Row = connect(function (state: any) {
  return {
    modules: state.global.modules || {},
  };
})(withRouter(_Row));

export const HeadFooterRow = ({
  setSortField,
}: {
  setSortField?: (data: string) => any;
}) => {
  const _setSortField = setSortField ? setSortField : (param: any) => void null;
  return (
    <tr>
      {/* <TH name="#">#</TH> */}
      <TH name="name" onClick={() => _setSortField("client_number")}>
        Client Number
      </TH>
      <TH name="request_plan" onClick={() => _setSortField("request_plan")}>
        Plan
      </TH>
      <TH name="name" onClick={() => _setSortField("name")}>
        Company Name
      </TH>

      <TH
        name="registration_number"
        onClick={() => _setSortField("registration_number")}
      >
        Reg Number
      </TH>


      <TH name="date" onClick={() => _setSortField("date")}>
        Request Date
      </TH>
      <TH name="verified_date" onClick={() => _setSortField("verified_date")}>
        Report Date
      </TH>
      <TH name="status" onClick={() => _setSortField("status")}>
        Status
      </TH>
    </tr>
  );
};

// const Sort = () => <SortSharp className="text-info" style={styles.icon} />;

const TH = ({
  children,
  onClick,
}: {
  name: string;
  children: any;
  onClick?: any;
}) => (
  <th className="cursor-pointer" onClick={onClick ? onClick : () => void null}>
    {children}
  </th>
);
