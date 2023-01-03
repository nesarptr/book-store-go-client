import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  name: string;
  price: string | number;
  imgURL: string;
  description: string;
}

const initialState: Book[] = [];

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooks: (state, { payload: books }: PayloadAction<Book[]>) => {
      state.unshift(...books);
    },
    addBook: (state, { payload: book }: PayloadAction<Book>) => {
      state.unshift(book);
    },
    updateBook: (state, { payload: updatedBook }: PayloadAction<Book>) => {
      const bookInd = state.findIndex((book) => book.id === updatedBook.id);
      if (bookInd !== -1) {
        state[bookInd] = updatedBook;
      }
    },
    deleteBook: (state, { payload: id }: PayloadAction<string>) => {
      state = state.filter((book) => book.id !== id);
    },
  },
});

export const { addBook, addBooks, deleteBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;
