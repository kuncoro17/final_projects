import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardContent from '../components/DashboardContent'; // Import DashboardContent

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardContent /> {/* Render DashboardContent */}
          <Outlet /> {/* Keep Outlet for nested routes */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
