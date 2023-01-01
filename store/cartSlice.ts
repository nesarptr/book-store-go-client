import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "./book-slice";

export interface BookCart {
  book: Book;
  quantity: number;
}

const initialState: BookCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload: book }: PayloadAction<Book>) => {
      const bookInd = state.findIndex((cart) => cart.book.id === book.id);
      if (bookInd === -1) {
        state.push({
          book,
          quantity: 1,
        });
      } else {
        state[bookInd].quantity++;
      }
    },
    removeFromCart: (state, { payload: id }: PayloadAction<string>) => {
      const bookInd = state.findIndex((cart) => cart.book.id === id);
      if (bookInd !== -1) {
        if (state[bookInd].quantity > 1) {
          state[bookInd].quantity--;
        } else {
          state.splice(bookInd, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
