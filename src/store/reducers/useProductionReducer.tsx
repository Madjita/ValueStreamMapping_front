import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useProductionType } from '../../type/useProductionType'


const initialState: useProductionType ={
    productions: [],
    loading: true,
    error: null
}

const useProductionReducer = createSlice({  
    name: 'productions',  
    initialState,  
    reducers: {       
        fetch_productions(state) {  
            state.loading = true     
        },
        fetch_productions_success(state,action) {      
            state.productions = action.payload;
            state.loading = false; 
        },     
        fetch_productions_error(state, action) {     
            state.loading = false    
            state.error = action.payload    
        },
        fetch_productions_add(state, action){
            state.productions.push(action.payload);
        }  
    },
})
export default useProductionReducer.reducer
export const { 
    fetch_productions, 
    fetch_productions_success, 
    fetch_productions_error,
    fetch_productions_add 
} = useProductionReducer.actions