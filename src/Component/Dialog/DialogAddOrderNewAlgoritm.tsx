import * as React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

//import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Transition from './Transition'
import DialogActions from '@material-ui/core/DialogActions';

import IDialogAddOrder,{IData, IDataTime, ITime} from '../Data/Dialog/IDialogAddOrder'
import IDialogAddOrderItem from '../Data/Dialog/IDialogAddOrderItem'
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TextField from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import Divider from '@mui/material/Divider';

import moment from 'moment'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: IDialogAddOrder;
  onClose: (value: IDialogAddOrder) => void;
  addOrder: (value: IDialogAddOrder) => void
}



function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open,addOrder } = props;

  const [newOrder, setNewOrder] = React.useState<IDialogAddOrderItem[]>();
  const [order, setOrder] = React.useState<IDialogAddOrder>();

  const handleClose = () => {
    onClose(selectedValue);


    let update = {...order, products: newOrder as  IDialogAddOrderItem[]} as IDialogAddOrder
    setOrder(update)


    addOrder(update)
  };

  
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, name: event.target.value} as IDialogAddOrder)
  };

  const handleChangePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, priority: Number(event.target.value)} as IDialogAddOrder)
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    let arrayDataTime = splitString(event.target.value, "T");

    let arrayData = arrayDataTime[0].split("-");
    let arrayTime = arrayDataTime[1].split(":");


    let DataTime = new Object as IDataTime;


    let itime = new Object as ITime;
    itime.hour =  arrayTime[0];
    itime.minute =  arrayTime[1];

    let idata = new Object as IData;
    idata.year =  arrayData[0];
    idata.month =  arrayData[1];
    idata.day =  arrayData[2];

    DataTime.data = idata;
    DataTime.time = itime;

    setOrder({...order, finishTime: DataTime} as IDialogAddOrder)

  };

  const splitString = (stringToSplit: string, separator: string) => {
    var arrayOfStrings = stringToSplit.split(separator);
  
    //console.log('Оригинальная строка: "' + stringToSplit + '"');
    //console.log('Разделитель: "' + separator + '"');
    //console.log('Массив содержит ' + arrayOfStrings.length + ' элементов: ' + arrayOfStrings.join(' / '));


    //var dateParts = arrayOfStrings[0].split("-") as any;
    //var date = new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);

    //console.log("dateParts = " + dateParts);
    //console.log("data = " + date);

    return arrayOfStrings;
  }




  const [value, setValue] = React.useState<Date | null>(new Date());


  return (
    <Dialog open={open}>
      <DialogTitle>Формирование заказа
      
      </DialogTitle>

      {/*<LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
        </LocalizationProvider>*/}

     

      <TextField
            onChange={handleChangeName}
            autoFocus
            margin="dense"
            id="name"
            label="Название заказа"
            type="name"
            fullWidth
            variant="standard"
            inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
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
            inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
      />

      <TextField
        id="datetime-local"
        label="Срок"
        type="datetime-local"
        defaultValue="2022-01-17T12:00"
        sx={{ width: 250, margin: '20px' }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeTime}
      /> 
     

      <Transition setNewOrder={setNewOrder}/>
      <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleClose} autoFocus>
            Сформировать
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function DialogAddOrderNewAlgoritm(props:{addOrder: (value: IDialogAddOrder) => void}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<IDialogAddOrder>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div style={{width: '100%'}}>
      <Button 
      variant="contained" 
      size="small"
      onClick={handleClickOpen}
      startIcon={<AddCircleOutlineIcon  fontSize="small"/>}>
        Добавить заказ
      </Button>

      <SimpleDialog
        selectedValue={selectedValue as IDialogAddOrder}
        open={open}
        onClose={handleClose}
        addOrder={props.addOrder}
      />
    </div>
  );
}

/*

    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>

*/