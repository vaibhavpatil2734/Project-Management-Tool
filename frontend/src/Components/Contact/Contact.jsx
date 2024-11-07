import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupMessage('Form submitted successfully!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Automatically hide the message after 3 seconds
    setTimeout(() => setPopupMessage(''), 3000);
  };

  return (
    <div className="contact-page">
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <h1 className="contact-heading">Get in Touch</h1>

        {popupMessage && (
          <motion.div 
            className="popup-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {popupMessage}
          </motion.div>
        )}

        <motion.form 
          className="contact-form"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <motion.input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              placeholder="Your Name"
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <motion.input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Message</label>
            <motion.textarea 
              id="message" 
              name="message"
              value={formData.message}
              placeholder="Your Message"
              rows="6"
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }} 
            />
          </div>

          <motion.button 
            className="submit-btn"
            type="submit"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
