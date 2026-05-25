const VehicleService = require('../schema/services');
const Vehicle = require("../schema/vehical");

const mongoose = require("mongoose")
const addVehicleService = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { vehicle_id, center_name, service_type, date, status, notes } = req.body;

    if (!vehicle_id || !center_name || !service_type || !date) {
      return res.status(400).json({
        status: false,
        message: "vehicle_id, center_name, service_type, and date are required",
      });
    }

    const vehicle = await Vehicle.findOne({ _id: vehicle_id, user_id });
    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found or does not belong to you",
      });
    }

    const service = await VehicleService.create({
      vehicle_id,
      user_id,
      center_name,
      service_type,
      date,
      status: status || "pending",
      notes: notes || null,
    });

    return res.status(201).json({
      status: true,
      message: "Service record added successfully",
      data: service,
    });
  } catch (err) {
    console.error("addVehicleService error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};


const getVehicleServices = async (req, res) => {
  try {
    const { vehicle_id } = req.query;
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;
 
    if (!vehicle_id) {
      return res.status(400).json({
        status: false,
        message: "vehicle_id is required",
      });
    }
 
    if (!mongoose.Types.ObjectId.isValid(vehicle_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid vehicle_id format",
      });
    }
 
    const vehicleObjectId = new mongoose.Types.ObjectId(vehicle_id);
 
    // Check vehicle exists only by _id (user_id string vs ObjectId mismatch avoided)
    const vehicle = await Vehicle.findById(vehicleObjectId);
    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
 
    const [services, total] = await Promise.all([
      VehicleService.find({ vehicle_id: vehicleObjectId })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      VehicleService.countDocuments({ vehicle_id: vehicleObjectId }),
    ]);
 
    const formatted = services.map((s) => ({
      service_id:   s._id,
      center_name:  s.center_name,
      service_type: s.service_type,
      date:         s.date.toISOString().split("T")[0],
      status:       s.status,
      notes:        s.notes,
    }));
 
    return res.status(200).json({
      status: true,
      message: "Service history fetched successfully",
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getVehicleServices error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};
 

module.exports = { addVehicleService, getVehicleServices };