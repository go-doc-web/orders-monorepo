import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const deleteProductFromOrder = createAsyncThunk(
  "orders/deleteProductFromOrder",
  async (
    { orderId, productId }: { orderId: number; productId: number },
    thunkAPI,
  ) => {
    try {
      await axios.delete(`${API_URL}/orders/${orderId}/products/${productId}`);
      return { orderId, productId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product from order",
      );
    }
  },
);

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Тут будут локальные мутации
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteProductFromOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductFromOrder.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, productId } = action.payload;

        // Находим нужный ордер и фильтруем его массив продуктов
        state.items = state.items.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              products: (order.products || []).filter(
                (p) => p.id !== productId,
              ),
            };
          }
          return order;
        });
      })
      .addCase(deleteProductFromOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
