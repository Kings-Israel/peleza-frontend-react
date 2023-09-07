import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useHistory ,withRouter} from "react-router-dom";


function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer} style={{ display: "flex", justifyContent: 'space-between' }}>
      <GridToolbarExport />
      <GridToolbarQuickFilter style={{ fontSize: "16px", fontWeight: "bolder" }} />
    </GridToolbarContainer>
  );
}


function DTable(props) {
  let history = useHistory();
  const handleRowSelection = (e) => {
    let url = ''
    if(e.row.status !== "55") {
      url = `/reports/${e.row.url}/?request_ref=${e.row.request_ref_number}&package_id=${e.row.package_id}&dataset_name=${e.row.company_name}`;
    } else {
      url = `/reports/invalid/?request_ref=${e.row.request_ref_number}&package_id=${e.row.package_id}`
    }

    history.push(url);
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        title={"Data search .."}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableMultipleSelection={false}
        rows={props.rows}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick = {handleRowSelection}
      />
    </div>
  );
}

export default withRouter(DTable)