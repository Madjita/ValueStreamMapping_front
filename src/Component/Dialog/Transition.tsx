import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransitionGroup } from 'react-transition-group';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import DialogAddOrderItem from './DialogAddOrderItem';
import IDataProduction from '../Data/IDataProduction';

import IDialogAddOrderItem from '../Data/Dialog/IDialogAddOrderItem'
import IDialogAddOrder from '../Data/Dialog/IDialogAddOrder'

const ORDERS = new Array() as IDialogAddOrderItem[]

interface RenderItemOptions {
  item: IDialogAddOrderItem;
  handleRemoveProduct: (item: IDialogAddOrderItem) => void;
}

function renderItem({ item, handleRemoveProduct }: RenderItemOptions) {
  if(item ===  undefined || item === null)
  {
    return ;
  }
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveProduct(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item.name} />
      <ListItemText primary={'('+item.quantity+')'} />
    </ListItem>
  );
}

export default function Transition(props:{setNewOrder: (value: IDialogAddOrderItem[]) => void}) {
  const [fruitsInBasket, setFruitsInBasket] = React.useState(new Array as IDialogAddOrderItem[]);

  const handleAddProduct= (item: IDialogAddOrderItem) => {
    setFruitsInBasket((prev) => [...prev, item]);
  };

  props.setNewOrder(fruitsInBasket);
  
  const handleRemoveProduct = (item: IDialogAddOrderItem) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i.name !== item.name)]);
  };

  const addOrderButton = (
    <DialogAddOrderItem handleAddProduct={handleAddProduct}/>
  );

  return (
    <div>
      {addOrderButton}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {fruitsInBasket.map((item,index) => (
              <Collapse key={index}>
                {renderItem({ item, handleRemoveProduct })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
}