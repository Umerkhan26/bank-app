// import {
//   PageContainer,
//   Layout,
//   Sidebar,
//   SidebarList,
//   SidebarItem,
//   ContentArea,
//   Header,
//   Section,
//   SectionTitle,
//   SectionText,
// } from "./term.styles";

// const TermsConditions = () => {
//   const sections = [
//     { id: "intro", title: "Introduction" },
//     { id: "purpose", title: "1. Purpose of the App" },
//     { id: "eligibility", title: "2. User Eligibility" },
//     { id: "registration", title: "3. Registration & Account Use" },
//     { id: "promotions", title: "4. Promotions & Campaigns" },
//     { id: "functionality", title: "5. App Functionality" },
//     { id: "prizes", title: "6. Prizes & Rewards" },
//     { id: "prohibited", title: "7. Prohibited Conduct" },
//     { id: "privacy", title: "8. Privacy & Data" },
//     { id: "updates", title: "9. Updates & Availability" },
//     { id: "termination", title: "10. Termination of Use" },
//     { id: "intellectual", title: "11. Intellectual Property" },
//     { id: "law", title: "12. Governing Law" },
//     { id: "contact", title: "13. Contact Us" },
//   ];

//   const scrollToSection = (id: string) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <PageContainer>
//       <Layout>
//         {/* Sidebar Navigation */}
//         <Sidebar>
//           <SidebarList>
//             {sections.map((section) => (
//               <SidebarItem
//                 key={section.id}
//                 onClick={() => scrollToSection(section.id)}
//               >
//                 {section.title}
//               </SidebarItem>
//             ))}
//           </SidebarList>
//         </Sidebar>

//         {/* Main Content */}
//         <ContentArea>
//           <Header>Terms & Conditions - Banks Beer App</Header>

//           <Section id="intro">
//             <SectionText>
//               <strong>Effective Date:</strong> August 8, 2025 <br />
//               <strong>Last Updated:</strong> August 8, 2025
//             </SectionText>
//             <SectionText>
//               These Terms and Conditions ("Terms") govern your use of the{" "}
//               <strong>Banks Beer App</strong> (the “App”), operated by Banks
//               Holdings Limited (“Banks”, “we”, “us”, or “our”).
//             </SectionText>
//             <SectionText>
//               By downloading, registering, or using the App, you agree to these
//               Terms in full. If you do not agree, do not use the App.
//             </SectionText>
//           </Section>

//           <Section id="purpose">
//             <SectionTitle>1. 🎯 Purpose of the App</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>Facilitate participation in Banks promotions</li>
//               <li>Track loyalty points and campaign entries</li>
//               <li>Provide product info, offers, and event updates</li>
//               <li>Enhance your overall experience with Banks Beer</li>
//             </ul>
//           </Section>

//           <Section id="eligibility">
//             <SectionTitle>2. 👤 User Eligibility</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>You must be 18+ to use the App (per local alcohol laws).</li>
//               <li>
//                 You must be a legal resident of Barbados to enter local
//                 campaigns.
//               </li>
//               <li>
//                 By registering, you confirm the information provided is accurate
//                 and truthful.
//               </li>
//             </ul>
//           </Section>

//           <Section id="registration">
//             <SectionTitle>3. 📝 Registration & Account Use</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>Register with valid name, email, parish address, and DOB.</li>
//               <li>You are responsible for keeping your login details safe.</li>
//               <li>
//                 Banks may suspend/delete accounts that are fraudulent,
//                 duplicated, or violate these Terms.
//               </li>
//             </ul>
//           </Section>

//           <Section id="promotions">
//             <SectionTitle>4. 🏆 Promotions & Campaigns</SectionTitle>
//             <SectionText>
//               Promotional activities are governed by campaign rules (e.g., “Win
//               a 2025 DMAX”).
//             </SectionText>
//             <SectionText>
//               Entry may require uploading receipts, scanning QR codes, or
//               entering promo codes.
//             </SectionText>
//             <SectionText>
//               Banks reserves the right to modify or cancel promotions without
//               notice.
//             </SectionText>
//           </Section>

