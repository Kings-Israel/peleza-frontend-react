import { StatsInterface } from "models";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  new: number;
  in_progress: number;
  interim: number;
  final: number;
  invalid: number;
} 
class _DashBoardStats extends Component<Props> {
  render() {
    return (
      <>
        <div className="d-flex justify-content-around flex-wrap">
          <div
            className="cursor-pointer"
            onClick={() =>
              this.props.history.push("/requests/?q=mine&status=new")
            }
          >
            <div
              className="card border-0"
              style={{ backgroundColor: "rgba(51, 0, 118, 0.7)", minWidth: "180px", }}
            >
              <div className="card-body py-3">
                <div className="main-card text-white">
                  <div className="card-body text-center">
                    <span style={{ fontSize: "3em" }}>
                      <span>{this.props.new}</span>
                    </span>
                    <div className="widget-subheading">New Requests</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="cursor-pointer"
            onClick={() =>
              this.props.history.push("/requests/?q=mine&status=in_progress")
            }
          >
            <div className="card border-0" style={{ backgroundColor: "rgba(0, 0, 255, 0.7)", minWidth: "180px" }}>
              <div className="card-body py-3">
                <div className="main-card text-white">
                  <div className="card-body text-center">
                    <span style={{ fontSize: "3em" }}>
                      <span>{this.props.in_progress}</span>
                    </span>
                    <div className="widget-subheading">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="cursor-pointer"
            onClick={() =>
              this.props.history.push("/requests/?q=mine&status=completed")
            }
          >
            <div className="card border-0" style={{ backgroundColor: "rgba(0, 128, 0, 0.7)", minWidth: "180px" }}>
              <div className="card-body py-3">
                <div className="main-card text-white">
                  <div className="card-body text-center">
                    <span style={{ fontSize: "3em" }}>
                      <span>{this.props.final}</span>
                    </span>
                    <div className="widget-subheading">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cursor-pointer"
              onClick={() =>
                this.props.history.push("/requests/?q=mine&status=interim")
              }>
            <div className="card border-0" style={{ backgroundColor: "rgba(255, 165, 0, 0.7)", minWidth: "180px" }}>
              <div className="card-body py-3">
                <div className="main-card text-white">
                  <div className="card-body text-center">
                    <span style={{ fontSize: "3em" }}>
                      <span>0</span>
                    </span>
                    <div className="widget-subheading">Interim</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cursor-pointer"
              onClick={() =>
                this.props.history.push("/requests/?q=mine&status=invalid")
              }>
            <div className="card border-0" style={{ backgroundColor: "rgba(255, 0, 0, 0.7)", minWidth: "180px" }}>
              <div className="card-body py-3">
                <div className="main-card text-white">
                  <div className="card-body text-center">
                    <span style={{ fontSize: "3em" }}>
                      <span>{this.props.invalid}</span>
                    </span>
                    <div className="widget-subheading">Invalid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any): StatsInterface => {
  return {
    new: state.global.stats?.new | 0,
    in_progress: state.global.stats?.in_progress | 0,
    interim: state.global.stats?.interim | 0,
    final: state.global.stats?.final | 0,
    invalid: state.global.stats?.invalid | 0,
  };
};

export const DashBoardStats = connect(mapStateToProps)(
  withRouter(_DashBoardStats)
);
