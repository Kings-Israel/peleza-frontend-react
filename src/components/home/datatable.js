import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport ,gridClasses } from '@mui/x-data-grid';
import { useHistory ,withRouter} from "react-router-dom";


function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


function DTable(props) {
  let history = useHistory();
  const handleRowSelection = (e) => {
    let url = `/reports/${e.row.url}/?request_ref=${e.row.request_ref_number}&package_id=${e.row.package_id}&dataset_name=${e.row.company_name}`;
    history.push(url);
    props.viewReport(e);
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        title={"Data search .."}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableMultipleSelection={false}
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick = {handleRowSelection}
      />
    </div>
  );
}

export default withRouter(DTable)