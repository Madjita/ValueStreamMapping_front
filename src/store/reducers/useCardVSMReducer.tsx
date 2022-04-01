import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useCardVSMType } from '../../type/useCardVSMType'


const initialState: useCardVSMType ={
    cardVSMs: [],
    loading: true,
    error: null
}

const useCardVSMReducer = createSlice({  
    name: 'cardVSM',  
    initialState,  
    reducers: {       
        fetch_cardVSM(state) {  
            state.loading = true     
        },
        fetch_cardVSM_success(state,action) {      
            state.cardVSMs = action.payload;
            state.loading = false; 
        },     
        fetch_cardVSM_error(state, action) {     
            state.loading = false    
            state.error = action.payload    
        },
        fetch_cardVSM_add(state, action){
            //state.productions.push(action.payload);
        }  
    },
})
export default useCardVSMReducer.reducer
export const { 
    fetch_cardVSM, 
    fetch_cardVSM_success, 
    fetch_cardVSM_error,
    fetch_cardVSM_add 
} = useCardVSMReducer.actions