import { api } from "../../lib/supabase";
import FaqClient from "../../components/FaqClient";

export const revalidate = 3600; // 1 hour ISR

async function getFaqsData() {
  try {
    const faqsRes = await api.getFAQs();
    const settingsRes = await api.getSiteSettings();
    return {
      faqs: faqsRes.data || [],
      siteSettings: settingsRes.data || null,
    };
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return {
      faqs: [],
      siteSettings: null,
    };
  }
}

const FaqPage = async () => {
  const { faqs, siteSettings } = await getFaqsData();

  return <FaqClient faqs={faqs} siteSettings={siteSettings} />;
};

export default FaqPage;
