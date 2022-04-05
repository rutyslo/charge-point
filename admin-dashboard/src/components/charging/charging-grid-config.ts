import {GridOptions} from "ag-grid-community";
import ChargeStatus from "./charge-status";
import CurrentCycle from "./current-cycle";

export const chargingGridOptions: GridOptions = {
  columnDefs: [
    { field: 'stationId', headerName: 'CP ID', maxWidth: 150 },
    { field: 'connectorType' },
    { field: 'status', cellRenderer: ChargeStatus},
    { field: 'estimatedCycles' },
    { field: 'currentCycle', cellRenderer: CurrentCycle },
    { field: 'leaveTime', headerName: 'Pickup Time', minWidth: 200 },
    { field: 'licensePlate' },
    { field: 'maxBattery', headerName: 'Recommended Battery %', minWidth: 230 },
    { field: 'currentBattery', headerName: 'Current Battery %', minWidth: 200 },
  ],
  defaultColDef: {
    // width: 170,
    sortable: true,
    flex: 1,
    resizable: true,
    suppressSizeToFit: true,
    wrapText: true
  },
  rowDragManaged: true,
  suppressMoveWhenRowDragging: true,
  animateRows: true,
  rowClassRules: {
    "is-stopped": (params: any) => {
      return params.data?.status === 0 || params.data?.status === 3;
    },
    "charging": (params: any) => {
      return params.data?.status === 1;
    },
    "discharging": (params: any) => {
      return params.data?.status === 2;
    }
  },
  getRowNodeId: (data: any) => {
    return data.stationId
  }
};
