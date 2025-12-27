'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investorType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Waitlist submission:', formData);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="success-card">
        <div className="mb-6">
          <div className="success-icon">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#535D66', marginBottom: '0.5rem' }}>
            You&apos;re on the list!
          </h3>
          <p style={{ color: 'rgba(83, 93, 102, 0.7)' }}>
            Thank you for joining COOWN. We&apos;ll notify you when we launch.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ fullName: '', email: '', phone: '', investorType: '' });
          }}
          style={{ color: '#53857A', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="+234 XXX XXX XXXX"
          />
        </div>

        <div>
          <label htmlFor="investorType" className="form-label">
            I&apos;m interested as a...
          </label>
          <select
            id="investorType"
            name="investorType"
            value={formData.investorType}
            onChange={handleChange}
            required
            className="form-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="">Select an option</option>
            <option value="investor">Property Investor</option>
            <option value="realtor">Verified Realtor</option>
            <option value="both">Both</option>
          </select>
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Joining waitlist...' : 'Join the Waitlist'}
        </button>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'rgba(83, 93, 102, 0.6)', textAlign: 'center', marginTop: '1rem' }}>
        By joining, you agree to receive updates about COOWN&apos;s launch.
      </p>
    </form>
  );
}
