const table_column_header   = [
  // {field: 'search_id', headerName: 'Search', width: 110,},
  {field: 'client_number', headerName: 'Client No', width: 100 },
  { field: 'request_plan', headerName: 'Plan', width: 190 },
  { field: 'company_name', headerName: 'Company Name', width: 170 },
  {field: 'registration_number', headerName: 'Reg Number',width: 100},
  // {field: 'request_plan', headerName: 'Request Plan', width: 110,},
  {field: 'request_date', headerName: 'Request Date', width: 190,},
  {field: 'verified_date', headerName: 'Report Date', width: 190,},
  {field: 'status', headerName: 'Status', width: 120,},
  // {field: 'country', headerName: 'Country', width: 130,},
  // {field: 'request_id', headerName: 'Req_id', width: 90,},
  {field: 'medium', headerName: 'Source', width: 90,},
];

module.exports = Object.freeze({
  table_column_header: table_column_header,
});
