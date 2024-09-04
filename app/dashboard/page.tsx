"use client"
import { useState } from 'react';
import Headers from '../headers/page';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import { supabase } from '@/lib/supabase';

function Dashboard() {  
    const [files, setFiles] = useState([
        { name: 'E102', status: 'Cancelled', leads: 10000, downloadable: false },
        { name: 'E103', status: 'Completed', leads: 15000, downloadable: true },
        { name: 'E104', status: 'Completed', leads: 5000, downloadable: true },
        { name: 'E105', status: 'Cancelled', leads: 2000, downloadable: false },
        { name: 'E106', status: 'Completed', leads: 1000, downloadable: true },
        { name: 'E107', status: 'Cancelled', leads: 500, downloadable: false }
      ]);

    return (
        // <ProtectedRoute>
        <div className="min-h-screen bg-gray-100">
            <Headers />
            <main className="container mx-auto p-4">
            <section className="bg-white p-6 rounded shadow mb-8">
              <h2 className="text-center text-xl font-bold mb-4 text-green-900">Apollo Scraper Realtime</h2>
              <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row md:space-x-4">
                      <input
                          style={{ color: 'black' }}
                          type="text"
                          placeholder="Apollo Search url"
                          className="border border-gray-300 p-2 rounded w-full"
                      />
                      <input
                          style={{ color: 'black' }}
                          type="number"
                          placeholder="100"
                          className="border border-gray-300 p-2 rounded w-full mt-4 md:mt-0"
                      />
                  </div>
                  <div className="flex justify-end">
                  <span className="text-black font-semibold pt-2">Leads:</span>
                  <span className="text-red-600 font-semibold p-2">100</span>
                      <button className="bg-yellow-400 w-full md:w-96 text-black p-2 rounded">Extract leads</button>
                  </div>
              </div>
          </section>

                <section className="bg-white p-6 rounded shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h3 className="text-lg font-medium" style={{ color: 'black' }}>Processed Files</h3>
                        <input
                            style={{ color: 'black', height: '30px' }}
                            type="text"
                            placeholder="Search"
                            className="border p-2 rounded-2xl mt-4 md:mt-0"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className='bg-gray-100'>
                                    <td className="px-6 py-3 border-b-2 text-black font-bold text-gray-500">Name</td>
                                    <td className="px-6 py-3 border-b-2 text-black font-bold text-gray-500">File Status</td>
                                    <td className="px-6 py-3 border-b-2 text-black font-bold text-gray-500">Leads</td>
                                    <td className="px-6 py-3 border-b-2 text-black font-bold text-gray-500">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                              {files.map((file, index) => (
                                <tr
                                  key={index}
                                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                >
                                  <td className="px-6 py-4 flex items-center text-black ">
                                    <img
                                      src="https://i.pinimg.com/736x/bd/b6/ab/bdb6abe62ffe8ac78bff9ae3fb552b5e.jpg"
                                      alt="Excel"
                                      className="h-6 mr-2"
                                    />
                                    {file.name}
                                  </td>
                                  <td
                                    className={`px-6 py-4 font-bold ${
                                      file.status === 'Completed' ? 'text-green-500' : 'text-red-500'
                                    }`}
                                  >
                                    {file.status}
                                  </td>
                                  <td className="px-6 py-4 text-black">{file.leads}</td>
                                  <td className="px-6 py-4">
                                    {file.downloadable ? (
                                      <button className="bg-blue-500 text-white p-2 rounded">
                                        Download
                                      </button>
                                    ) : (
                                      <span className="text-red-500 text-xl">🚫</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center space-x-4 mt-4">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">&lt;</button>
                        <span className="text-lg text-black">1</span>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">&gt;</button>
                    </div>
                </section>
            </main>
        </div>
        // </ProtectedRoute>
    )
}

export default Dashboard;
