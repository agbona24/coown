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
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{ paddingTop: '2rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div className="logo-circle" />
                <div className="logo-circle" style={{ marginLeft: '-0.75rem' }} />
              </div>
              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.05em'
              }}>COOWN</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem'
        }}>
          <div style={{
            maxWidth: '72rem',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Column - Hero Content */}
            <div style={{ color: 'white' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)'
                  }}>
                    Coming Soon
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: '1rem'
                }}>
                  Own Together,<br />
                  <span style={{ opacity: 0.9 }}>Earn Together</span>
                </h2>

                <p style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  opacity: 0.9,
                  lineHeight: 1.6,
                  maxWidth: '32rem'
                }}>
                  Nigeria&apos;s premier fractional property ownership platform
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <FeatureItem
                  icon="🏘️"
                  text="Co-invest in high-value properties from ₦5M"
                />
                <FeatureItem
                  icon="📊"
                  text="Track your portfolio and earn annual returns"
                />
                <FeatureItem
                  icon="🤝"
                  text="Join verified investors and trusted realtors"
                />
                <FeatureItem
                  icon="🔒"
                  text="Transparent ownership with legal protection"
                />
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div>
                  <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>500+</div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Early Signups</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>₦2B+</div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Property Value</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>20+</div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Verified Realtors</div>
                </div>
              </div>
            </div>

            {/* Right Column - Waitlist Form */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WaitlistForm />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '2rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem'
          }}>
            <p>© 2025 COOWN. All rights reserved. | Own Together, Earn Together.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div className="feature-icon">
        {icon}
      </div>
      <p style={{ opacity: 0.9, fontSize: '1.125rem' }}>{text}</p>
    </div>
  );
}
