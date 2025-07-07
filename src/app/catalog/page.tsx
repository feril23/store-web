import { api } from '../../lib/supabase';
import CatalogClient from '../../components/CatalogClient';

export const revalidate = 3600; // 1 hour ISR

async function getCatalogData() {
  try {
    const booksRes = await api.getBooks();
    const categoriesRes = await api.getCategories();
    return {
      books: booksRes.data || [],
      categories: categoriesRes.data || [],
    };
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    return {
      books: [],
      categories: [],
    };
  }
}

const CatalogPage = async () => {
  const { books, categories } = await getCatalogData();

  return <CatalogClient books={books} categories={categories} />;
};

export default CatalogPage;
