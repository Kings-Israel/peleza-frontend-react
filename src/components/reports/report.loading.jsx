import Error from "@material-ui/icons/ErrorOutline";
import loading from "assets/images/loading.svg";

export default function ReportLoading({ errored }) {
  return (
    <div className="d-flex vh-100 vw-100 fixed-top align-items-center justify-content-center flex-column bg-light w-100">
      {!errored ? (
        <>
          <img src={loading} alt="" />
          <p className="text-info mono">PLEASE WAIT</p>
        </>
      ) : (
        <>
          <Error
            className="text-danger"
            style={{ height: "100px", width: "100px" }}
          />
          <p className="text-danger mono">COULD NOT GET REPORT</p>
        </>
      )}
    </div>
  );
}
