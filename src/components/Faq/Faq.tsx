import {
  PageContainer,
  Layout,
  Sidebar,
  SidebarList,
  SidebarItem,
  ContentArea,
  Header,
  Section,
  SectionTitle,
  SectionText,
} from "./Fax.styles"; // ✅ reuse the same styles file

const FAQ = () => {
  const faqs = [
    {
      id: "q1",
      question: "1. What is the Banks Beer Website?",
      answer:
        "The Banks Beer Website is your digital companion for all things Banks — from exclusive promotions like the DMAX giveaway, to promotion alerts, points tracking, prize redemption, and much more.",
    },
    {
      id: "q2",
      question: "2. What can I do on the Website?",
      answer: `You can:
      • 📲 Enter promotions
      • 🎁 Track and redeem points
      • 🔔 Get exclusive event invites
      • 🛍️ Access merch offers and discounts
      • 🏆 Claim instant prizes
      • 📸 Scan QR promo codes
      • 🔍 Locate where to buy Banks near you
      • 📰 Stay updated with Banks news and releases`,
    },
    {
      id: "q3",
      question: "3. How do I access the Banks Beer Website?",
      answer:
        'Visit  <a href="https://banksbeerpromotions.com/" target="_blank" rel="noopener noreferrer">  https://banksbeerpromotions.com/</a> on your browser. No download required — simply click the link and follow the setup instructions.',
    },
    {
      id: "q4",
      question: "4. Is it free to use?",
      answer: "Yes — the Banks Beer Website is 100% free to use.",
    },
    {
      id: "q5",
      question: "5. How do I enter the DMAX promotion through the Website?",
      answer: `1. Visit <a href="https://banksbeerpromotions.com/" target="_blank" rel="noopener noreferrer">https://banksbeerpromotions.com/</a> and click login on the homepage.<br>
2. Click “CLICK HERE” under Scan Your Crown To Win Points.<br>
3. Scan the QR code or take a photo of the QR code on the crown and upload the photo.<br>
4. Your entry will be confirmed and points updated instantly.<br>
5. Track entries and points in the ‘My Dashboard’ section.`,
    },
    {
      id: "q6",
      question:
        "6. What if I already entered on the website — should I also use the Website?",
      answer:
        "Yes! The Web App syncs with your promo profile. Using the Web App gives you bonus content, entry status, and live notifications for winners, events, and prize announcements.",
    },
    {
      id: "q7",
      question: "7. Do I need to register?",
      answer:
        "Yes — you’ll need to create a simple profile with name, email, date of birth, and parish. This helps us verify your eligibility and contact you if you win.",
    },
    {
      id: "q8",
      question: "8. Can I track my entries and points?",
      answer:
        "Absolutely. Click “My Dashboard” to view points earned, entries submitted, and instant prize results.",
    },
    {
      id: "q9",
      question: "9. What devices are supported?",
      answer:
        "The Website works on iPhones running iOS 13+ and Android phones running Android 9.0 (Pie)+. Older devices may have reduced functionality.",
    },
    {
      id: "q10",
      question: "10. Is my data safe?",
      answer:
        "Yes. Banks Beer values your privacy. All data is securely stored and used only for promotional purposes under our Privacy Policy.",
    },
    {
      id: "q11",
      question: "11. What if I forget my password?",
      answer:
        "Click Forgot Password” on the login screen and follow prompts to reset via email or SMS.",
    },
    {
      id: "q12",
      question: "12. What if the Web App isn’t working?",
      answer: `Try:
• Refreshing your browser
• Clearing your cache
• Checking your internet connection
• Restarting your phone
If issues continue, contact 📧 banksbeerpromotions@gmail.com or 📞 (246) 230-9047.`,
    },
    {
      id: "q13",
      question: "13. Will there be more promotions on the Website?",
      answer:
        "Yes! Expect future campaigns, merch drops, loyalty programs, and exclusive Banks-only events.",
    },
    {
      id: "q14",
      question: "14. How do I uninstall or delete my account?",
      answer:
        "To permanently delete your account and data, email banksbeerpromotions@gmail.com with your request.",
    },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageContainer>
      <Layout>
        {/* Sidebar Navigation */}
        <Sidebar>
          <SidebarList>
            {faqs.map((faq) => (
              <SidebarItem key={faq.id} onClick={() => scrollToSection(faq.id)}>
                {faq.question}
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>

        {/* Main Content */}
        <ContentArea>
          <Header>Frequently Asked Questions (FAQs)</Header>
          {faqs.map((faq) => (
            <Section key={faq.id} id={faq.id}>
              <SectionTitle>{faq.question}</SectionTitle>
              <SectionText
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </Section>
          ))}
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default FAQ;
