import {GridOptions} from "ag-grid-community";
import ChargeStatus from "./charge-status";

export const chargingGridOptions: GridOptions = {
  columnDefs: [
    { field: 'status', cellRenderer: ChargeStatus },
    { field: 'stationId' },
    { field: 'connectorType', width: 250 },
    { field: 'licensePlate', width: 250 },
    { field: 'currentBattery', headerName: 'Current battery %' },
    { field: 'maxBattery', headerName: 'Max battery %' },
    { field: 'leaveTime', headerName: 'Leave time', width: 300 },
  ],
  defaultColDef: {
    width: 170,
    sortable: true,
    flex: 1,
    resizable: true,
    suppressSizeToFit: true
  },
  rowDragManaged: true,
  suppressMoveWhenRowDragging: true,
  animateRows: true,
  rowClassRules: {
    "is-stopped": (params: any) => {
      return params.data?.status === 0;
    }
  },
  getRowNodeId: (data: any) => {
    return data.stationId
  }
};
