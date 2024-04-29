const path = require("path");
const redis = require("redis");
const redisClient = redis.createClient();
const Vacancy = require("../models/vacancy");

exports.createVacancy = async (req, res) => {
  try {
    const newVacancy = new Vacancy(req.body);
    await newVacancy.save();
    res.status(201).json({
      success: true,
      message: 'Vacancy created successfully',
      data: newVacancy,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating vacancy',
      error: error.message, // Optional: Include specific error message for debugging
    });
  }
};
exports.getVacancies = async (req, res) => {
    try {
      const vacancies = await Vacancy.find();
      res.json({
        success: true,
        data: vacancies,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error fetching vacancies',
        error: error.message,
      });
    }
  };
  exports.getVacancyById = async (req, res) => {
    try {
      const vacancy = await Vacancy.findById(req.params.id);
      if (!vacancy) {
        return res.status(404).json({
          success: false,
          message: 'Vacancy not found',
        });
      }
      res.json({
        success: true,
        data: vacancy,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error fetching vacancy',
        error: error.message,
      });
    }
  };
  exports.updateVacancy = async (req, res) => {
    try {
      // Optional Input Validation (add validation logic here)
      const { title, description, department, location, requirements, benefits, applicationEmail, closingDate, isActive } = req.body;
  
      const updatedVacancy = await Vacancy.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description, department, location, requirements, benefits, applicationEmail, closingDate, isActive } },
        { new: true } // Return the updated document
      );
  
      if (!updatedVacancy) {
        return res.status(404).json({
          success: false,
          message: 'Vacancy not found',
        });
      }
  
      res.json({
        success: true,
        message: 'Vacancy updated successfully',
        data: updatedVacancy,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error updating vacancy',
        error: error.message, // Optional: Include specific error message for debugging
      });
    }
  };  
  exports.deleteVacancy = async (req, res) => {
    try {
      const deletedVacancy = await Vacancy.findByIdAndDelete(req.params.id);
      if (!deletedVacancy) {
        return res.status(404).json({
          success: false,
          message: 'Vacancy not found',
        });
      }
      res.json({
        success: true,
        message: 'Vacancy deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error deleting vacancy',
        error: error.message,
      });
    }
  };
  