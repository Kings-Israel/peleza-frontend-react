import { useStore } from "react-redux";

export default function Status({
  status,
  percentage,
}: {
  status: string;
  percentage: number;
}) {
  const state = useStore().getState();
  let color = state.global.colors[String(status).toString()];
  let button;
  if (String(status).toString() === "00") {
    button = <div
            className="btn btn-sm btn-primary rounded"
            style={{ borderRadius: "2px", background: color ? color : "pink", }}
          >
            PENDING
          </div>
  } else if (String(status).toString() === "11") {
    button = <div
                className="btn btn-sm btn-primary rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                COMPLETED
              </div>
  } else if (String(status).toString() === "44") {
    button = <div
                className="btn btn-sm btn-primary rounded"
                style={{ borderRadius: "2px", background: color ? color : "pink", }}
              >
                IN PROGRESS
              </div>
  }
  return (
    // <div className="w-100 d-flex align-items-center">
    //   <div
    //     className="progress w-100 py-0 "
    //     style={{
    //       height: "15px",
    //       borderRadius: "2px",
    //     }}
    //     title={`${percentage}% now`}
    //   >
    //     <div
    //       className="progress-bar progress-bar-striped my-0"
    //       role="progressbar"
    //       style={{
    //         width: `${percentage === 0 ? 3 : percentage}%`,
    //         background: color ? color : "pink",
    //       }}
    //       aria-valuenow={percentage}
    //       aria-valuemin={0}
    //       aria-valuemax={100}
    //     ></div>
    //   </div>
    //   <span
    //     style={{
    //       width: "50px",
    //       textAlign: "right",
    //       fontWeight: 700,
    //       fontSize: "9.2pt",
    //       marginLeft: "5px",
    //     }}
    //   >
    //     {percentage}%
    //   </span>
    // </div>
    {button}
  );
}
