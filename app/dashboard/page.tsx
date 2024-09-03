"use client"
import { useState } from 'react';
import Headers from '../headers/page';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import { supabase } from '@/lib/supabase';


function dashboard() {  
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
                <h2 className="text-center text-2xl font-semibold mb-4 text-green-800">Apollo Scraper Realtime</h2>
                <div className="flex items-center justify-center space-x-4">
                  <input
                    style={{color:'black'}}
                    type="text"
                    
                    placeholder="Apollo Search url"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                  <input
                    style={{color:'black'}}
                    type="number"
                    placeholder="100"
                    className="border border-gray-300 p-2 rounded"
                  />
                  <button className="bg-yellow-400 w-96 text-black p-2 rounded">Extract leads</button>
                </div>
              </section>
      
              <section className="bg-white p-6 rounded shadow">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="text-lg font-medium mb-4" style={{color:'black'}}>Processed Files</h3>
                <input
                    style={{color:'black', height: '30px'}}
                    type="text"
                    placeholder="Search"
                    className="border p-2 rounded "
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead>
                      <tr>
                        <td className="px-6 py-3 border-b-2 text-black font-bold">Name</td>
                        <td className="px-6 py-3 border-b-2 text-black font-bold">File Status</td>
                        <td className="px-6 py-3 border-b-2 text-black font-bold">Leads</td>
                        <td className="px-6 py-3 border-b-2 text-black font-bold">Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file, index) => (
                        <tr key={index} >
                          <td className="px-6 py-4 flex items-center text-black">
                            <img src="https://i.pinimg.com/736x/bd/b6/ab/bdb6abe62ffe8ac78bff9ae3fb552b5e.jpg" alt="Excel" className="h-6 mr-2" />
                            {file.name}
                          </td>
                          <td className={`px-6 py-4 ${file.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                            {file.status}
                          </td>
                          <td className="px-6 py-4 text-black">{file.leads}</td>
                          <td className="px-6 py-4">
                            {file.downloadable ? (
                              <button className="bg-blue-500 text-white p-2 rounded">Download</button>
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

export default dashboard;
