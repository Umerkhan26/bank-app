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
    { id: "intro", title: "Welcome" },
    { id: "collection", title: "1. Data Collection" },
    { id: "usage", title: "2. Data Usage" },
    { id: "security", title: "3. Data Retention & Security" },
    { id: "sharing", title: "4. Third-Party Sharing" },
    { id: "rights", title: "5. Your Rights" },
    { id: "cookies", title: "6. Cookies & Tracking" },
    { id: "updates", title: "7. Updates to Policy" },
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
        {/* Sidebar */}
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
          <Header>Privacy Policy - Banks App</Header>

          <Section id="intro">
            <SectionText>
              Welcome to <strong>Banks App</strong>. This Privacy Policy explains
              how we collect, process, and safeguard your personal data while
              using our services.
            </SectionText>
          </Section>

          <Section id="collection">
            <SectionTitle>1. Data Collection</SectionTitle>
            <SectionText>
              We collect limited personal and transactional data to provide our
              services, including:
            </SectionText>
            <ul style={{ marginLeft: "1.5rem", color: "#333", lineHeight: "1.6" }}>
              <li>Basic details (name, email, preferences)</li>
              <li>Transaction history for loyalty points</li>
              <li>QR code scans for verifying promotions</li>
              <li>Campaign and offer participation activity</li>
            </ul>
          </Section>

          <Section id="usage">
            <SectionTitle>2. Data Usage</SectionTitle>
            <SectionText>
              Your data is used strictly to enhance your experience, including:
            </SectionText>
            <ul style={{ marginLeft: "1.5rem", color: "#333", lineHeight: "1.6" }}>
              <li>Reward calculation & redemption</li>
              <li>Personalized campaigns & offers</li>
              <li>Improved app functionality & security</li>
            </ul>
          </Section>

          <Section id="security">
            <SectionTitle>3. Data Retention & Security</SectionTitle>
            <SectionText>
              Data is retained only as long as required to deliver services. All
              sensitive information is encrypted, stored securely, and regularly
              reviewed for compliance with security standards.
            </SectionText>
          </Section>

          <Section id="sharing">
            <SectionTitle>4. Third-Party Sharing</SectionTitle>
            <SectionText>
              We do not sell or rent personal data. Information may only be
              shared with trusted partners for rewards, promotions, or legal
              compliance — under strict confidentiality agreements.
            </SectionText>
          </Section>

          <Section id="rights">
            <SectionTitle>5. Your Rights</SectionTitle>
            <SectionText>
              You may access, update, or delete your data at any time. You also
              have the right to request account removal or data portability by
              contacting our support team.
            </SectionText>
          </Section>

          <Section id="cookies">
            <SectionTitle>6. Cookies & Tracking</SectionTitle>
            <SectionText>
              Banks App uses cookies and tracking technologies to improve app
              performance, remember preferences, and analyze usage patterns.
              You can disable cookies through your device settings.
            </SectionText>
          </Section>

          <Section id="updates">
            <SectionTitle>7. Updates to Policy</SectionTitle>
            <SectionText>
              This Privacy Policy may be updated from time to time to reflect
              service improvements or legal changes. Continued use of the app
              after updates indicates your agreement to the revised policy.
            </SectionText>
          </Section>
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default Privacy;
