import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAssignedUnassignedStore } from "actions/universal";

const DataGridBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .table-header": {
    backgroundColor: "#e9ecef",
    color: "#8898aa",
    fontSize: 16,
    fontWeight: 300,
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    backgroundColor: "#e9ecef",
  },
  "& .table-row": {
    fontSize: 16,
    color: "#525f7f",
    fontWeight: 200,
  },
}));

function Table(props) {
  const universal = useSelector(
    (store) => store.universalReducer.assignUnassignedStore
  );

  const dispatch = useDispatch();

  return (
    <DataGridBox sx={{ height: 450 }}>
      <DataGrid
        headerHeight={30}
        rowHeight={40}
        checkboxSelection
        disableColumnSelector
        hideFooter
        hideFooterSelectedRowCount
        hideFooterPagination
        getRowId={(row) => row._id}
        selectionModel={universal}
        onSelectionModelChange={(row) =>
          dispatch(setAssignedUnassignedStore(row))
        }
        {...props}
      />
    </DataGridBox>
  );
}

export default Table;
