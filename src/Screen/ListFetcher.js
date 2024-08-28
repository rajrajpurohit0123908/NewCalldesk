// src/components/ListFetcher.js
import React, { useEffect, useState } from 'react';

import '../ListFetcher.css'; // Import custom CSS for styling
import DataTable from '../Component/DataTable';
import Loader from './Loader';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ListFetcher = () => {
  const [list, setList] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const goToHome = () => {
    navigate('/dashboard');
};
   


  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Convert the comma-separated list into an array
     // Convert the comma-separated list into an array of numbers
    //const listArray = list.split(',').map(item => Number(item.trim())).filter(item => !isNaN(item));
    
    const listArray = list.split(',').map(item => item.trim()).filter(item => item.length > 0);

    // Make a request to the REST API
    const response = await fetch('test1/api/savvion/instanceid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listArray), // Send the list as an array
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    setData(result);

  } catch (err) {
    setError('Error fetching data: ' + err.message);
  } finally {
    setLoading(false);
}
  
  };

  useEffect(() => {
  }, []);


  return (
    <div className="list-fetcher">
      <h1>Update Status</h1>
      
      <input
        type="text"
        value={list}
        onChange={(e) => setList(e.target.value)}
        placeholder="Enter TicketNumber, separated by commas"
        style={{minWidth:300}}
      />
      <Button style={{backgroundColor:'#15ABFFFF',color:'#fff'}} onClick={handleFetchData}>Fetch Data</Button>
      <Button style={{backgroundColor:'#15ABFFFF',color:'#fff', marginLeft:10}} onClick={goToHome}>Back</Button>
      {loading ? (
                <Loader />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <Box sx={{ overflow:'scroll', width:'180vh',height:'80vh' }}>
           <DataTable data={data} />
            </Box>
               
            )}
     
    </div>
  );
};

export default ListFetcher;
