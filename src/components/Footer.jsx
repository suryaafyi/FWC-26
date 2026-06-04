import React from 'react';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-flags">
        <div className="flag-footer usa" title="USA"></div>
        <div className="flag-footer mex" title="MEX"></div>
        <div className="flag-footer can" title="CAN"></div>
      </div>
      <span className="footer-wordmark">FIFA World Cup 2026™</span>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Host Cities</a>
        <a href="#">Contact</a>
      </div>
      <p className="footer-copy">© 2026 FIFA. WE ARE 26.</p>
    </footer>
  );
}
