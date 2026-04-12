function About() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>About Me</h1>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '24px', marginTop: '20px', flexWrap: 'wrap' }}>
        <img
          src="/art/Lucy.jpg"
          alt="Lucy artwork"
          style={{ width: '180px', height: 'auto', borderRadius: '10px', boxShadow: '0 5px 14px rgba(0,0,0,0.15)', flexShrink: 0, maxWidth: '100%' }}
        />
        <div
          style={{
            position: 'absolute',
            left: '210px',
            top: '70%',
            transform: 'translateY(-50%) rotate(-180deg)',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '40vw',
          }}
        >
          <img
            src="/art/Arrow.jpg"
            alt="Arrow pointing to image"
            style={{
              width: '400px',
              maxWidth: '100%',
              filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))',
            }}
          />
        </div>
        <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6', maxWidth: '650px', flex: 1 }}>
          Commissions please, furry's will be given preference. I specialize in vivid, expressive artwork with a focus
          on furry characters and creative portraits. Reach out to work together on your custom piece!
        </p>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .about-flex {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
          }
          img {
            width: 100% !important;
            max-width: 220px !important;
            margin-bottom: 10px !important;
          }
          h1 {
            font-size: 1.5em !important;
          }
          p {
            font-size: 1em !important;
          }
        }
      `}</style>
    </div>
  );
}

export default About;