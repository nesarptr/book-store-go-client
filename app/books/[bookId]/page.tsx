"use client";

import BookDetail from "../../../components/books/BookDetail";

export default function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  return <BookDetail id={bookId} />;
}
