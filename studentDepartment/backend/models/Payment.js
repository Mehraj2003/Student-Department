const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentMode: {
    type: String
  },
  incomeCertificate: {
    type: String
  },
  casteCertificate: {
    type: String
  },
  organization: {
    type: String
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  studentName: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  aadharNumber: {
    type: String
  },
  caste: {
    type: String
  },
  minority: {
    type: Boolean
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
