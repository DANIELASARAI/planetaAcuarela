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
    const response = await axios.get(`${url}/orders/`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const ordersEdit = createAsyncThunk(
  "orders/ordersEdit",
  async (values, { getState }) => {
    const state = getState();
    let currentOrder = state.orders.list.filter(
      (order) => order._id === values.id
    );
    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status,
    };
    try {
      const response = await axios.put(
        `${url}/orders/${values.id}`,
        newOrder,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const ordersDelete = createAsyncThunk(
  "orders/orderssDelete",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/orders/${id}`, setHeaders());
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
      const updatedOrders = state.list?.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.items = updatedOrders;
      state.editStatus = "success";
      toast.info("Orden actualizada!");
    },
    [ordersEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    [ordersDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [ordersDelete.fulfilled]: (state, action) => {
      const newList = state.items?.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.success("Orden Borrada!");
    },
    [ordersDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default ordersReducer.reducer;
