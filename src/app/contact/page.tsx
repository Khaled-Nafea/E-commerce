import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Clock, Facebook, Headphones, HelpCircle, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
    <BreadCrumb title="Contact Us" description="We'd love to hear from you. Get in touch with our team." gradient="from-green-600 via-green-500 to-green-300"
     iconBg="bg-[#4AC577]" icon={Headphones} breadcrumbs={[{ label: "Home", href: "/" },{ label: "Contact Us" }]} />
          <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="flex flex-col gap-5">

            {/* Phone */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
              <div className="bg-green-50 rounded-xl p-3">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-sm text-gray-500 mb-1">Mon-Fri from 8am to 6pm</p>
                <a href="tel:+18001234567" className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
              <div className="bg-green-50 rounded-xl p-3">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-sm text-gray-500 mb-1">We'll respond within 24 hours</p>
                <a href="mailto:support@freshcart.com" className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">
                  support@freshcart.com
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
              <div className="bg-green-50 rounded-xl p-3">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office</h3>
                <p className="text-sm text-gray-500">123 Commerce Street</p>
                <p className="text-sm text-gray-500">New York, NY 10001</p>
                <p className="text-sm text-gray-500">United States</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
              <div className="bg-green-50 rounded-xl p-3">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
                <p className="text-sm text-gray-500">Monday - Friday: 8am - 6pm</p>
                <p className="text-sm text-gray-500">Saturday: 9am - 4pm</p>
                <p className="text-sm text-gray-500">Sunday: Closed</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map(({ icon: SocialIcon, href }, i) => (
                  <Link key={i} href={href} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 transition-all duration-200">
                    <SocialIcon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-50 rounded-xl p-3">
                  <Headphones className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Send us a Message</h2>
                  <p className="text-sm text-gray-500">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700">Subject</label>
                  <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-gray-500 bg-white" title="Select a subject">
                    <option value="">Select a subject</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return & Refund</option>
                    <option value="shipping">Shipping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700">Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all resize-none"
                  />
                </div>

                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 w-fit transition-colors duration-200 cursor-pointer">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl border border-green-100 p-5 flex items-start gap-4">
              <div className="bg-green-600 rounded-xl p-3 shrink-0">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Looking for quick answers?</h3>
                <p className="text-sm text-gray-500 mt-1 mb-3">
                  Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                </p>
                <a href="#" className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors">
                  Visit Help Center →
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}