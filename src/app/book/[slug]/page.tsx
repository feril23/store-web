import { api, Book } from '../../../lib/supabase';
import BookDetailClient from '../../../components/BookDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // 1 hour ISR

interface BookDetailPageProps {
  params: { slug: string };
}

async function getBookData(slug: string) {
  try {
    const bookRes = await api.getBooks(); // In a real app, you'd have a getBookBySlug method
    const book = bookRes.data?.find((b: Book) => b.slug === slug) || null;

    if (!book) {
      return { book: null, bonuses: [] };
    }

    const bonusRes = await api.getBonusEbooks();
    const bonuses = bonusRes.data?.filter(b => b.linked_book_id === book.id) || [];

    return { book, bonuses };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return { book: null, bonuses: [] };
  }
}

// This function generates static pages at build time
export async function generateStaticParams() {
  const res = await api.getBooks();
  const books = res.data || [];
  return books.map((book) => ({
    slug: book.slug,
  }));
}

const BookDetailPage = async ({ params }: BookDetailPageProps) => {
  const { book, bonuses } = await getBookData(params.slug);

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} bonuses={bonuses} />;
};

export default BookDetailPage;
