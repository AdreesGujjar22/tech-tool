import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
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
              Terms and Conditions
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
              Please read these Terms and Conditions carefully before using TechTools.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              By accessing or using our Website and services, You agree to be bound by these Terms and Conditions. If You do not agree with any part of these Terms, please discontinue use of the Website.
            </p>
          </div>

          {/* Interpretation and Definitions */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Interpretation and Definitions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Interpretation</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed">
                  Words with capitalized initials have meanings defined under the following conditions. These definitions apply whether they appear in singular or plural form.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#DAE2FD] mb-3">Definitions</h3>
                <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
                  For the purposes of these Terms and Conditions:
                </p>
                <ul className="space-y-3 text-base text-[#C7C4D8] leading-relaxed">
                  <li><strong className="text-[#C3C0FF]">Company</strong> ("We", "Us", or "Our") refers to TechTools.</li>
                  <li><strong className="text-[#C3C0FF]">Website</strong> refers to TechTools and all related online services and tools.</li>
                  <li><strong className="text-[#C3C0FF]">Service</strong> refers to any features, utilities, tools, content, and functionality provided through the Website.</li>
                  <li><strong className="text-[#C3C0FF]">User</strong> ("You" or "Your") means any person accessing or using the Service.</li>
                  <li><strong className="text-[#C3C0FF]">Device</strong> means any computer, mobile phone, tablet, or electronic device capable of accessing the Website.</li>
                  <li><strong className="text-[#C3C0FF]">Third-Party Services</strong> means services, tools, websites, or content provided by external providers that may be integrated with or linked from our Website.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Acceptance of Terms</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              By using TechTools, You confirm that:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• You are at least 13 years old</li>
              <li>• You agree to comply with these Terms and Conditions</li>
              <li>• You will use the Website only for lawful purposes</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              If You do not agree with these Terms, You may not use the Service.
            </p>
          </div>

          {/* Use of the Website */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Use of the Website</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              You agree to use TechTools responsibly and not to:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Violate any applicable laws or regulations</li>
              <li>• Attempt unauthorized access to systems or servers</li>
              <li>• Interfere with Website functionality or security</li>
              <li>• Upload malicious software, scripts, or harmful content</li>
              <li>• Abuse, scrape, or overload the Service</li>
              <li>• Use automated systems that negatively impact performance</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              We reserve the right to suspend or terminate access for violations of these Terms.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Intellectual Property</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              All content, branding, design elements, graphics, logos, text, and tools available on TechTools are owned by or licensed to the Company unless otherwise stated.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Copy or reproduce Website content without permission</li>
              <li>• Redistribute or resell our tools or services</li>
              <li>• Use our branding or logos without authorization</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              Personal and non-commercial use is permitted.
            </p>
          </div>

          {/* Tool Accuracy and Availability */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Tool Accuracy and Availability</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              TechTools provides online utilities and digital tools for convenience and informational purposes.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              While we strive for accuracy and reliability:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• We do not guarantee that all tools will be error-free or uninterrupted</li>
              <li>• Results generated by tools may not always be fully accurate</li>
              <li>• Services may be updated, modified, or discontinued at any time</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              You use the Website and tools at Your own risk.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Third-Party Links</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              Our Website may contain links to third-party websites or services.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We do not control or endorse third-party content and are not responsible for:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Third-party privacy practices</li>
              <li>• External website content</li>
              <li>• Damages or losses related to external services</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              You access third-party websites at Your own discretion.
            </p>
          </div>

          {/* Privacy */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Privacy</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              Your use of TechTools is also governed by our Privacy Policy, which explains how we collect, use, and protect Your information.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              By using the Website, You agree to our Privacy Policy.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Limitation of Liability</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              To the maximum extent permitted by law, TechTools and its owners, affiliates, partners, or service providers shall not be liable for:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Indirect or consequential damages</li>
              <li>• Loss of data or profits</li>
              <li>• Service interruptions</li>
              <li>• Errors or inaccuracies</li>
              <li>• Security breaches beyond reasonable control</li>
              <li>• Any damages arising from use or inability to use the Service</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Disclaimer</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We make no guarantees regarding:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• Continuous availability of the Website</li>
              <li>• Accuracy or reliability of tool results</li>
              <li>• Compatibility with all devices or browsers</li>
              <li>• Absence of viruses or harmful components</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              Users are responsible for verifying important results independently.
            </p>
          </div>

          {/* Termination */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Termination</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We reserve the right to suspend or terminate access to the Website immediately, without prior notice, if:
            </p>
            <ul className="space-y-2 text-base text-[#C7C4D8] leading-relaxed">
              <li>• These Terms are violated</li>
              <li>• Harmful or abusive activity is detected</li>
              <li>• Required by law or security reasons</li>
            </ul>
            <p className="text-base text-[#C7C4D8] leading-relaxed mt-4">
              Upon termination, Your right to use the Service ends immediately.
            </p>
          </div>

          {/* Governing Law */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Governing Law</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              These Terms and Conditions shall be governed by and interpreted in accordance with applicable laws and regulations in the jurisdiction where the Company operates, without regard to conflict of law provisions.
            </p>
          </div>

          {/* Changes to These Terms */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Changes to These Terms</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              We may update or modify these Terms and Conditions at any time.
            </p>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              Updated versions will be posted on this page along with the revised "Last Updated" date. Continued use of the Website after changes become effective means You accept the updated Terms.
            </p>
          </div>

          {/* Severability */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Severability</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </div>

          {/* Contact Us */}
          <div className="glass-card-dark p-8 rounded-[24px]">
            <h2 className="text-2xl font-semibold text-[#DAE2FD] mb-6">Contact Us</h2>
            <p className="text-base text-[#C7C4D8] leading-relaxed mb-4">
              If You have any questions regarding these Terms and Conditions, You may contact us through our Website contact page or support email.
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
