import WaitlistForm from './components/WaitlistForm';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #53857A, rgba(83, 133, 122, 0.95), #535D66)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Pattern Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div className="logo-circle" />
              <div className="logo-circle" style={{ marginLeft: '-0.75rem' }} />
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.05em'
            }}>COOWN</h1>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            backdropFilter: 'blur(4px)'
          }}>
            Launching Soon
          </span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'white',
          marginBottom: '3rem'
        }}>
          Own Together,<br />
          <span style={{ opacity: 0.9 }}>Earn Together</span>
        </h2>

        {/* Waitlist Form */}
        <WaitlistForm />

        {/* Footer */}
        <p style={{
          marginTop: '3rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.875rem'
        }}>
          © 2025 COOWN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
