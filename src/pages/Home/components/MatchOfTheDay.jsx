import React from 'react';

export default function MatchOfTheDay() {
  return (
    <section className="container py-2xl reveal-up">
      <h2 className="text-heading-md mb-xl">Match of the Day</h2>
      <div className="motd-card">
        {/* Background panels */}
        <div className="motd-sides">
          <div className="motd-side-left">
            <div className="motd-background-text">KOREA</div>
          </div>
          <div className="motd-side-right">
            <div className="motd-background-text">CZECH</div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="motd-content">
          <div className="flex flex-col items-center gap-md">
            <div className="motd-teams-row">
              <div className="motd-team-info">
                <span className="motd-team-code">KOR</span>
                <span className="motd-team-fullname">REPUBLIC OF KOREA</span>
              </div>
              <div className="motd-vs-badge">
                <span>VS</span>
              </div>
              <div className="motd-team-info">
                <span className="motd-team-code">CZE</span>
                <span className="motd-team-fullname">CZECHIA</span>
              </div>
            </div>
            <div className="motd-cta-row">
              <button className="btn-motd-preview">PREVIEW MATCH</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
