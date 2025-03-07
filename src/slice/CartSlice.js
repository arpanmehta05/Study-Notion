import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalitem: localStorage.getItem("totalitem")
    ? JSON.parse(localStorage.getItem("totalitem"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addtoCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }
      state.cart.push(course);
      state.totalitem++;
      state.total += course.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalitem", JSON.stringify(state.totalitem));
      toast.success("Course added to cart");
    },
    removeCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);
      if (index >= 0) {
        state.totalitem--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalitem", JSON.stringify(state.totalitem));
        toast.success("Course removed");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalitem = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalitem");
    },
  },
});

export const { addtoCart, removeCart, resetCart } = cartSlice.actions;
export default cartSlice;
