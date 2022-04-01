import  React from 'react'
import TextField from '@material-ui/core/TextField';
import {useLocation, useHistory} from 'react-router'

import IDataOrder from '../Data/IDataOrder';


import MenuItem from '@material-ui/core/MenuItem';
import OrderRole from '../Data/OrderRole';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { useActionOrders } from '../../hooks/useActionOrders';
import { useTypedSelector } from '../../hooks/leftMenuSelector';
import IDialogAddOrder from '../Data/Dialog/IDialogAddOrder';

interface stateType{
  data: IDataOrder
}




const PageInformationAboutOrder = () =>
{
  const location = useLocation<stateType>()
  const history = useHistory()

  const [data, setData] = React.useState<IDataOrder>();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.value != undefined)
    {
      let obj = {...data};
      obj.name = event.target.value;
      setData(obj as IDataOrder)
    }
   
  };

  const handleChangePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if(event.target.value != undefined)
    {
      let obj = {...data};
      obj.priority = Number(event.target.value);
      setData(obj as IDataOrder)
    }

  };

  const handleChangeOrderRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value != undefined)
    {
      let obj = {...data};
      let name = event.target.value;
      
      switch(name)
      {
        case "Актуальный":
          obj.orderRole = OrderRole.Actual;
          break;
        case "В работе":
          obj.orderRole = OrderRole.Work;
          break;
        case "Архив Правильный":
          obj.orderRole = OrderRole.ArchiveGood;
          break;
        case "Архив Плохой":
          obj.orderRole = OrderRole.ArchiveBad;
          break;
        case "Остановлен":
          obj.orderRole = OrderRole.Stoped;
        break;
      }
      //let obj = {...data};
      //obj.orderRole = Number(event.target.value);
      setData(obj as IDataOrder)
    }
  };



  // Helper
const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

// Turn enum into array
function ToArray(enumme: any) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
}
  
let listRole = ["Актуальный", 'В работе', 'Архив Правильный','Архив Плохой','Остановлен'];

const {orders, loading} = useTypedSelector(state => state.orders);
const {orderUpdate} = useActionOrders()


const onBack = () => {
  history.goBack();
}

const onSave = () => {
  orderUpdate(data as IDataOrder,location.state.data);
  onBack();
}
  
  if(location.state.data != null)
  {
    if(data === undefined)
    {
      setData(location.state.data);
      return <p>Загрузка</p>
    }

    return (
      <div style={{padding: '50px'}}>
         <TextField
          onChange={handleChangeName}
          autoFocus
          margin="dense"
          id="name"
          label="Название"
          type="name"
          fullWidth
          variant="standard"
          value={data?.name}
        />
        <TextField
          onChange={handleChangePriority}
          autoFocus
          margin="dense"
          id="priority"
          label="Приоритет"
          type="priority"
          fullWidth
          variant="standard"
          value={data?.priority}
        />

        <TextField
          id="standard-select-currency"
          select
          label="Выбирите роль"
          value={listRole[data?.orderRole-1]}
          onChange={handleChangeOrderRole}
          helperText=""
          variant="standard"
        >
          
          { listRole.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <DialogActions>
          <Button onClick={onBack}>Отменить</Button>
          <Button onClick={onSave}>Сохранить</Button>
      </DialogActions>
      </div>
  )   

  }

  return <p>Нет данных</p>

  
}

export default PageInformationAboutOrder;

 