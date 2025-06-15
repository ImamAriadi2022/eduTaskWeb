import React from "react";
import SummaryCards from "../components/home/SummaryCard";
import TaskCalendar from "../components/home/Calendar";
import TaskDistributionChart from "../components/home/Chart";
import TaskDeadlineTable from "../components/home/Table";
import Sidebar from "../components/sidebar";
import BrandNavbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => (
  <div
    className="d-flex flex-column min-vh-100"
    style={{
      background: "#fffbe6",
      transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
    }}
  >
    <BrandNavbar />
    <div className="d-flex flex-grow-1">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <SummaryCards />
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <TaskCalendar />
          </div>
          <div className="col-md-6 mb-3">
            <TaskDistributionChart />
          </div>
        </div>
        <TaskDeadlineTable />
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;