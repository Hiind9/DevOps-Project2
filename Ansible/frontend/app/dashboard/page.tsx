"use client";

import axios from "axios";
import { useEffect, useState } from "react";


interface SampleData {
  id: number;
  routeName: string;
  isProtected: boolean;
  lastAccessed: string;
}

const Page = () => {
  const server_url = process.env.NEXT_PUBLIC_API_URL;
  const [dashboardData, setDashboardData] = useState<SampleData[] | null>(null);

  const sampleTableData: SampleData[] = [
    { id: 1, routeName: '/dashboard', isProtected: true, lastAccessed: '2024-03-20' },
    { id: 2, routeName: '/profile', isProtected: true, lastAccessed: '2024-03-19' },
    { id: 3, routeName: '/settings', isProtected: true, lastAccessed: '2024-03-18' },
    { id: 4, routeName: '/home', isProtected: false, lastAccessed: '2024-03-17' },
  ];

  useEffect(() => {
    const auth_token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const fetchDashboard = async () => {
      setDashboardData(sampleTableData);
    };

    if (auth_token) {
      fetchDashboard();
    }
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-5xl mb-12 text-center">Dashboard</h1>
      <h2>Congratulations, you have successfully deployed this application and logged in.</h2>

      {dashboardData ? (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full bg-black/30 rounded-xl">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Route Name</th>
                  <th className="p-4 text-left">Protected</th>
                  <th className="p-4 text-left">Last Accessed</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50 hover:bg-black/40">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.routeName}</td>
                    <td className="p-4">
                      <span className={item.isProtected ? "text-green-400" : "text-yellow-400"}>
                        {item.isProtected ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">{item.lastAccessed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
          <p className="text-center text-xl">Protected Route Dashboard</p>
      )}
    </div>
  );
};

export default Page;
