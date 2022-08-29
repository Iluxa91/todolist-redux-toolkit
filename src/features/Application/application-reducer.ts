import {authAPI} from "../../api/todolists-api"
import {authActions} from "../Auth"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {appActions} from "../CommonActions/App"
import {handleAsyncServerAppError} from "../../utils/error-utils";

const initializeApp = createAsyncThunk("application/initializeApp", async (param, thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(authActions.setIsLoggedIn({value: true}))
    } else {
        handleAsyncServerAppError(res.data, thunkAPI, false)
    }
})

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
