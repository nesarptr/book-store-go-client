import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  name: string;
  owner: string;
  price: string | number;
  imgURL: string;
  description: string;
}

const initialState: { books: Book[] } = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooks: (state, { payload: books }: PayloadAction<Book[]>) => {
      state.books = books;
    },
    addBook: (state, { payload: book }: PayloadAction<Book>) => {
      state.books.unshift(book);
    },
    updateBook: (state, { payload: updatedBook }: PayloadAction<Book>) => {
      const bookInd = state.books.findIndex(
        (book) => book.id == updatedBook.id
      );
      if (bookInd !== -1) {
        state.books[bookInd] = updatedBook;
      }
    },
    deleteBook: (state, { payload: id }: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
});

export const { addBook, addBooks, deleteBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;
