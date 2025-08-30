"use client";
import React from "react";
import {
  ShieldCheck,
  User,
  Database,
  Share2,
  Lock,
  UserCheck,
  Cookie,
  FileEdit,
  Mail,
  FileText,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const sections = [
    { id: "introduction", title: "1. Introduction", icon: FileText },
    {
      id: "info-collected",
      title: "2. Information We Collect",
      icon: Database,
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: UserCheck,
    },
    { id: "sharing", title: "4. Sharing Your Information", icon: Share2 },
    { id: "security", title: "5. Data Security", icon: Lock },
    { id: "rights", title: "6. Your Data Rights", icon: User },
    { id: "cookies", title: "7. Cookies & Tracking", icon: Cookie },
    { id: "changes", title: "8. Changes to This Policy", icon: FileEdit },
    { id: "contact", title: "9. Contact Us", icon: Mail },
  ];

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* --- Header --- */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Last Updated: August 31, 2025
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* --- Sticky Navigation (Desktop) --- */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Policy Contents
              </h3>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-center gap-3 w-full text-left text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-200"
                      >
                        <section.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {section.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="lg:w-3/4">
            <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-sm space-y-10 prose prose-slate max-w-none prose-h2:text-slate-900 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-4 prose-h3:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
              <section id="introduction">
                <h2>1. Introduction</h2>
                <p>
                  <strong>Your Company Name</strong> ("we," "our," "us") is
                  committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you visit our website [Your Website URL].
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the site.
                </p>
              </section>

              <section id="info-collected">
                <h2>2. Information We Collect</h2>
                <p>
                  We may collect information about you in a variety of ways. The
                  information we may collect on the Site includes:
                </p>
                <h3>Personal Data</h3>
                <p>
                  Personally identifiable information, such as your name,
                  shipping address, email address, and telephone number, and
                  demographic information, such as your age, gender, hometown,
                  and interests, that you voluntarily give to us when you
                  register with the Site or when you choose to participate in
                  various activities related to the Site, such as online chat
                  and message boards.
                </p>
                <h3>Derivative Data</h3>
                <p>
                  Information our servers automatically collect when you access
                  the Site, such as your IP address, your browser type, your
                  operating system, your access times, and the pages you have
                  viewed directly before and after accessing the Site.
                </p>
              </section>

              <section id="how-we-use">
                <h2>3. How We Use Your Information</h2>
                <p>
                  Having accurate information about you permits us to provide
                  you with a smooth, efficient, and customized experience.
                  Specifically, we may use information collected about you via
                  the Site to:
                </p>
                <ul>
                  <li>Create and manage your account.</li>
                  <li>Process your orders and payments.</li>
                  <li>Email you regarding your account or order.</li>
                  <li>
                    Fulfill and manage purchases, orders, payments, and other
                    transactions related to the Site.
                  </li>
                  <li>
                    Deliver targeted advertising, coupons, newsletters, and
                    other promotions.
                  </li>
                  <li>
                    Request feedback and contact you about your use of the Site.
                  </li>
                </ul>
              </section>

              <section id="sharing">
                <h2>4. Sharing Your Information</h2>
                <p>
                  We may share information we have collected about you in
                  certain situations. Your information may be disclosed as
                  follows:
                </p>
                <h3>By Law or to Protect Rights</h3>
                <p>
                  If we believe the release of information about you is
                  necessary to respond to legal process, to investigate or
                  remedy potential violations of our policies, or to protect the
                  rights, property, and safety of others, we may share your
                  information as permitted or required by any applicable law,
                  rule, or regulation.
                </p>
                <h3>Third-Party Service Providers</h3>
                <p>
                  We may share your information with third parties that perform
                  services for us or on our behalf, including payment
                  processing, data analysis, email delivery, hosting services,
                  customer service, and marketing assistance.
                </p>
              </section>

              <section id="security">
                <h2>5. Data Security</h2>
                <p>
                  We use administrative, technical, and physical security
                  measures to help protect your personal information. While we
                  have taken reasonable steps to secure the personal information
                  you provide to us, please be aware that despite our efforts,
                  no security measures are perfect or impenetrable, and no
                  method of data transmission can be guaranteed against any
                  interception or other type of misuse.
                </p>
              </section>

              <section id="rights">
                <h2>6. Your Data Rights</h2>
                <p>
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <ul>
                  <li>
                    The right to access – You have the right to request copies
                    of your personal data.
                  </li>
                  <li>
                    The right to rectification – You have the right to request
                    that we correct any information you believe is inaccurate.
                  </li>
                  <li>
                    The right to erasure – You have the right to request that we
                    erase your personal data, under certain conditions.
                  </li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the contact
                  details provided below.
                </p>
              </section>

              <section id="cookies">
                <h2>7. Cookies & Tracking</h2>
                <p>
                  We may use cookies, web beacons, tracking pixels, and other
                  tracking technologies on the Site to help customize the Site
                  and improve your experience. For more information on how we
                  use cookies, please refer to our Cookie Policy.
                </p>
              </section>

              <section id="changes">
                <h2>8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time in order
                  to reflect, for example, changes to our practices or for other
                  operational, legal, or regulatory reasons. We will notify you
                  of any changes by posting the new Privacy Policy on this page
                  and updating the "Last Updated" date.
                </p>
              </section>

              <section id="contact">
                <h2>9. Contact Us</h2>
                <p>
                  If you have questions or comments about this Privacy Policy,
                  please contact us:
                </p>
                <ul>
                  <li>
                    <strong>By email:</strong> privacy@yourcompany.com
                  </li>
                  <li>
                    <strong>By mail:</strong> [Your Company's Physical Address]
                  </li>
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
