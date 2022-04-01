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

import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SelectList from './SelectList'
import DialogActions from '@material-ui/core/DialogActions';

import IDialogAddOrderItem from '../Data/Dialog/IDialogAddOrderItem'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: IDialogAddOrderItem;
  onClose: (value: IDialogAddOrderItem) => void;
}




function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const [newData, setNewData] = React.useState<IDialogAddOrderItem>();

  const handleClose = () => {
    onClose(newData as IDialogAddOrderItem);
  };

  const handleCloseCansel = () => {
    onClose(new Object as IDialogAddOrderItem);
  };

  const handleListItemClick = (value: IDialogAddOrderItem) => {
    onClose(value);
  };

  const setData = (product: string, q: number) =>{

    let newObject = {
      name: product,
      quantity: q,
    } as IDialogAddOrderItem

    //console.log("value 2 = ", newObject)
    setNewData(newObject);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Добавить продукт</DialogTitle>
        <SelectList
        data={selectedValue}
        setData={setData}
        />
      <DialogActions>
          <Button onClick={handleCloseCansel}>Отменить</Button>
          <Button onClick={handleClose} autoFocus>
            Добавить
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function DialogAddOrderItem(props:{handleAddProduct: (value: IDialogAddOrderItem) => void}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<IDialogAddOrderItem>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: IDialogAddOrderItem) => {
    setOpen(false);

    if(value != undefined)
    {
      if(value.name != undefined || value.name != null)
      {
        setSelectedValue(value);
        props.handleAddProduct(value)
      }
    }

    //console.log("value = ", value)
  };

  return (
    <div style={{width: '100%'}}>
      <Button 
      variant="outlined"
      onClick={handleClickOpen}
      style={{width: '100%',display:'flext', justifyContent: 'space-around'}}
      endIcon={<AddCircleIcon />}>
        Добавить заказ
      </Button>

      <SimpleDialog
        selectedValue={selectedValue as IDialogAddOrderItem}
        open={open}
        onClose={handleClose}
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