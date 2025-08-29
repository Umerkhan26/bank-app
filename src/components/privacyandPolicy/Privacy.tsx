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
} from "./privacy.styles";

const Privacy = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "collection", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Use Your Information" },
    { id: "marketing", title: "3. Marketing & Notifications" },
    { id: "protection", title: "4. How We Protect Your Data" },
    { id: "sharing", title: "5. When We Share Your Data" },
    { id: "storage", title: "6. Data Storage & Retention" },
    { id: "age", title: "7. Age Restrictions" },
    { id: "rights", title: "8. Your Rights" },
    { id: "links", title: "9. Third-Party Links" },
    { id: "updates", title: "10. Changes to This Policy" },
    { id: "contact", title: "11. Contact Us" },
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
          <Header>Privacy Policy - Banks Beer App</Header>

          <Section id="intro">
            <SectionText>
              <strong>Effective Date:</strong> August 8, 2025 <br />
              <strong>Last Updated:</strong> August 8, 2025
            </SectionText>
            <SectionText>
              Banks Holdings Limited (“we,” “our,” or “us”) values your privacy.
              This Privacy Policy explains how we collect, use, store, and
              protect your personal information when you use the{" "}
              <strong>Banks Beer App</strong> (the “App”).
            </SectionText>
            <SectionText>
              By using the App, you agree to the terms of this Privacy Policy.
            </SectionText>
          </Section>

          <Section id="collection">
            <SectionTitle>1. 📋 Information We Collect</SectionTitle>
            <SectionText>
              We collect the following types of information:
            </SectionText>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>
                <strong>Personal Information:</strong> Name, Email, Date of
                birth, Parish/Location, Device ID
              </li>
              <li>
                <strong>Promotional Data:</strong> Promo codes, Campaign
                entries, Points, QR scans, Prize redemptions
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> Device details, IP
                address, Geolocation (with permission), App usage patterns,
                Crash logs
              </li>
            </ul>
          </Section>

          <Section id="usage">
            <SectionTitle>2. 🛠️ How We Use Your Information</SectionTitle>
            <SectionText>We use your data to:</SectionText>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Enable and manage campaign participation</li>
              <li>Send real-time updates and push notifications</li>
              <li>Improve app performance and experience</li>
              <li>Personalize promotions and content</li>
              <li>Respond to customer support queries</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </Section>

          <Section id="marketing">
            <SectionTitle>3. 📢 Marketing & Notifications</SectionTitle>
            <SectionText>
              By registering, you may receive campaign announcements, prize
              alerts, app updates, and invitations to Banks events.
            </SectionText>
            <SectionText>
              You can opt out via device settings or email unsubscribe links.
            </SectionText>
          </Section>

          <Section id="protection">
            <SectionTitle>4. 🛡️ How We Protect Your Data</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Encrypted connections (HTTPS)</li>
              <li>Secure servers</li>
              <li>Password-protected admin access</li>
              <li>Role-based internal data access</li>
            </ul>
            <SectionText>
              We do <strong>not</strong> sell or share your information with
              third-party marketers.
            </SectionText>
          </Section>

          <Section id="sharing">
            <SectionTitle>5. 🤝 When We Share Your Data</SectionTitle>
            <SectionText>Data may only be shared with:</SectionText>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Authorized Banks Holdings Limited personnel</li>
              <li>
                Technology providers (hosting, CRM, analytics) under strict
                confidentiality
              </li>
              <li>Legal authorities if required by law</li>
            </ul>
          </Section>

          <Section id="storage">
            <SectionTitle>6. 🌍 Data Storage & Retention</SectionTitle>
            <SectionText>
              Your data is stored securely within the region or trusted cloud
              environments. We keep it only as long as necessary for campaigns,
              compliance, or improvements. You may request deletion anytime.
            </SectionText>
          </Section>

          <Section id="age">
            <SectionTitle>7. 👶 Age Restrictions</SectionTitle>
            <SectionText>
              The App is intended for users <strong>18+</strong>, in accordance
              with alcohol and promotional laws. We do not knowingly collect
              data from minors.
            </SectionText>
          </Section>

          <Section id="rights">
            <SectionTitle>8. 🔄 Your Rights</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Access your personal data</li>
              <li>Correct inaccuracies</li>
              <li>Withdraw consent to marketing</li>
              <li>Request account & data deletion</li>
            </ul>
            <SectionText>
              📧 Contact: <strong>banksbeerpromotions@gmail.com</strong>
            </SectionText>
          </Section>

          <Section id="links">
            <SectionTitle>9. ⚙️ Third-Party Links</SectionTitle>
            <SectionText>
              The App may link to third-party websites/services. We are not
              responsible for their privacy practices.
            </SectionText>
          </Section>

          <Section id="updates">
            <SectionTitle>10. 📝 Changes to This Policy</SectionTitle>
            <SectionText>
              We may update this policy periodically. You’ll be notified via app
              or email. Continued use means you accept the changes.
            </SectionText>
          </Section>

          <Section id="contact">
            <SectionTitle>11. 📞 Contact Us</SectionTitle>
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

export default Privacy;
