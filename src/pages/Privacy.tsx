import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B1326] text-[#DAE2FD]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 w-full h-96 bg-hero-radial pointer-events-none"
          style={{ top: "0" }}
        />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">
              Privacy Policy
            </h1>
            <p className="text-base text-[#C7C4D8] max-w-[800px] mx-auto">
              Last Updated: May 16, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-[960px] mx-auto space-y-12">
          {/* Introduction */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              Welcome to TechTools. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how TechTools collects, uses, stores, and safeguards your information when you use our website and online tools.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              By accessing or using TechTools, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Interpretation and Definitions */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Interpretation and Definitions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Interpretation</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed">
                  Words with capitalized initials have meanings defined under the following conditions. These definitions apply regardless of whether they appear in singular or plural form.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Definitions</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
                  For the purposes of this Privacy Policy:
                </p>
                <ul className="space-y-3 text-base text-[#C7C4D8] leading-relaxed">
                  <li><strong className="text-[#C3C0FF]">Company</strong> ("We", "Us", or "Our") refers to TechTools.</li>
                  <li><strong className="text-[#C3C0FF]">Website</strong> refers to TechTools and all associated online services and utilities.</li>
                  <li><strong className="text-[#C3C0FF]">Service</strong> refers to all tools, features, content, and functionalities provided through the Website.</li>
                  <li><strong className="text-[#C3C0FF]">User</strong> ("You" or "Your") means any individual accessing or using the Website.</li>
                  <li><strong className="text-[#C3C0FF]">Device</strong> means any computer, mobile phone, tablet, or device used to access the Service.</li>
                  <li><strong className="text-[#C3C0FF]">Personal Data</strong> means any information that can identify an individual directly or indirectly.</li>
                  <li><strong className="text-[#C3C0FF]">Usage Data</strong> refers to information collected automatically while using the Service.</li>
                  <li><strong className="text-[#C3C0FF]">Cookies</strong> are small files stored on Your device to improve website functionality and user experience.</li>
                  <li><strong className="text-[#C3C0FF]">Service Providers</strong> are third-party companies or individuals that help operate or improve the Service.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Personal Information</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
                  While using our Website, we may collect certain personally identifiable information, including but not limited to:
                </p>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• Name</li>
                  <li>• Email address</li>
                  <li>• Contact information</li>
                  <li>• Messages or inquiries submitted through contact forms</li>
                </ul>
                <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
                  You may provide this information voluntarily when contacting us or using certain features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Usage Data</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
                  We may automatically collect information when You use TechTools, including:
                </p>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• IP address</li>
                  <li>• Browser type and version</li>
                  <li>• Device type</li>
                  <li>• Operating system</li>
                  <li>• Pages visited</li>
                  <li>• Time spent on pages</li>
                  <li>• Referring websites</li>
                  <li>• Tool usage statistics</li>
                  <li>• Diagnostic and performance data</li>
                </ul>
                <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
                  This information helps us improve performance, security, and user experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Cookies and Tracking Technologies</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
                  TechTools may use Cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
                  <li>• Remember user preferences</li>
                  <li>• Improve website functionality</li>
                  <li>• Analyze website traffic</li>
                  <li>• Enhance performance and security</li>
                  <li>• Provide a better browsing experience</li>
                </ul>
                <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
                  You can choose to disable Cookies through your browser settings. However, some parts of the Website may not function properly if Cookies are disabled.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">How We Use Your Information</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We may use collected information for the following purposes:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• To provide and maintain our services</li>
              <li>• To improve website functionality and performance</li>
              <li>• To monitor usage and analyze trends</li>
              <li>• To respond to inquiries and support requests</li>
              <li>• To detect and prevent fraud or security issues</li>
              <li>• To personalize user experience</li>
              <li>• To send updates, notifications, or important service information</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Third-Party Services</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              TechTools may use third-party services such as:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Analytics providers</li>
              <li>• Hosting providers</li>
              <li>• Advertising networks</li>
              <li>• Performance monitoring tools</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              These third parties may collect information according to their own privacy policies. We recommend reviewing their policies separately.
            </p>
          </div>

          {/* Data Sharing and Disclosure */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Data Sharing and Disclosure</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We do not sell Your personal information.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              However, we may share information in the following situations:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• With trusted service providers assisting in operating the Website</li>
              <li>• To comply with legal obligations or law enforcement requests</li>
              <li>• To protect our rights, users, systems, or security</li>
              <li>• During business transfers such as mergers or acquisitions</li>
              <li>• With Your consent</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Data Retention</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We retain personal information only for as long as necessary to:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Provide services</li>
              <li>• Fulfill legal obligations</li>
              <li>• Resolve disputes</li>
              <li>• Improve security and performance</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              Usage data may be retained temporarily for analytics and security purposes.
            </p>
          </div>

          {/* Data Security */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Data Security</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We implement reasonable security measures to protect Your information from unauthorized access, disclosure, alteration, or destruction.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              However, no method of internet transmission or electronic storage is completely secure. While we strive to protect Your data, we cannot guarantee absolute security.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Children's Privacy</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              TechTools is not intended for children under the age of 13.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              We do not knowingly collect personal information from children. If we become aware that information has been collected from a child without parental consent, we will take steps to remove it promptly.
            </p>
          </div>

          {/* External Links */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">External Links</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              Our Website may contain links to third-party websites or services.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              We are not responsible for the content, privacy practices, or policies of external websites. We encourage users to review the privacy policies of any third-party websites they visit.
            </p>
          </div>

          {/* Your Privacy Rights */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Your Privacy Rights</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              Depending on Your location and applicable laws, You may have rights to:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Access Your personal data</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of Your data</li>
              <li>• Withdraw consent</li>
              <li>• Object to certain processing activities</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              You may contact us regarding any privacy-related requests.
            </p>
          </div>

          {/* Changes to This Privacy Policy */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Changes to This Privacy Policy</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We may update this Privacy Policy from time to time.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              Any updates will be posted on this page along with a revised "Last Updated" date. Continued use of the Website after changes are posted constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Us */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Contact Us</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              If You have any questions, concerns, or requests regarding this Privacy Policy, You can contact us through our website contact page or support email.
            </p>
            <div className="mt-6 pt-6 border-t border-[rgba(195,192,255,0.10)]">
              <p className="text-lg font-semibold text-[#C3C0FF]">TechTools</p>
              <p className="text-base text-[#C7C4D8]">Smart Online Utilities for Modern Users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
