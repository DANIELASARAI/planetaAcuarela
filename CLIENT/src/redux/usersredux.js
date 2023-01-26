import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../slices/api";
import { setHeaders } from "./api";

const initialState = {
  list: [],
  status: null,

  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${url}/users/`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const usersCreate = createAsyncThunk(
  "users/usersCreate",
  async (values) => {
    try {
      const response = await axios.post(
        "https://planeta-acuarela.vercel.app/api/users",
        values,
        setHeaders()
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const usersEdit = createAsyncThunk("users/usersEdit", async (values) => {
  try {
    const response = await axios.put(
      `${url}/users/${values.product._id}`,
      values,
      setHeaders()
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data);
  }
});
export const usersDelete = createAsyncThunk("users/usersDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, { position: "bottom-left" });
  }
});

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [usersCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [usersCreate.fulfilled]: (state, action) => {
      state.list.push(action.payload);
      state.createStatus = "success";
      toast.success("Product Created!");
    },
    [usersCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [usersEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [usersEdit.fulfilled]: (state, action) => {
      const updatedusers = state.list?.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.list = updatedusers;
      state.editStatus = "success";
      toast.info("Producto actualizado!");
    },
    [usersEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    [usersDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [usersDelete.fulfilled]: (state, action) => {
      const newList = state.list?.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
      toast.error("Usuario Borrado!", { position: "bottom-left" });
    },
    [usersDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default usersReducer.reducer;
