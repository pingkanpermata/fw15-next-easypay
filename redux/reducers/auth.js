import {createSlice} from '@reduxjs/toolkit'
// import { registerAction, loginAction } from '../actions/auth'

const initialState = {
    // token: null
    email: ""
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logout: (state, action) => {
        //     return initialState
        // }
        saveEmail: (state, action) =>{
            state.email = action.payload
        }
    },
    // extraReducers: (build) => {
    //     build.addCase(registerAction.fulfilled, (state, {payload}) => {
    //         state.token = payload
    //     })
    //     build.addCase(loginAction.fulfilled, (state, {payload}) => {
    //         state.token = payload
    //     })
    // }
})

// export const { logout } = authReducer.actions
export const {saveEmail} = auth.actions
export default auth.reducer