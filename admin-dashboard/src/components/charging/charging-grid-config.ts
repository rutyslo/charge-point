import {GridOptions} from "ag-grid-community";
import ChargeStatus from "./charge-status";
import CurrentCycle from "./current-cycle";
import StationId from "./station-id";

export const getChargingGridOptions = (props: any): GridOptions => {

  return {
    columnDefs: [
      { field: 'stationId', headerName: 'CP ID', maxWidth: 90, cellRenderer: StationId, cellRendererParams: props },
      { field: 'status', cellRenderer: ChargeStatus },
      { field: 'estimatedCycles' },
      { field: 'currentCycle', cellRenderer: CurrentCycle },
      { field: 'leaveTime', headerName: 'Pickup Time', minWidth: 220 },
      { field: 'attuid', headerName: 'Car AT&T ID', minWidth: 100 },
      { field: 'licensePlate', minWidth: 130 },
      { field: 'maxBattery', headerName: 'Recommended Battery %', minWidth: 150 },
      { field: 'currentBattery', headerName: 'Current Battery %', minWidth: 150 }
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
      },
      "waiting-for-pickup": (params: any) => {
        return params.data?.status === 4;
      },
      "earlier-pickup": (params: any) => {
        return params.data?.status === 5;
      },
    },
    getRowNodeId: (data: any) => {
      return data.stationId
    }
  }
};
