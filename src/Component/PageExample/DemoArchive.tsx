import * as React from 'react';

import { DataGrid, GridColDef, GridValueGetterParams,GridRenderCellParams } from '@mui/x-data-grid';
/*import {
  DataGridPro,
  GridApiRef,
  GridColumns,
  gridColumnVisibilityModelSelector,
  GridEvents,
  GridRowGroupingModel,
  useGridApiRef,
  GridColDef,
  GridRowModel
} from '@mui/x-data-grid-pro';*/

import moment from 'moment';
import Order_view,{OrderProduction_view} from '../Data/IDataOrder/IDataOrder';

import OrderRole from '../Data/OrderRole';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import Button from '@mui/material/Button';

import axios from 'axios';
import ip,{port} from "../../global";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const DemoArchive = (props:{orders?: Order_view[], view: string, startSimulation?: (name: string, sim: boolean) => Promise<void> }) => {
  
  //const [tableData, setTableData] = React.useState<Order_view[]>(props.orders != undefined ? props.orders : [])

  if(props.orders == undefined)
  {
    return <div></div>
  }

  if(props.orders?.length > 0 )
  {
    props.orders?.forEach((element, i) => {
          element.id = i+1;
    });
  }


  const splitTime = (time: string) => {

    return (
      <div>
      {time.split(' ').map((item,index) => {
         return <p key={index} style={{marginBottom: '0', marginTop: '0'}}>{item}</p>
      })}
      </div>
    )
  }

  const  GetOrderRole = (item:OrderRole ) =>{

    let icon = null;

    switch(item)
    {
        case OrderRole.ArchiveBad:
          icon = <CloseIcon/>
            break;
        case OrderRole.ArchiveGood:
          icon = <DoneIcon/>
            break;
        default:
            break;
    }

    return icon;

  }

  const GetStringDataTime = (item: moment.Moment ) : string =>  {

    let d = item.format('MM/DD/YYYY').split('/');
    let t = item.format('HH:mm:ss').split(':');
    let dataTime = d[2] + "-" + d[1] + "-" + d[0] + "T"+ t[0] +":"+t[1];

    //console.log("dataTime =",dataTime)

    return dataTime
  }





  const getGridDef = (v : string ) => {
   let columns: GridColDef[] = [];

    switch(v)
    {
      case 'archive':
        
        columns = [
          { field: 'id', headerName: '№', width: 90 },
          {
            field: 'name',
            headerName: 'Заказ',
            width: 120,
            minWidth: 120, 
            maxWidth: 150,
            editable: false,
          },
          {
            field: 'limitation',
            headerName: 'Срок',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.value).format('MM/DD/YYYY HH:mm:ss'))
              )
             
          },
          {
            field: 'tStart',
            headerName: 'Добавлен',
            type: 'number',
            width: 120,
            minWidth: 120, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
                splitTime( moment(params?.row.tStart).format('MM/DD/YYYY HH:mm:ss'))
              )
          },
         
          {
            field: 'tPlan',
            headerName: 'План',
            type: 'number',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.row.tStart).add(params?.value, 'seconds').format('MM/DD/YYYY HH:mm:ss'))
             )
          },
          
          {
            field: 'tFuture',
            headerName: 'Прогноз',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.row.tStart).add(params?.value, 'seconds').format('MM/DD/YYYY HH:mm:ss'))
              )
          },
          {
            field: 'tFuture2',
            headerName: 'Прогноз временной',
            width: 160,
            minWidth: 160, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => (
              splitTime( moment.unix(params?.row.tFuture).utc().format('HH:mm:ss'))
              )
          },
          {
            field: 'tStop',
            headerName: 'Завершился',
            width: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.row.tStop).format('MM/DD/YYYY HH:mm:ss'))
              )
          },
          {
            field: 'tActual',
            headerName: 'Завершился за',
            width: 150,
            minWidth: 150, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => (
              splitTime( moment.unix(params?.row.tActual).utc().format('HH:mm:ss'))
              )
          },
          {
            field: 'orderProduction_views',
            headerName: 'Количество продуктов',
            width: 160,
            minWidth: 160, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => {

              let items =  params?.value as OrderProduction_view[]

              let list = items.map((item,index) => {

                return <p key={index} style={{marginBottom: '0', marginTop: '0'}} >{item.name + " ( " + item.orderProductionItems.length + ' )'} </p>
              })
              
              return (
                  <div>
                    {list}
                  </div>
              )
             
            }
          },
          {
            field: 'orderRole',
            headerName: 'Статус',
            width: 150,
            minWidth: 150, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => (
              GetOrderRole(params?.value)
              )
          },
          
          
          /*
          {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
              `${params.getValue(params.id, 'orderName') || ''} ${
                params.getValue(params.id, 'limitation') || ''
              }`,
          },*/
        ];
      

        break;
      case 'prepair':



        columns = [
          { field: 'id', headerName: '№', width: 90 },
          {
            field: 'name',
            headerName: 'Заказ',
            width: 120,
            minWidth: 120, 
            maxWidth: 150,
            editable: false,
          },
          {
            field: 'limitation',
            headerName: 'Срок',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.value).format('MM/DD/YYYY HH:mm:ss'))
              )
          },
          {
            field: 'tAdd',
            headerName: 'Добавлен',
            type: 'number',
            width: 120,
            minWidth: 120, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
                splitTime( moment(params?.value).format('MM/DD/YYYY HH:mm:ss'))
              )
          },
         
          {
            field: 'tPlan',
            headerName: 'План',
            type: 'number',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.row.tAdd).add(params?.value, 'seconds').format('MM/DD/YYYY HH:mm:ss'))
             )
          },
          {
            field: 'tFuture',
            headerName: 'Прогноз',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => (
              splitTime( moment(params?.row.tAdd).add(params?.value, 'seconds').format('MM/DD/YYYY HH:mm:ss'))
              )
          },
          {
            field: 'tFuture2',
            headerName: 'Прогноз временной',
            width: 160,
            minWidth: 160, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => (
              splitTime( moment.unix(params?.row.tFuture).utc().format('HH:mm:ss'))
              )
          },
          {
            field: 'orderProduction_views',
            headerName: 'Количество продуктов',
            width: 160,
            minWidth: 160, 
            maxWidth: 200,
            editable: true,
            renderCell: (params) => {

              let items =  params?.value as OrderProduction_view[]

              let list = items.map((item,index) => {

                return <p key={index} style={{marginBottom: '0', marginTop: '0'}} >{item.name + " ( " + item.orderProductionItems.length + ' )'} </p>
              })
              
              return (
                  <div>
                    {list}
                  </div>
              )
             
            }
          },
          {
            field: 'orderRole',
            headerName: 'Статус',
            width: 100,
            minWidth: 100, 
            maxWidth: 150,
            editable: true,
            renderCell: (params) => {

              if(moment(params?.row.tAdd).add(params?.row.tFuture, 'seconds').isBefore(params?.row.limitation))
              {
                return <DoneIcon/>;
              }
              else
              {
                return <CloseIcon/>
              }

            }
          },
          {
            field: 'simulation',
            headerName: 'Запустить симуляцию',
            width: 200,
            minWidth: 200, 
            maxWidth: 250,
            editable: true,
            renderCell: (params) => {

              if(props.startSimulation != undefined)
                {
                  return  <Button variant="outlined" size="small" onClick={  async () => {  await props.startSimulation?.call(null,params?.row.name, true); } }>
                  Запустить симуляцию
                </Button>
                }

            }
          }
          
        ];
      

        break;
    }

    return columns;
  }







  const convertToTime = (t: number) =>
  {
    return moment.unix(t).utc().format('H:m:s')
  }
  

  return (
    <div style={{ height: '700px', width: '100%' }}>
      {/*<DataGridPro
        
        columns={getGridDef(props.view)}
        rows={props.orders}

        treeData
        getTreeDataPath={getChildRows}

        pageSize={50}
        rowsPerPageOptions={[50]}
        //checkboxSelection
      />*/}

      <DataGrid
        columns={getGridDef(props.view)}
        rows={props.orders}

        pageSize={10}
        rowsPerPageOptions={[10]}
        //checkboxSelection
        disableSelectionOnClick
      />
      
    </div>
  );
}
export default DemoArchive;