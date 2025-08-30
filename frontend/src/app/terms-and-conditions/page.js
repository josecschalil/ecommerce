"use client";
import React from "react";
import {
  ShieldCheck,
  User,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  RotateCw,
  Copyright,
  XCircle,
  FileText,
  Mail,
} from "lucide-react";

const TermsAndConditionsPage = () => {
  const sections = [
    { id: "introduction", title: "1. Introduction", icon: FileText },
    { id: "user-accounts", title: "2. User Accounts", icon: User },
    { id: "orders", title: "3. Orders & Payment", icon: ShoppingCart },
    { id: "shipping", title: "4. Shipping & Delivery", icon: Truck },
    { id: "returns", title: "5. Returns & Refunds", icon: RotateCw },
    { id: "ip", title: "6. Intellectual Property", icon: Copyright },
    { id: "prohibited", title: "7. Prohibited Uses", icon: XCircle },
    { id: "liability", title: "8. Limitation of Liability", icon: ShieldCheck },
    { id: "contact", title: "9. Contact Information", icon: Mail },
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
            Terms and Conditions
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
                Page Contents
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
                  Welcome to <strong>Your Company Name</strong> ("we," "our,"
                  "us"). These Terms and Conditions govern your use of our
                  website located at [Your Website URL] and any related services
                  provided by us. By accessing our website, you agree to abide
                  by these Terms and Conditions. If you do not agree with any
                  part of these terms, you must not use our website.
                </p>
              </section>

              <section id="user-accounts">
                <h2>2. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. Failure to do so constitutes a breach of the Terms,
                  which may result in immediate termination of your account on
                  our service. You are responsible for safeguarding the password
                  that you use to access the service and for any activities or
                  actions under your password.
                </p>
              </section>

              <section id="orders">
                <h2>3. Orders & Payment</h2>
                <p>
                  By placing an order, you are offering to purchase a product on
                  and subject to the following terms and conditions. All orders
                  are subject to availability and confirmation of the order
                  price.
                </p>
                <h3>Pricing and Availability</h3>
                <p>
                  Whilst we try and ensure that all details, descriptions, and
                  prices which appear on this Website are accurate, errors may
                  occur. If we discover an error in the price of any goods which
                  you have ordered we will inform you of this as soon as
                  possible.
                </p>
                <h3>Payment</h3>
                <p>
                  We accept various forms of payment, as listed on our website.
                  You confirm that the credit/debit card or payment account that
                  is being used is yours. All credit/debit card holders are
                  subject to validation checks and authorization by the card
                  issuer.
                </p>
              </section>

              <section id="shipping">
                <h2>4. Shipping & Delivery</h2>
                <p>
                  Dispatch times may vary according to availability and subject
                  to any delays resulting from postal delays or force majeure
                  for which we will not be responsible. Please review our
                  Shipping Policy for detailed information on shipping times,
                  costs, and methods.
                </p>
              </section>

              <section id="returns">
                <h2>5. Returns & Refunds</h2>
                <p>
                  Our Returns and Refunds Policy provides detailed information
                  about options and procedures for returning your order. We want
                  you to be completely satisfied with your purchase. If for any
                  reason you are not, please refer to our dedicated policy page
                  to initiate a return.
                </p>
              </section>

              <section id="ip">
                <h2>6. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Your Company Name and its licensors. The Service is protected
                  by copyright, trademark, and other laws of both the India and
                  foreign countries. Our trademarks and trade dress may not be
                  used in connection with any product or service without the
                  prior written consent of Your Company Name.
                </p>
              </section>

              <section id="prohibited">
                <h2>7. Prohibited Uses</h2>
                <p>
                  You may use our site only for lawful purposes. You may not use
                  our site:
                </p>
                <ul>
                  <li>
                    In any way that breaches any applicable local, national or
                    international law or regulation.
                  </li>
                  <li>
                    In any way that is unlawful or fraudulent, or has any
                    unlawful or fraudulent purpose or effect.
                  </li>
                  <li>
                    To transmit, or procure the sending of, any unsolicited or
                    unauthorized advertising or promotional material (spam).
                  </li>
                </ul>
              </section>

              <section id="liability">
                <h2>8. Limitation of Liability</h2>
                <p>
                  In no event shall Your Company Name, nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential or
                  punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from your access to or use of or inability to access
                  or use the Service.
                </p>
              </section>

              <section id="contact">
                <h2>9. Contact Information</h2>
                <p>
                  For any questions about these Terms and Conditions, please
                  contact us:
                </p>
                <ul>
                  <li>
                    <strong>By email:</strong> support@yourcompany.com
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

export default TermsAndConditionsPage;
