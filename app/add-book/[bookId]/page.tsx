"use client";

import BookForm from "../../../components/dashboard/BookForm";

export default function page({ params }: { params: { bookId: string } }) {
  return <BookForm adminData={{ id: params.bookId, isAdmin: true }} />;
}
