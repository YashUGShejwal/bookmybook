import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import palette from '../../theme/palette';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../utils/axiosInstance';
const CSVParser = ({ handleClose }) => {
  const [csvData, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleCsvParse = (e) => {
    const files = e.target.files;

    if (files) {
      Papa.parse(files[0], {
        complete: async function (results) {
          console.log('Finished:', results.data);
          setData(results.data);

          const res = await axiosInstance.post('/books/addFromCSV', {
            data: results.data,
          });
          console.log(res);
          if (res.status === 200) {
            enqueueSnackbar(res.data?.message || 'Data added successfully!', {
              variant: 'success',
            });
            handleClose();
          }
          console.log(res);
        },
      });
    }
  };
  const inputStyle = {
    border: 'none',
    marginLeft: '1rem',
  };
  return (
    <>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => handleCsvParse(e)}
        style={inputStyle}
      />
    </>
  );
};

export default CSVParser;
