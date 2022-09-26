import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";

export default combineReducers({
  stableReducer,
  listReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});
