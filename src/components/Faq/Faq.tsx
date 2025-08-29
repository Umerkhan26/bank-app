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
      question: "1. What is the Banks Beer App?",
      answer:
        "The Banks Beer App is your digital companion for all things Banks — from exclusive promotions like the DMAX giveaway, to promotion alerts, points tracking, prize redemption, and much more.",
    },
    {
      id: "q2",
      question: "2. What can I do on the app?",
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
      question: "3. How do I download the Banks Beer App?",
      answer:
        "The app is available on Apple App Store (iOS) and Google Play Store (Android). Search 'Banks Beer App', tap Download, and follow setup instructions.",
    },
    {
      id: "q4",
      question: "4. Is it free to use?",
      answer: "Yes — the Banks Beer App is 100% free to download and use.",
    },
    {
      id: "q5",
      question: "5. How do I enter the DMAX promotion through the app?",
      answer: `1. Open the app and tap “Win a DMAX” on the homepage.
2. Scan the QR code or upload a receipt showing your Banks purchase.
3. Your entry will be confirmed and points updated instantly.
4. Track entries and points in the ‘My Dashboard’ section.`,
    },
    {
      id: "q6",
      question:
        "6. What if I already entered on the website — should I also use the app?",
      answer:
        "Yes! The app syncs with your promo profile. Using the app gives you bonus content, entry status, and live notifications for winners, events, and prize announcements.",
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
        "Absolutely. Tap “My Dashboard” to view points earned, entries submitted, and instant prize results.",
    },
    {
      id: "q9",
      question: "9. What devices are supported?",
      answer:
        "The app works on iPhones running iOS 13+ and Android phones running Android 9.0 (Pie)+. Older devices may have reduced functionality.",
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
        "Tap “Forgot Password” on the login screen and follow prompts to reset via email or SMS.",
    },
    {
      id: "q12",
      question: "12. What if the app isn’t working?",
      answer: `Try:
• Restarting your phone
• Updating the app
• Checking your internet
If issues continue, contact 📧 banksbeerpromotions@gmail.com or 📞 (246) 230-9047.`,
    },
    {
      id: "q13",
      question: "13. Will there be more promotions on the app?",
      answer:
        "Yes! Expect future campaigns, merch drops, loyalty programs, and exclusive Banks-only events.",
    },
    {
      id: "q14",
      question: "14. How do I uninstall or delete my account?",
      answer:
        "You can uninstall via phone settings. To permanently delete your account and data, email banksbeerpromotions@gmail.com with your request.",
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
              <SectionText style={{ whiteSpace: "pre-line" }}>
                {faq.answer}
              </SectionText>
            </Section>
          ))}
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default FAQ;
