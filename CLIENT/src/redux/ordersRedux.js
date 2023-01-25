import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../slices/api";
import { setHeaders } from "./api";

const initialState = {
  list: [],
  status: null,
};

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
  try {
    const response = await axios.get(`${url}/orders`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const ordersEdit = createAsyncThunk(
  "orders/ordersEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
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

const ordersReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [ordersEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [ordersEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.list?.map((product) =>
        product._id === action.payload.Id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";
      toast.info("Producto actualizado!");
    },
    [ordersEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default ordersReducer.reducer;
