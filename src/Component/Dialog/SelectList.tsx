import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import serverApiHost,{port} from "../../global";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import IDialogAddOrderItem from '../Data/Dialog/IDialogAddOrderItem'
import { useActionProduction } from '../../hooks/useActionProductions';
import { useTypedSelector } from '../../hooks/leftMenuSelector';
import IDataOrder from '../Data/IDataOrder'
/*const currencies = [
  {
    name: 'Продукт 1',
    quantity: 1
  },
  {
    name: 'Продукт 2',
    quantity: 1
  },
  {
    name: 'Продукт 3',
    quantity: 1
  },
  {
    name: 'Продукт 4',
    quantity: 1
  },
];*/

export default function SelectList(props:{data: IDialogAddOrderItem, setData: (product: string, q: number) => void;}) {
  const [product, setProduct] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(0);

  //const {productions, loading} = useTypedSelector(state => state.productions);
  //const {getAllProducts} = useActionProduction()

  const [productions,SetProductions] = React.useState<IDataOrder[]>();
  const [loading, SetLoading] = React.useState(false);

  const getAllProducts = async () =>{
    const response = await axios.get('http://'+serverApiHost+':'+port+'/api/cardVSM/getAllProducts')

    if(response.status === 200)
    {
        let data = response.data as IDataOrder[];
        console.log("Loading finish getAllProducts")
        console.log(data);

        SetProductions(data);
        SetLoading(true);
    }

  }



  React.useEffect(() => {
    getAllProducts();   
  },[])
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setData(event.target.value,quantity) 
    setProduct(event.target.value);
    
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{      
      const re = /^[0-9\b]+$/;    
      if (e.target.value === '' || re.test(e.target.value)) 
      {        
        let n = Number(e.target.value);
        props.setData(product,n)     
        setQuantity(n)
        
      }
   }
   

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="standard-select-currency"
          select
          label="Выбирите"
          value={product}
          onChange={handleChange}
          helperText="Выбирите продукт"
          variant="standard"
          inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
        >
          
          {productions?.length === 0 ? 
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          : productions?.map((option, index) => (
            <MenuItem key={index} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            onChange={onChange}
            autoFocus
            margin="dense"
            id="quantity"
            label="Количество"
            type="quantity"
            fullWidth
            variant="standard"
            value={quantity > 0 ? quantity: ''}
            inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
          />
      </div>
    </Box>
  )}