//           <Section id="functionality">
//             <SectionTitle>5. 📱 App Functionality</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>Submit entries into promotions</li>
//               <li>View accumulated points</li>
//               <li>Receive prize/event notifications</li>
//               <li>Locate nearby Banks outlets</li>
//             </ul>
//             <SectionText>
//               Some features may depend on your location, device, or network.
//             </SectionText>
//           </Section>

//           <Section id="prizes">
//             <SectionTitle>6. 🎁 Prizes & Rewards</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>
//                 Prizes are non-transferable and cannot be exchanged for cash.
//               </li>
//               <li>Proof of identity may be required for prize claims.</li>
//               <li>Banks’ decision in disputes is final.</li>
//             </ul>
//           </Section>

//           <Section id="prohibited">
//             <SectionTitle>7. 🚫 Prohibited Conduct</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>Do not provide false or misleading information.</li>
//               <li>Do not upload offensive or abusive content.</li>
//               <li>Do not hack, manipulate, or misuse the App.</li>
//               <li>Do not violate laws or third-party rights.</li>
//             </ul>
//           </Section>

//           <Section id="privacy">
//             <SectionTitle>8. 🔐 Privacy & Data</SectionTitle>
//             <SectionText>
//               Use of the App is governed by our <strong>Privacy Policy</strong>,
//               which explains data collection and use.
//             </SectionText>
//             <SectionText>
//               🔗 <em>[Insert link to Privacy Policy here]</em>
//             </SectionText>
//           </Section>

//           <Section id="updates">
//             <SectionTitle>9. 🛠️ Updates & Availability</SectionTitle>
//             <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
//               <li>The App may be updated with new features or bug fixes.</li>
//               <li>Banks does not guarantee uninterrupted service.</li>
//               <li>We may modify or suspend functions at any time.</li>
//             </ul>
//           </Section>

//           <Section id="termination">
//             <SectionTitle>10. 📵 Termination of Use</SectionTitle>
//             <SectionText>
//               Banks may suspend or terminate accounts for breaches, fraud,
//               abuse, or if the App is discontinued.
//             </SectionText>
//           </Section>

//           <Section id="intellectual">
//             <SectionTitle>11. 🧾 Intellectual Property</SectionTitle>
//             <SectionText>
//               All content (logos, graphics, text, videos, etc.) belongs to Banks
//               Holdings Limited and cannot be copied without permission.
//             </SectionText>
//           </Section>

//           <Section id="law">
//             <SectionTitle>12. 📍 Governing Law</SectionTitle>
//             <SectionText>
//               These Terms are governed by the laws of Barbados. Disputes will be
//               resolved in the courts of Barbados.
//             </SectionText>
//           </Section>

//           <Section id="contact">
//             <SectionTitle>13. 📩 Contact Us</SectionTitle>
//             <SectionText>
//               Banks Holdings Limited <br />
//               📧 <strong>banksbeerpromotions@gmail.com</strong> <br />
//               📞 <strong>(246) 230-9047</strong> <br />
//               📍 Newton, Christ Church, Barbados
//             </SectionText>
//           </Section>
//         </ContentArea>
//       </Layout>
//     </PageContainer>
//   );
// };

