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
    { id: "intro", title: "Welcome" },
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services", title: "2. Services Provided" },
    { id: "responsibilities", title: "3. User Responsibilities" },
    { id: "loyalty", title: "4. Loyalty Points" },
    { id: "termination", title: "5. Termination of Service" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "privacy", title: "7. Privacy and Data Protection" },
    { id: "thirdparty", title: "8. Third-Party Services" },
    { id: "intellectual", title: "9. Intellectual Property" },
    { id: "law", title: "10. Governing Law" },
    { id: "updates", title: "11. Updates to Terms" },
  ];

  const scrollToSection =  (id: string)  => {
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
          <Header>Terms & Conditions - Banks App</Header>

          <Section id="intro">
            <SectionText>
              Welcome to Banks App. Please read these Terms & Conditions
              carefully before using our services. By continuing, you confirm
              that you understand and agree to the rules, rights, and
              responsibilities outlined below.
            </SectionText>
          </Section>

          <Section id="acceptance">
            <SectionTitle>1. Acceptance of Terms</SectionTitle>
            <SectionText>
              By accessing or using Banks App, you agree to be bound by these
              Terms and Conditions. If you do not agree, please discontinue
              using our services immediately. These terms apply to all users of
              the application including customers, merchants, and partners.
            </SectionText>
          </Section>

          <Section id="services">
            <SectionTitle>2. Services Provided</SectionTitle>
            <SectionText>
              Banks App provides features such as promotional campaigns, special
              offers, QR code scanning, and a loyalty rewards program. These
              services may be updated, modified, or discontinued at any time at
              our discretion without prior notice.
            </SectionText>
            <SectionText>
              Access to certain features may be subject to eligibility criteria,
              such as age, location, or verification through authorized
              partners.
            </SectionText>
          </Section>

          <Section id="responsibilities">
            <SectionTitle>3. User Responsibilities</SectionTitle>
            <SectionText>
              You agree to use Banks App responsibly and only for lawful
              purposes. You must not attempt to exploit the system, share
              fraudulent QR codes, or misuse promotional offers.
            </SectionText>
            <SectionText>
              Any unauthorized access, reverse engineering, distribution of
              harmful software, or tampering with the app is strictly prohibited
              and may result in permanent suspension or legal action.
            </SectionText>
          </Section>

          <Section id="loyalty">
            <SectionTitle>4. Loyalty Points</SectionTitle>
            <SectionText>
              Points earned through Banks App have no monetary value and are
              solely redeemable within the app. Points cannot be exchanged for
              cash, sold, or transferred to another account.
            </SectionText>
            <SectionText>
              Banks App reserves the right to modify, suspend, or discontinue
              the rewards program without notice. Expired points cannot be
              reinstated.
            </SectionText>
          </Section>

          <Section id="termination">
            <SectionTitle>5. Termination of Service</SectionTitle>
            <SectionText>
              We reserve the right to suspend or terminate your access to Banks
              App at our sole discretion, without prior notice, if we detect
              fraudulent activity, suspicious transactions, or violations of
              these Terms.
            </SectionText>
            <SectionText>
              Upon termination, all accumulated points and access to services
              will be permanently forfeited.
            </SectionText>
          </Section>

          <Section id="liability">
            <SectionTitle>6. Limitation of Liability</SectionTitle>
            <SectionText>
              Banks App and its affiliates will not be liable for any indirect,
              incidental, or consequential damages resulting from the use or
              inability to use our services.
            </SectionText>
          </Section>

          <Section id="privacy">
            <SectionTitle>7. Privacy and Data Protection</SectionTitle>
            <SectionText>
              By using Banks App, you consent to our collection and use of
              certain personal data as described in our Privacy Policy.
            </SectionText>
          </Section>

          <Section id="thirdparty">
            <SectionTitle>8. Third-Party Services</SectionTitle>
            <SectionText>
              Banks App may integrate with third-party services, such as payment
              gateways or promotional partners.
            </SectionText>
          </Section>

          <Section id="intellectual">
            <SectionTitle>9. Intellectual Property</SectionTitle>
            <SectionText>
              All content, logos, trademarks, and designs within Banks App are
              the property of Banks App or its licensors.
            </SectionText>
          </Section>

          <Section id="law">
            <SectionTitle>10. Governing Law</SectionTitle>
            <SectionText>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of your jurisdiction.
            </SectionText>
          </Section>

          <Section id="updates">
            <SectionTitle>11. Updates to Terms</SectionTitle>
            <SectionText>
              We may revise these Terms from time to time to reflect changes in
              laws, services, or business practices. Continued use of Banks App
              after updates indicates your acceptance of the revised Terms.
            </SectionText>
          </Section>

          {/* <Footer>
            <SectionText>
              For any queries regarding these Terms, contact us at
              <strong> support@banksapp.com</strong>.  
              These Terms & Conditions were last updated on January 1, 2025.
            </SectionText>
          </Footer> */}
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default TermsConditions;
