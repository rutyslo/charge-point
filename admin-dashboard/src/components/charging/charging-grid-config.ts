import {GridOptions} from "ag-grid-community";
import ChargeStatus from "./charge-status";
import CurrentCycle from "./current-cycle";
import LeaveTime from "./leave-time";

export const chargingGridOptions: GridOptions = {
  columnDefs: [
    { field: 'stationId', headerName: 'CP ID', maxWidth: 150 },
    { field: 'connectorType' },
    { field: 'status', cellRenderer: ChargeStatus},
    { field: 'estimatedCycles' },
    { field: 'currentCycle', cellRenderer: CurrentCycle },
    { field: 'leaveTime', cellRenderer: LeaveTime, headerName: 'Pickup Time', minWidth: 230 },
    { field: 'licensePlate' },
    { field: 'maxBattery', headerName: 'Recommended Battery %', minWidth: 230 },
    { field: 'currentBattery', headerName: 'Current Battery %', minWidth: 200 },
  ],
  defaultColDef: {
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
      return params.data?.status === 3 || params.data?.status === 4;
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
