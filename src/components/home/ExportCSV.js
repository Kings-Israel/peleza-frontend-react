
import React from 'react'
// import Button from 'react-bootstrap/Button';
import { Button } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// Takes the data as the props and takes care rest of the export functionality. 
// Here is the component with exportToCSV method to handle all the excel download functionality with xlxs and file-saver.
export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="outlined" color="primary" onClick={(e) => exportToCSV(csvData,fileName)}>Download Excel</Button>
    )
}