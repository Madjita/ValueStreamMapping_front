import { createSlice, PayloadAction,current } from '@reduxjs/toolkit'
import IDataOrder from '../../Component/Data/IDataOrder'
import { MyCards, OrderMy, useOrdersType } from '../../type/useOrdersType'


/*let initialState: useOrdersType ={
    orders: [],
    loading: true,
    changeList: false,
    error: null
}*/

const useOrdersReducer = createSlice({  
    name: 'orders',  
    initialState: {
        orders: new Array as IDataOrder[],
        orders2: new Array as OrderMy[],
        loading: true,
        changeList: false,
        error: null
    } as useOrdersType,  
    reducers: {       
        fetch_orders(state) {  
            //state.loading = true     
        },
        fetch_orders_success: (state,action) => {   

            var currentState = current(state);

            if(currentState.orders.length === 0 || currentState.orders.length < action.payload.length)
            {
                console.log("sdf =",current(state))

                return {...state, orders: action.payload, loading: false }
            }

            return {...state, orders: action.payload, loading: false }


           /* action.payload.map((item:IDataOrder,index: number )=>{
                if(item.tActual != 0  || item.tActual != null)
                {
                    console.log("fetch_orders_update = " +item.tActual);
                    console.log("fetch_orders_update 2= " +currentState.orders[index].orderRole, item.orderRole );
                    fetch_orders_update(item)
                }
            })*/

            //state.orders = action.payload 
            //state.loading = false     

        },
        fetch_orders_success2(state,action){
            return {...state, orders2: action.payload, loading: false }
        },     
        fetch_orders_error(state, action) {     
            state.loading = false    
            state.error = action.payload    
        },
        fetch_orders_add(state, action){
            console.log("fetch_orders_add =",state,action)
            //state.orders.push(action.payload);
        },
        fetch_orders_update(state, action){
            var currentState = current(state);


           let newData  = currentState.orders.map(o => {
                if (o.id === action.payload.id) {
                  return action.payload;
                }
            }) as IDataOrder[]


            return {...state, orders: newData}
        }   
    },
    /*extraReducers:{

    }*/
})
export default useOrdersReducer.reducer
export const { fetch_orders, fetch_orders_success, fetch_orders_error,fetch_orders_add,fetch_orders_update,fetch_orders_success2 } = useOrdersReducer.actions