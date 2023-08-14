import { createAsyncThunk } from "@reduxjs/toolkit";
import http from '../../helpers/http'

export const getProfile = createAsyncThunk('/profile', async (token) => {
    try {
        const {data} = await http(token).get('/profile')
        return data.results
    } catch (err) {
        console.log(err)
    }
})