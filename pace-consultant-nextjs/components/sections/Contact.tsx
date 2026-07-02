'use client';

import { FormEvent, useState } from 'react';
import { HiClock, HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { siteConfig } from '@/lib/data/site';
import { isValidNepalPhone } from '@/lib/utils/helpers';
import { SectionHeader } from '@/components/ui/SectionHeader';

const subjectOptions = [
  { value: 'architectural-design', label: 'Architectural Design' },
  { value: 'structural-engineering', label: 'Structural Engineering' },
  { value: 'infrastructure-supervision', label: 'Infrastructure Supervision' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'feasibility-study', label: 'Feasibility Study' },
  { value: 'general-inquiry', label: 'General Inquiry' },
];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get('phone') ?? '');

    if (!isValidNepalPhone(phone)) {
      setStatus('error');
      return;
    }

    setStatus('success');
    form.reset();
  };

  const { address, phone, email, social } = siteConfig;

  return (
    <section aria-labelledby="contact-heading" className="py-24">
      <div className="container-pace">
        <SectionHeader
          label="Contact Us"
          title="Let's Build Something Great Together"
          titleId="contact-heading"
          subtitle="Reach out for consultations, project inquiries, or partnership opportunities."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="mb-6 font-heading text-xl font-semibold text-primary">Send Us a Message</h3>

            {status === 'success' ? (
              <div
                role="status"
                className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                Thank you! Your message has been sent. We will get back to you within 1–2 business days.
              </div>
            ) : null}

            {status === 'error' ? (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                Please enter a valid Nepal phone number and try again.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-primary">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded border border-primary/20 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-primary">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded border border-primary/20 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-primary">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+977-98XXXXXXXX"
                  className="w-full rounded border border-primary/20 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-primary">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full rounded border border-primary/20 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-primary">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full resize-y rounded border border-primary/20 px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-secondary px-6 py-3.5 font-heading text-sm font-semibold text-white transition hover:bg-secondary-dark sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="mb-6 font-heading text-xl font-semibold text-primary">Get In Touch</h3>

            <ul className="space-y-4">
              <li className="flex gap-4 rounded-lg border border-primary/10 bg-gray-50 p-5">
                <HiLocationMarker className="mt-0.5 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm font-semibold text-primary">Address</strong>
                  <p className="mt-1 text-sm text-muted">
                    {address.street}, {address.city} {address.postalCode}, Nepal
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-lg border border-primary/10 bg-gray-50 p-5">
                <HiPhone className="mt-0.5 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm font-semibold text-primary">Phone</strong>
                  <p className="mt-1 text-sm text-muted">
                    <a href={`tel:${phone.office.replace(/\s/g, '')}`} className="hover:text-secondary">
                      {phone.office}
                    </a>{' '}
                    (Office)
                  </p>
                  <p className="text-sm text-muted">
                    <a href={`tel:${phone.mobile.replace(/\s/g, '')}`} className="hover:text-secondary">
                      {phone.mobile}
                    </a>{' '}
                    (Mobile)
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-lg border border-primary/10 bg-gray-50 p-5">
                <HiMail className="mt-0.5 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm font-semibold text-primary">Email</strong>
                  <p className="mt-1 text-sm text-muted">
                    <a href={`mailto:${email}`} className="hover:text-secondary">
                      {email}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-lg border border-primary/10 bg-gray-50 p-5">
                <HiClock className="mt-0.5 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm font-semibold text-primary">Office Hours</strong>
                  <p className="mt-1 text-sm text-muted">Sunday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-sm text-muted">Saturday: 10:00 AM – 2:00 PM</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-lg border border-primary/10">
              <iframe
                title="PACE Consultant office location — Maharajgunj, Kathmandu, Nepal"
                src="https://maps.google.com/maps?q=Maharajgunj,Kathmandu,Nepal&z=15&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0"
              />
            </div>

            <div className="mt-6">
              <span className="mb-3 block text-sm font-semibold text-primary">Follow Us</span>
              <div className="flex gap-3">
                {[
                  { href: social.facebook, label: 'Facebook', Icon: FaFacebookF },
                  { href: social.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
                  { href: social.instagram, label: 'Instagram', Icon: FaInstagram },
                  { href: social.youtube, label: 'YouTube', Icon: FaYoutube },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-secondary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
