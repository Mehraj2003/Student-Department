const Department = require("../../models/Department");
const Student = require("../../models/Student");

const addStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      dateOfBirth,
      department,
      address,
      email,
      school,
      college,
      rollNo,
      applicationStatus
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !age) {
      return res
        .status(400)
        .json({ error: "First name, last name, and age are required fields" });
    }

    // Create a new student document
    const student = new Student({
      firstName,
      lastName,
      age,
      gender,
      dateOfBirth,
      department,
      address,
      email,
      school,
      college,
      applicationStatus,
      rollNo,
    });

    // Save the student to the database
    await student.save();

    res.json({ message: "Student added successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// edit student

const editStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    // Validate required fields
    if (!updatedData.firstName || !updatedData.lastName || !updatedData.age) {
      return res
        .status(400)
        .json({ error: "First name, last name, and age are required fields" });
    }

    // Find the student by ID and update it
    const student = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete student

const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.query;

    // Validate required field
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is a required field" });
    }

    // Find and delete the student by ID
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getAllStudents

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getSingleStudentById

const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Validate required field
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is a required field" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const enrollStudentToDepartment = async (req, res) => {
  try {
    const { studentId, departmentId } = req.body;

    // Validate required fields
    if (!studentId || !departmentId) {
      return res
        .status(400)
        .json({ error: "Student ID and department ID are required fields" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Enroll the student into the department
    department.students.push(student);
    student.department = department;
    await student.save();
    await department.save();

    res.json({ message: "Student enrolled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchStudentsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const students = await Student.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addStudent,
  editStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  enrollStudentToDepartment,
  searchStudentsByName,
};
