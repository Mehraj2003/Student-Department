const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  school: {
    type: String
  },
  college: {
    type: String
  },
applicationStatus:{
	type:Boolean
},
  rollNo: {
    type: String
  },
mobileNo:{
	type:String
}, 

}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
