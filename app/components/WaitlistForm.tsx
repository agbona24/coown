'use client';

import { useState, useEffect } from 'react';
import { sendToGoogleSheets } from '../lib/googleSheets';

// WhatsApp Group Links
const WHATSAPP_LINKS = {
  coowner: 'https://chat.whatsapp.com/KI2OI4OsgnZAxAFZwopMFx',
  realtor: 'https://chat.whatsapp.com/I6qTqjsYEzAHaAp6Fh8d38',
};

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
  const [step, setStep] = useState(0); // Start at 0 for initial button state
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
    if (step > 0) setStep(step - 1);
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate userType before submission
      if (!formData.userType) {
        throw new Error('Please select a user type');
      }

      const result = await sendToGoogleSheets({
        userType: formData.userType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        investmentBudget: formData.investmentBudget,
        agencyName: formData.agencyName,
        experience: formData.experience,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [countdown, setCountdown] = useState(5);

  // Countdown and redirect effect
  useEffect(() => {
    if (!isSubmitted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to WhatsApp group
          const link = formData.userType === 'realtor'
            ? WHATSAPP_LINKS.realtor
            : WHATSAPP_LINKS.coowner;
          window.open(link, '_blank');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, formData.userType]);

  if (isSubmitted) {
    const whatsappLink = formData.userType === 'realtor'
      ? WHATSAPP_LINKS.realtor
      : WHATSAPP_LINKS.coowner;

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
          <p style={{ color: 'rgba(83, 93, 102, 0.7)', marginBottom: '1rem' }}>
            {formData.userType === 'realtor'
              ? "We're excited to have you as a partner realtor."
              : "You're one step closer to co-owning premium properties."}
          </p>

          {/* Countdown */}
          <div style={{
            background: 'linear-gradient(135deg, #53857A, #456e64)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Joining WhatsApp Community in
            </p>
            <div style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1
            }}>
              {countdown}
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              seconds
            </p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#25D366',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      {/* Progress Bar - only show after step 0 */}
      {step > 0 && (
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
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 0: Initial Join Button */}
        {step === 0 && (
          <div style={{ animation: 'fadeIn 0.3s ease', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-primary"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.125rem'
              }}
            >
              Join the Waitlist
            </button>
          </div>
        )}

        {/* Step 1: Choose User Type */}
        {step === 1 && (
          <div style={{ animation: 'slideIn 0.3s ease' }}>
            <button
              type="button"
              onClick={prevStep}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginBottom: '1rem'
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
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
                    <option value="100k-500k">₦100K - ₦500K</option>
                    <option value="500k-1m">₦500K - ₦1M</option>
                    <option value="1m-10m">₦1M - ₦10M</option>
                    <option value="10m+">Above ₦10M</option>
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

            {/* Error Message */}
            {error && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                color: '#dc2626',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

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
