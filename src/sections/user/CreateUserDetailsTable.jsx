import { useWatch, useFormContext } from 'react-hook-form';

import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function CreateUserDetailsTable() {
  const { control, setValue } = useFormContext();
  const rows = useWatch({
    control,
    name: 'tableData',
  });

  const actions = [
    { id: 1, Name: 'No Access' },
    { id: 2, Name: 'Full Access' },
    { id: 3, Name: 'Various Access' },
  ];

  const handleProcessRowUpdate = (newRow) => {
    console.log('newRow', newRow);

    const actionVal = newRow.Actions;

    let finalTableData = rows;

    // console.log("finalTableData", finalTableData);

    if (actionVal === 3) {
      finalTableData = rows.map((row) =>
        row.MenuID === newRow.MenuID ? { ...row, Actions: actionVal } : row
      );
    } else if (newRow.ParentID === 0 && newRow.RootParent === 0) {
      finalTableData = rows.map((row1) =>
        row1.RootParent === newRow.MenuID || newRow.MenuID === row1.MenuID
          ? { ...row1, Actions: actionVal }
          : row1
      );
    } else if (rows.map((row2) => newRow.MenuID === row2.ParentID)) {
      finalTableData = rows.map((row) =>
        newRow.MenuID === row.ParentID || newRow.MenuID === row.MenuID
          ? { ...row, Actions: actionVal }
          : row
      );
    }

    finalTableData = finalTableData.map((row) => {
      const childTabs = finalTableData.filter((child) => child.ParentID === row.MenuID);
      if (childTabs.length > 0) {
        const firstAction = childTabs[0]?.Actions;
        const areActionsDifferent = childTabs.some((children) => children.Actions !== firstAction);
        if (areActionsDifferent) {
          return { ...row, Actions: 3 };
        }
        return { ...row, Actions: firstAction };
      }
      return row;
    });

    setValue('tableData', finalTableData);

    return newRow;
  };

  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            paddingLeft:
              params.row.LevelNo === 3
                ? `${params.row.LevelNo * 40}px`
                : `${params.row.LevelNo * 30}px`,
          }}
        >
          {params.row.LevelNo === 1 ? (
            <b>{params.value}</b>
          ) : params.row.LevelNo === 2 ? (
            <b>- {params.value}</b>
          ) : (
            `-- ${params.value}`
          )}
        </div>
      ),
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: actions.map((action) => ({
        value: action.id,
        label: action.Name,
      })),
      renderCell: (params) => (
        // console.log('params',params.formattedValue)
        <div
          style={{
            color:
              params.row.Actions === 1 ? 'red' : params.row.Actions === 2 ? 'green' : '#e8a90d',
          }}
        >
          {params.formattedValue}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: '2rem' }}>
      <Typography variant="h6">Access Limits</Typography>
      <br />
      <DataGrid
        rows={rows} // Use tab state directly
        columns={columns}
        getRowId={(row) => row.id} // Ensure unique row ID
        processRowUpdate={handleProcessRowUpdate}
        autoHeight
        hideFooter
      />
    </div>
  );
}
