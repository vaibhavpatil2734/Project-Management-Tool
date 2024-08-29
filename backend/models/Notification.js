const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
