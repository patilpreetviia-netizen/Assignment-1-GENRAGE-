import React from 'react';

function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ACCESS GRANTED: Priority database notification established.');
  };

  return (
    <section className="news-container">
      <div className="news-box">
        <span className="sub-mono">// DIRECT NOTIFICATIONS</span>
        <h3 className="raw-title" style={{ fontSize: '24px', marginTop: '12px' }}>DROP DATABASE</h3>
        <form onSubmit={handleSubmit} className="news-input-wrapper">
          <input type="email" placeholder="SECURE CLIENT ACCESS EMAIL" className="news-field" required />
          <button type="submit" className="news-submit-btn">SUBMIT</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;