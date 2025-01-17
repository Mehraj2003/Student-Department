const Department = require("../../models/Department");


//add department
const addDepartment = async (req, res) => {
  try {
    const { name, description, icon, status } = req.body;

    // Validate required fields
    if (!name || !description || !icon) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    // Create a new department document
    const department = new Department({
      name,
      description,
      icon,
      status
    });

    // Save the department to the database
    await department.save();

    res.json({ message: 'Department added successfully', department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// edit department

const editDepartment = async (req, res) => {
    try {
      const { departmentId } = req.params;
      const updatedData = req.body;
  
      // Validate required field
      if (!departmentId) {
        return res.status(400).json({ error: 'Department ID is a required field' });
      }
  
      // Find the department by ID and update it
      const department = await Department.findByIdAndUpdate(departmentId, updatedData, { new: true });
  
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      res.json({ message: 'Department updated successfully', department });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



//   delete department
const deleteDepartment = async (req, res) => {
    try {
      const { departmentId } = req.params;
  
      // Validate required field
      if (!departmentId) {
        return res.status(400).json({ error: 'Department ID is a required field' });
      }
  
      // Find and delete the department by ID
      const department = await Department.findByIdAndDelete(departmentId);
  
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      res.json({ message: 'Department deleted successfully', department });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  // get all departments

    const getAllDepartments = async (req, res) => {
        try {
          const departments = await Department.find();
      
          res.json({ message: 'All departments fetched successfully', departments });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    

// get department by id
 
const getDepartmentById = async (req, res) => {

    try {
      const { departmentId } = req.params;
  
      // Validate required field
      if (!departmentId) {
        return res.status(400).json({ error: 'Department ID is a required field' });
      }
  
      // Find the department by ID
      const department = await Department.findById(departmentId);
  
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      res.json({ message: 'Department fetched successfully', department });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



module.exports = {
    addDepartment,
    editDepartment,
    deleteDepartment,
    getAllDepartments,
    getDepartmentById
};
