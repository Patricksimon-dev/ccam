import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaHandsHelping, FaCalendarAlt, FaEnvelope, FaUser, FaTag, FaCommentAlt, FaSpinner } from 'react-icons/fa';
import { api } from '../api/client';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/contact', formData);
      toast.success(res.data?.message || 'Your message has been sent successfully. We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-card glass-card">
      <div className="contact-shell">
        <div className="contact-copy">
          <span className="section-eyebrow">Get in touch</span>
          <h2 className="section-title">Send Us a Message</h2>
          <p className="contact-subtitle">
            We would love to hear from you. Reach out for prayer requests, church inquiries,
            counseling, or ways to connect with our community.
          </p>

          <div className="contact-highlights">
            <div className="contact-highlight">
              <div className="highlight-icon-wrap">
                <FaHandsHelping />
              </div>
              <div>
                <span className="highlight-title">Prayer & Pastoral Support</span>
                <span>Share your prayer needs and our pastoral team will stand with you in faith.</span>
              </div>
            </div>
            <div className="contact-highlight">
              <div className="highlight-icon-wrap">
                <FaCalendarAlt />
              </div>
              <div>
                <span className="highlight-title">Weekly Fellowship</span>
                <span>Inquire about service times, locations, ministries, and upcoming events.</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <label className="form-field">
              <span><FaUser className="field-icon" /> Full Name</span>
              <input
                className="form-input"
                name="name"
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label className="form-field">
              <span><FaEnvelope className="field-icon" /> Email Address</span>
              <input
                className="form-input"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label className="form-field full-width">
              <span><FaTag className="field-icon" /> Subject</span>
              <input
                className="form-input"
                name="subject"
                type="text"
                placeholder="How can we assist or pray with you?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field full-width">
              <span><FaCommentAlt className="field-icon" /> Message</span>
              <textarea
                className="form-input"
                name="message"
                placeholder="Write your message or prayer request here..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full submit-btn">
            {loading ? (
              <>
                <FaSpinner className="btn-icon spinner-icon" /> Sending Message...
              </>
            ) : (
              <>
                <FaPaperPlane className="btn-icon" /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
