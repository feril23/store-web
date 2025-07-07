"use client";

import { useParams } from "next/navigation";
import BookForm from "../../../../components/admin/BookForm";

const EditBookPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <BookForm bookId={id} />;
};

export default EditBookPage;