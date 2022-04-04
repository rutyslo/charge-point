import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AgGridReact} from "ag-grid-react";
import './grid-table.scss';
import axios from "axios";
import {BE_URL} from "../../App";

const GridTable = (props: {config: GridOptions, rowData: any[], currentIndex: number}) => {


  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       gridOptions.api!.setRowData(data);
  //       setRowData(data);
  //     });
  // }, []);
   const setCurrentIndex = (rowIndex: any) => {
        axios.post(`${BE_URL}/set-current-index`, { currentIndex : rowIndex })
            .then(response => {
            });
   }

    const getRowStyle = (params : any) => {
        if (params.node.rowIndex === props.currentIndex) {
            return { background: 'rgb(255, 230, 0, 0.3)'};
        }
    };


  return (
    <div className={'grid-table ag-theme-alpine'}>
      <AgGridReact
        domLayout={'normal'}
        onRowClicked={(e) => setCurrentIndex(e.rowIndex)}
        getRowStyle={getRowStyle}
        gridOptions={props.config}
        rowData={props.rowData}
        immutableData={true}
      />
    </div>
  );
};

export default GridTable;