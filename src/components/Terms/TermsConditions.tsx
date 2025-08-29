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
} from "./term.styles";

const TermsConditions = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "purpose", title: "1. Purpose of the App" },
    { id: "eligibility", title: "2. User Eligibility" },
    { id: "registration", title: "3. Registration & Account Use" },
    { id: "promotions", title: "4. Promotions & Campaigns" },
    { id: "functionality", title: "5. App Functionality" },
    { id: "prizes", title: "6. Prizes & Rewards" },
    { id: "prohibited", title: "7. Prohibited Conduct" },
    { id: "privacy", title: "8. Privacy & Data" },
    { id: "updates", title: "9. Updates & Availability" },
    { id: "termination", title: "10. Termination of Use" },
    { id: "intellectual", title: "11. Intellectual Property" },
    { id: "law", title: "12. Governing Law" },
    { id: "contact", title: "13. Contact Us" },
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
            {sections.map((section) => (
              <SidebarItem
                key={section.id}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>

        {/* Main Content */}
        <ContentArea>
          <Header>Terms & Conditions - Banks Beer App</Header>

          <Section id="intro">
            <SectionText>
              <strong>Effective Date:</strong> August 8, 2025 <br />
              <strong>Last Updated:</strong> August 8, 2025
            </SectionText>
            <SectionText>
              These Terms and Conditions ("Terms") govern your use of the{" "}
              <strong>Banks Beer App</strong> (the “App”), operated by Banks
              Holdings Limited (“Banks”, “we”, “us”, or “our”).
            </SectionText>
            <SectionText>
              By downloading, registering, or using the App, you agree to these
              Terms in full. If you do not agree, do not use the App.
            </SectionText>
          </Section>

          <Section id="purpose">
            <SectionTitle>1. 🎯 Purpose of the App</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Facilitate participation in Banks promotions</li>
              <li>Track loyalty points and campaign entries</li>
              <li>Provide product info, offers, and event updates</li>
              <li>Enhance your overall experience with Banks Beer</li>
            </ul>
          </Section>

          <Section id="eligibility">
            <SectionTitle>2. 👤 User Eligibility</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>You must be 18+ to use the App (per local alcohol laws).</li>
              <li>
                You must be a legal resident of Barbados to enter local
                campaigns.
              </li>
              <li>
                By registering, you confirm the information provided is accurate
                and truthful.
              </li>
            </ul>
          </Section>

          <Section id="registration">
            <SectionTitle>3. 📝 Registration & Account Use</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Register with valid name, email, parish address, and DOB.</li>
              <li>You are responsible for keeping your login details safe.</li>
              <li>
                Banks may suspend/delete accounts that are fraudulent,
                duplicated, or violate these Terms.
              </li>
            </ul>
          </Section>

          <Section id="promotions">
            <SectionTitle>4. 🏆 Promotions & Campaigns</SectionTitle>
            <SectionText>
              Promotional activities are governed by campaign rules (e.g., “Win
              a 2025 DMAX”).
            </SectionText>
            <SectionText>
              Entry may require uploading receipts, scanning QR codes, or
              entering promo codes.
            </SectionText>
            <SectionText>
              Banks reserves the right to modify or cancel promotions without
              notice.
            </SectionText>
          </Section>

          <Section id="functionality">
            <SectionTitle>5. 📱 App Functionality</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Submit entries into promotions</li>
              <li>View accumulated points</li>
              <li>Receive prize/event notifications</li>
              <li>Locate nearby Banks outlets</li>
            </ul>
            <SectionText>
              Some features may depend on your location, device, or network.
            </SectionText>
          </Section>

          <Section id="prizes">
            <SectionTitle>6. 🎁 Prizes & Rewards</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>
                Prizes are non-transferable and cannot be exchanged for cash.
              </li>
              <li>Proof of identity may be required for prize claims.</li>
              <li>Banks’ decision in disputes is final.</li>
            </ul>
          </Section>

          <Section id="prohibited">
            <SectionTitle>7. 🚫 Prohibited Conduct</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Do not provide false or misleading information.</li>
              <li>Do not upload offensive or abusive content.</li>
              <li>Do not hack, manipulate, or misuse the App.</li>
              <li>Do not violate laws or third-party rights.</li>
            </ul>
          </Section>

          <Section id="privacy">
            <SectionTitle>8. 🔐 Privacy & Data</SectionTitle>
            <SectionText>
              Use of the App is governed by our <strong>Privacy Policy</strong>,
              which explains data collection and use.
            </SectionText>
            <SectionText>
              🔗 <em>[Insert link to Privacy Policy here]</em>
            </SectionText>
          </Section>

          <Section id="updates">
            <SectionTitle>9. 🛠️ Updates & Availability</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>The App may be updated with new features or bug fixes.</li>
              <li>Banks does not guarantee uninterrupted service.</li>
              <li>We may modify or suspend functions at any time.</li>
            </ul>
          </Section>

          <Section id="termination">
            <SectionTitle>10. 📵 Termination of Use</SectionTitle>
            <SectionText>
              Banks may suspend or terminate accounts for breaches, fraud,
              abuse, or if the App is discontinued.
            </SectionText>
          </Section>

          <Section id="intellectual">
            <SectionTitle>11. 🧾 Intellectual Property</SectionTitle>
            <SectionText>
              All content (logos, graphics, text, videos, etc.) belongs to Banks
              Holdings Limited and cannot be copied without permission.
            </SectionText>
          </Section>

          <Section id="law">
            <SectionTitle>12. 📍 Governing Law</SectionTitle>
            <SectionText>
              These Terms are governed by the laws of Barbados. Disputes will be
              resolved in the courts of Barbados.
            </SectionText>
          </Section>

          <Section id="contact">
            <SectionTitle>13. 📩 Contact Us</SectionTitle>
            <SectionText>
              Banks Holdings Limited <br />
              📧 <strong>banksbeerpromotions@gmail.com</strong> <br />
              📞 <strong>(246) 230-9047</strong> <br />
              📍 Newton, Christ Church, Barbados
            </SectionText>
          </Section>
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default TermsConditions;
