'use client';

import { useState } from 'react';

type UserType = 'realtor' | 'coowner' | null;

interface FormData {
  userType: UserType;
  fullName: string;
  email: string;
  phone: string;
  // Co-owner specific
  investmentBudget: string;
  // Realtor specific
  agencyName: string;
  experience: string;
}

const initialFormData: FormData = {
  userType: null,
  fullName: '',
  email: '',
  phone: '',
  investmentBudget: '',
  agencyName: '',
  experience: '',
};

export default function WaitlistForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectUserType = (type: UserType) => {
    setFormData({ ...formData, userType: type });
    setStep(2);
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call (will be replaced with Airtable)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Waitlist submission:', formData);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="form-card" style={{ animation: 'fadeIn 0.5s ease' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="success-icon">
            <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#535D66', marginBottom: '0.5rem' }}>
            Welcome to COOWN!
          </h3>
          <p style={{ color: 'rgba(83, 93, 102, 0.7)', marginBottom: '1.5rem' }}>
            {formData.userType === 'realtor'
              ? "We're excited to have you as a partner realtor."
              : "You're one step closer to co-owning premium properties."}
          </p>
          <p style={{ color: 'rgba(83, 93, 102, 0.7)', fontSize: '0.875rem' }}>
            We&apos;ll be in touch at <strong>{formData.email}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Step {step} of {totalSteps}</span>
          <span style={{ fontSize: '0.75rem', color: '#53857A', fontWeight: 500 }}>
            {step === 1 ? 'Choose Path' : step === 2 ? 'Your Details' : 'Almost Done'}
          </span>
        </div>
        <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${(step / totalSteps) * 100}%`,
              background: 'linear-gradient(to right, #53857A, #456e64)',
              borderRadius: '2px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Choose User Type */}
        {step === 1 && (
          <div style={{ animation: 'slideIn 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#535D66', marginBottom: '0.5rem', textAlign: 'center' }}>
              How would you like to join?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center', marginBottom: '1.5rem' }}>
              Select your path to get started
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => selectUserType('coowner')}
                style={{
                  padding: '1.25rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#53857A';
                  e.currentTarget.style.background = 'rgba(83, 133, 122, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = 'white';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'linear-gradient(135deg, #53857A, #456e64)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#535D66', marginBottom: '0.25rem' }}>
                      Property Co-Owner
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      Invest in premium properties with others
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectUserType('realtor')}
                style={{
                  padding: '1.25rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#53857A';
                  e.currentTarget.style.background = 'rgba(83, 133, 122, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = 'white';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'linear-gradient(135deg, #535D66, #3d454d)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#535D66', marginBottom: '0.25rem' }}>
                      Verified Realtor
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      List properties and connect with investors
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="button"
                disabled
                className="btn-primary"
                style={{ opacity: 0.6 }}
              >
                Join the Waitlist
              </button>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.5rem' }}>
                Select an option above to continue
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Basic Details */}
        {step === 2 && (
          <div style={{ animation: 'slideIn 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#535D66', marginBottom: '1.5rem', textAlign: 'center' }}>
              Tell us about yourself
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="fullName" className="form-label">Full Name</label>
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
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
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
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={prevStep}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#535D66',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.fullName || !formData.email || !formData.phone}
                className="btn-primary"
                style={{ flex: 2 }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Type-specific Details */}
        {step === 3 && (
          <div style={{ animation: 'slideIn 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#535D66', marginBottom: '1.5rem', textAlign: 'center' }}>
              {formData.userType === 'realtor' ? 'Your Realtor Profile' : 'Your Investment Goals'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.userType === 'coowner' ? (
                <div>
                  <label htmlFor="investmentBudget" className="form-label">
                    Investment Budget Range
                  </label>
                  <select
                    id="investmentBudget"
                    name="investmentBudget"
                    value={formData.investmentBudget}
                    onChange={handleChange}
                    required
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select your budget</option>
                    <option value="5-10m">N5M - N10M</option>
                    <option value="10-25m">N10M - N25M</option>
                    <option value="25-50m">N25M - N50M</option>
                    <option value="50-100m">N50M - N100M</option>
                    <option value="100m+">N100M+</option>
                  </select>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="agencyName" className="form-label">
                      Agency / Company Name
                    </label>
                    <input
                      type="text"
                      id="agencyName"
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your agency or company"
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="form-label">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0 - 2 years</option>
                      <option value="2-5">2 - 5 years</option>
                      <option value="5-10">5 - 10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={prevStep}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#535D66',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (formData.userType === 'coowner' ? !formData.investmentBudget : !formData.agencyName || !formData.experience)}
                className="btn-primary"
                style={{ flex: 2 }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span className="spinner" />
                    Joining...
                  </span>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
