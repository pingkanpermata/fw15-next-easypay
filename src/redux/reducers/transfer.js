import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    amount: null,
    notes: null,
    recipientId: null,
    date: null
}

const transferReducer = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload.amount
            state.notes = action.payload.notes
            state.recipientId = action.payload.recipientId
            state.date = action.payload.date
        },
        resetTransfer: (state, action) => {
            return initialState
        }
    },
    extraReducers: (build) => {
        
    }
})

export const { setAmount, resetTransfer } = transferReducer.actions

export default transferReducer.reducer