// export default TermsConditions;

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
    { id: "purpose", title: "1. Purpose of the Website" },
    { id: "eligibility", title: "2. User Eligibility" },
    { id: "registration", title: "3. Registration & Account Use" },
    { id: "promotions", title: "4. Promotions, Campaigns & Entry Submission" },
    { id: "functionality", title: "5. Website Functionality" },
    { id: "prizes", title: "6. Prizes & Rewards" },
    { id: "prohibited", title: "7. Prohibited Conduct" },
    { id: "privacy", title: "8. Privacy & Data" },
    { id: "updates", title: "9. Updates & Service Availability" },
    { id: "termination", title: "10. Termination of Use" },
    { id: "intellectual", title: "11. Intellectual Property" },
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
          <Header>Terms & Conditions - Banks Beer Promotions Website</Header>

          <Section id="intro">
            <SectionText>
              <strong>Effective Date:</strong> August 8, 2025 <br />
              <strong>Last Updated:</strong> December 6, 2025
            </SectionText>
            <SectionText>
              These Terms govern your use of the Banks Beer promotional website
              (“Website”), operated by Banks Holdings Limited. By accessing or
              registering on the Website, you agree to these Terms in full.
            </SectionText>
          </Section>

          <Section id="purpose">
            <SectionTitle>1. Purpose of the Website</SectionTitle>
            <SectionText>
              The Website enables users to participate in Banks promotions,
              track loyalty points, receive updates, and access product
              information.
            </SectionText>
          </Section>

          <Section id="eligibility">
            <SectionTitle>2. User Eligibility</SectionTitle>
            <SectionText>To use the Website you must:</SectionText>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Be 18 years or older</li>
              <li>Be a legal resident of Barbados for local campaigns</li>
              <li>Provide accurate information during registration</li>
            </ul>
          </Section>

          <Section id="registration">
            <SectionTitle>3. Registration & Account Use</SectionTitle>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>
                Register with your legal name, email, parish address, and date
                of birth
              </li>
              <li>Keep your login details secure</li>
              <li>
                Banks may suspend or delete accounts that violate these Terms
              </li>
            </ul>
          </Section>

          <Section id="promotions">
            <SectionTitle>
              4. Promotions, Campaigns & Entry Submission
            </SectionTitle>
            <Section id="promotions-4.1">
              <SectionTitle>
                4.1 General Promotion Participation (Updated)
              </SectionTitle>
              <SectionText>
                Participation in Banks promotions requires scanning or uploading
                Banks Beer crowns via the Website. This is the only valid method
                of entry into the campaign.
              </SectionText>
              <SectionText>
                All crowns must be submitted successfully within the rules and
                deadlines outlined for each promotion. Entries submitted in any
                other manner, or attempts to participate without scanning or
                uploading crowns, will not be accepted unless otherwise
                officially stated.
              </SectionText>
            </Section>
            <Section id="promotions-4.2">
              <SectionTitle>
                4.2 Website Availability & Platform Limitations
              </SectionTitle>
              <SectionText>Users acknowledge that:</SectionText>
              <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
                <li>The Banks Beer mobile app is not yet available</li>
                <li>
                  All campaign participation must occur through the Banks Beer
                  Website
                </li>
                <li>
                  Use requires a functioning device, internet access, and
                  compatible browser
                </li>
              </ul>
            </Section>
            <Section id="promotions-4.3">
              <SectionTitle>
                4.3 Technical Limitations & Consumer Responsibility
              </SectionTitle>
              <SectionText>Users are responsible for ensuring:</SectionText>
              <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
                <li>
                  Their device, camera, browser, and network function properly
                </li>
                <li>Crowns are intact, legible, and scannable</li>
                <li>Submissions are completed before the deadline</li>
              </ul>
              <SectionText>
                Banks is not responsible for failed submissions due to: device
                issues, network errors, unreadable crowns, browser
                incompatibility, user error, attempts to use the unavailable
                mobile app, or submissions attempted after the deadline.
              </SectionText>
            </Section>
            <Section id="promotions-4.4">
              <SectionTitle>
                4.4 Extended Submission Window for Crown Scanning
              </SectionTitle>
              <SectionText>
                An Extended Submission Deadline is provided until 11:59 PM,
                December 6, 2025. Banks may assist users during this period but
                cannot guarantee all crowns will be validated.
              </SectionText>
            </Section>
            <Section id="promotions-4.5">
              <SectionTitle>
                4.5 Final Cut-Off for All Crown Scans & Entries
              </SectionTitle>
              <SectionText>
                No crowns, codes, or entries—successful or unsuccessful—will be
                accepted after 11:59 PM, December 6, 2025. This deadline is
                final and non-negotiable.
              </SectionText>
            </Section>
            <Section id="promotions-4.6">
              <SectionTitle>
                4.6 No Liability for Late or Failed Submissions
              </SectionTitle>
              <SectionText>Users agree that:</SectionText>
              <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
                <li>
                  Banks is not liable for crowns or entries not submitted before
                  the deadline
                </li>
                <li>
                  Banks is not obligated to manually enter, replace, or
                  compensate for failed submissions
                </li>
                <li>
                  Banks is not responsible for reliance on the unreleased mobile
                  app
                </li>
                <li>Banks’ verification systems and records are final</li>
                <li>
                  Users waive the right to dispute or litigate late or failed
                  submissions
                </li>
              </ul>
            </Section>
            <Section id="promotions-4.7">
              <SectionTitle>4.7 Finalization of Campaign Results</SectionTitle>
              <SectionText>
                After the deadline, Banks will verify eligible entries and
                select the winner(s). All decisions made by Banks are final.
              </SectionText>
            </Section>
            <Section id="promotions-4.8">
              <SectionTitle>
                4.8 Availability of Rewards, Premiums, and Redemption Items
              </SectionTitle>
              <SectionText>
                Banks offers various rewards, premiums, and redemption items on
                the Website, which may be available for a limited time and in
                limited quantities. Users acknowledge and agree that:
              </SectionText>
              <ol style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
                <li>
                  Items may be removed at any time if they become out of stock,
                  discontinued, unavailable, or otherwise no longer offered as
                  part of the promotion.
                </li>
                <li>
                  Removed items may or may not be reintroduced to the Website at
                  a later date.
                </li>
                <li>
                  Banks is not obligated to notify users when items are removed,
                  replaced, or updated.
                </li>
                <li>
                  Users are not entitled to compensation, replacement items, or
                  refunds of points/crowns due to the unavailability or removal
                  of any reward.
                </li>
                <li>
                  Users are encouraged to redeem their crowns for other
                  available items listed on the Website, as new rewards and
                  premiums may be added over time.
                </li>
                <li>
                  Availability is strictly first-come, first-served, and is
                  dependent on remaining inventory at the time of redemption.
                </li>
              </ol>
            </Section>
          </Section>

          <Section id="functionality">
            <SectionTitle>5. Website Functionality</SectionTitle>
            <SectionText>
              The Website allows users to submit crowns, view points, receive
              notifications, and locate participating outlets. Banks does not
              guarantee uninterrupted service.
            </SectionText>
          </Section>

          <Section id="prizes">
            <SectionTitle>6. Prizes & Rewards</SectionTitle>
            <SectionText>
              Prizes are non-transferable and may require proof of identity.
              Banks’ decisions regarding prize eligibility are final.
            </SectionText>
          </Section>

          <Section id="prohibited">
            <SectionTitle>7. Prohibited Conduct</SectionTitle>
            <SectionText>Users must not:</SectionText>
            <ul style={{ marginLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>Provide false information</li>
              <li>Upload offensive or unlawful content</li>
              <li>Interfere with or misuse the Website</li>
              <li>Violate intellectual property or laws</li>
            </ul>
          </Section>

          <Section id="privacy">
            <SectionTitle>8. Privacy & Data</SectionTitle>
            <SectionText>
              Use of the Website is governed by Banks’ Privacy Policy.
            </SectionText>
          </Section>

          <Section id="updates">
            <SectionTitle>9. Updates & Service Availability</SectionTitle>
            <SectionText>
              Banks may update, modify, or remove Website features at any time.
            </SectionText>
          </Section>

          <Section id="termination">
            <SectionTitle>10. Termination of Use</SectionTitle>
            <SectionText>
              Banks may suspend or terminate accounts for violations, fraud,
              misuse, or compliance concerns.
            </SectionText>
          </Section>

          <Section id="intellectual">
            <SectionTitle>11. Intellectual Property</SectionTitle>
            <SectionText>
              All Website materials belong to Banks Holdings Limited and may not
              be copied without permission.
            </SectionText>
          </Section>

          <Section id="contact">
            <SectionTitle>13. Contact Us</SectionTitle>
            <SectionText>
              Banks Holdings Limited <br />
              📍 Newton, Christ Church, Barbados <br />
              📧 <strong>banksbeerpromotions@gmail.com</strong>
            </SectionText>
          </Section>
        </ContentArea>
      </Layout>
    </PageContainer>
  );
};

export default TermsConditions;
