import {combineReducers} from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import profileSlice from '../slice/ProfileSlice'
import cartSlice from '../slice/CartSlice'
import courseSlice from '../slice/courseSlice'


const rootReducer = combineReducers({
    auth:authSlice.reducer,
    profile:profileSlice.reducer,
    cart:cartSlice.reducer,
    course:courseSlice.reducer
})
export default rootReducer