import { api } from '../../lib/supabase';
import ContactClient from '../../components/ContactClient';

export const revalidate = 3600; // 1 hour ISR

async function getContactData() {
  try {
    const faqsRes = await api.getFAQs();
    const settingsRes = await api.getSiteSettings();
    return {
      faqs: faqsRes.data || [],
      siteSettings: settingsRes.data || null,
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      faqs: [],
      siteSettings: null,
    };
  }
}

const ContactPage = async () => {
  const { faqs, siteSettings } = await getContactData();

  return <ContactClient faqs={faqs} siteSettings={siteSettings} />;
};

export default ContactPage;
