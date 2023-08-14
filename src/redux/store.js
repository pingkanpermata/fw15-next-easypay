import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import reducer from "../redux/reducers/index";

export const store = configureStore({
    reducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)