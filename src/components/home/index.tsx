import { Dashboard } from "./dashboard";
import { DashBoardStats } from "./stats";

export default function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="pt-4">
          <DashBoardStats />
          <Dashboard />
        </div>
      </div>
    </>
  );
}
