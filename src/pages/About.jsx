function About() {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      <div className="about-flex">
        <img
          src="/art/Lucy.jpg"
          alt="Lucy artwork"
          className="about-photo"
        />
        <div className="about-arrow-wrap">
          <img
            src="/art/Arrow.jpg"
            alt="Arrow pointing to image"
            className="about-arrow"
          />
        </div>
        <p className="about-text">
          Commissions please, furry's will be given preference. I specialize in vivid, expressive artwork with a focus
          on furry characters and creative portraits. Reach out to work together on your custom piece!
        </p>
      </div>
      <style>{`
        .about-page {
          padding: 40px 20px;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .about-flex {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 24px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .about-photo {
          width: 180px;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 5px 14px rgba(0,0,0,0.15);
          flex-shrink: 0;
          max-width: 100%;
        }
        .about-arrow-wrap {
          position: absolute;
          left: 210px;
          top: 70%;
          transform: translateY(-50%) rotate(-180deg);
          display: flex;
          align-items: center;
          max-width: 40vw;
        }
        .about-arrow {
          width: 400px;
          max-width: 100%;
          filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
        }
        .about-text {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          max-width: 650px;
          flex: 1;
          text-align: left;
        }
        @media (max-width: 700px) {
          .about-page {
            padding: 24px 16px;
          }
          .about-page h1 {
            font-size: 1.5em;
          }
          .about-flex {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          .about-photo {
            width: 100%;
            max-width: 220px;
          }
          .about-arrow-wrap {
            position: static;
            transform: rotate(-180deg);
            max-width: 60vw;
            margin: 0 auto;
          }
          .about-arrow {
            width: 100%;
          }
          .about-text {
            text-align: center;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}

export default About;