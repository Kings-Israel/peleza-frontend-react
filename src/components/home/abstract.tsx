// import Status from "components/home/status";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import { addHours } from "utils/functions";

function _Row(props: any) {
  let reportURL: any={};
  reportURL= Object.values(props.modules).find(
    (i: any) => props.obj.package_id === i.package_id
  );
  // just a fix for ncba will rework it later
  // console.log(" ==== props.index === ",props.index)
  // console.log(" ==== reportURL from _Row === ",reportURL)
  // console.log(" ==== props === ",props.colors)
  if(reportURL === undefined) {
    reportURL={};
    reportURL.url=props.obj.request_plan
  } else if(reportURL.url==='ncba') {
    reportURL.url=props.obj.request_plan
  }

  let color = props.colors[String(props.obj.status).toString()];
  let button;
  if (String(props.obj.status).toString() === "00") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                NEW
              </span>
  } else if (String(props.obj.status).toString() === "11") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                COMPLETED
              </span>
  } else if (String(props.obj.status).toString() === "22") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                UNREVIEWED
              </span>
  } else if (String(props.obj.status).toString() === "44") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                IN PROGRESS
              </span>
  } else if (String(props.obj.status).toString() === "55") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                INVALID
              </span>
  } else if (String(props.obj.status).toString() === "66") {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                MANUAL
              </span>
  } else {
    button = <span
                className="p-1 rounded"
                style={{ borderRadius: "2px", background: "white", }}
              >
                PENDING
              </span>
  }
  
  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        if(reportURL.url !== props.obj.request_plan) {
          reportURL.url = props.obj.request_plan
        }
        let url = ''
        if (props.obj.status === "55") {
          url = `reports/invalid/?request_ref=${props.obj.request_ref_number}&package_id=${props.obj.package_id}`
        } else {
          url = `/reports/${reportURL.url}/?request_ref=${props.obj.request_ref_number}&package_id=${props.obj.package_id}&dataset_name=${props.obj.dataset_name}`;
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
      <td>{props.obj.verified_date || "-"}</td>
      <td>
        {/* <Status percentage={props.obj.percentage} status={props.obj.status} /> */}
        {button}
      </td>
    </tr>
  );
}

export const Row = connect(function (state: any) {
  return {
    modules: state.global.modules || {},
    colors: state.global.colors
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
