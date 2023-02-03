import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "./book-slice";

export interface BookCart {
  book: Book;
  quantity: number;
}

const initialState: { bookCart: BookCart[] } = {
  bookCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, { payload: newCart }: PayloadAction<BookCart[]>) => {
      state.bookCart = newCart;
    },
    addToCart: (state, { payload: book }: PayloadAction<Book>) => {
      const bookInd = state.bookCart.findIndex(
        (cart) => cart.book.id == book.id
      );
      if (bookInd === -1) {
        state.bookCart.push({
          book,
          quantity: 1,
        });
      } else {
        state.bookCart[bookInd].quantity++;
      }
    },
    removeFromCart: (state, { payload: id }: PayloadAction<string>) => {
      const bookInd = state.bookCart.findIndex((cart) => cart.book.id == id);
      if (bookInd !== -1) {
        if (state.bookCart[bookInd].quantity > 1) {
          state.bookCart[bookInd].quantity--;
        } else {
          state.bookCart.splice(bookInd, 1);
        }
      }
    },
  },
});

export const { replaceCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
