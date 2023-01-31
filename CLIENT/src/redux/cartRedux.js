import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [], //2) Check wheter or not we have products in localStorage, if so we get it, if not, we added as empty array.
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
    : 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;

      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        const cartQuant = (state.products[itemIndex].cartQuantity += 1);
        console.log("cartQuant: ", cartQuant);
        toast.info(`Se ha incrementado ${action.payload.name} en el carro!`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        const pushed = state.products.push(tempProduct); //product= action.payload
        console.log("Pushed:", pushed);
        toast.success(`${action.payload.name} se ha añadido al carro!`, {
          position: "bottom-left",
        });
      }
      //1) First, set products to localStorage, then get i and replace the initial products state above.
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.products?.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = nextCartItems;
      toast.error(`${action.payload.name} se ha removido del carro!`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      return state;
    },
    decreaseCart(state, action) {
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (state.products[itemIndex].cartQuantity > 1) {
        state.products[itemIndex].cartQuantity -= 1;
        toast.info(
          `Disminuyó la cantidad de ${action.payload.name} en el carro!`,
          {
            position: "bottom-left",
          }
        );
      } else if (state.products[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.products?.filter(
          (product) => product._id !== action.payload._id
        );
        state.products = nextCartItems;

        toast.error(`${action.payload.name} se ha removido del carro!`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clearCart(state, action) {
      state.products = [];
      localStorage.setItem("products", JSON.stringify(state.products));
      toast.error(`Se ha vaciado el carro!`, {
        position: "bottom-left",
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.products.reduce(
        (cartTotal, product) => {
          const { price, cartQuantity } = product;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
