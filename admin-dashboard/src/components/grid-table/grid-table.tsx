import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AgGridReact} from "ag-grid-react";
import './grid-table.scss';

const GridTable = (props: {config: GridOptions, rowData: any[]}) => {


  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       gridOptions.api!.setRowData(data);
  //       setRowData(data);
  //     });
  // }, []);

  return (
    <div className={'grid-table ag-theme-alpine'}>
      <AgGridReact
        domLayout={'normal'}
        gridOptions={props.config}
        rowData={props.rowData}
        immutableData={true}
      />
    </div>
  );
};

export default GridTable;