// const mongoose = require("mongoose");
// const Vehicle = require("../schema/vehical");
// const Booking = require("../schema/booking");
// const addVehicle = async (req, res) => {
//   try {
//     const {
//       type_id,
//       brand_id,
//       model_id,
//       fuel_type,
//       year,
//       Is_active,
//       registration_number,
//       motor_policy_number,
//     } = req.body;

  
//     const user_id = new mongoose.Types.ObjectId(req.user.id);

//     if (!user_id) {
//       return res.status(401).json({ status: false, message: "Unauthorized" });
//     }


//     if (!mongoose.Types.ObjectId.isValid(type_id)) {
//       return res.status(400).json({ status: false, message: "Invalid type_id" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(brand_id)) {
//       return res.status(400).json({ status: false, message: "Invalid brand_id" });
//     }
//     if (!mongoose.Types.ObjectId.isValid(model_id)) {
//       return res.status(400).json({ status: false, message: "Invalid model_id" });
//     }

//     const vehicle = await Vehicle.create({
//       user_id,
//       type_id,
//       brand_id,
//       model_id,
//       fuel_type,
//       year,
//       is_active: Is_active,
//       registration_number,
//       motor_policy_number,
//       front_photo: req.files?.front_photo?.[0]?.path || null,
//       rear_photo: req.files?.rear_photo?.[0]?.path || null,
//     });

//     return res.status(201).json({
//       status: true,
//       message: "Vehicle added successfully",
//       data: vehicle,
//     });

//   } catch (err) {
//     console.error("addVehicle error:", err);
//     return res.status(500).json({
//       status: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };


// const getAllVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find({ 
//    user_id: new mongoose.Types.ObjectId(req.user.id) 
//   })
//       .populate("type_id", "name")
//       .populate("brand_id", "name")
//       .populate("model_id", "name")
//       .sort({ createdAt: -1 });


//        const transformedVehicles = vehicles.map(vehicle => ({
//       ...vehicle.toObject(),
//       type_id: vehicle.type_id?._id,
//       type_name: vehicle.type_id?.name,
//       brand_id: vehicle.brand_id?._id,
//       brand_name: vehicle.brand_id?.name,
//       model_id: vehicle.model_id?._id,
//       model_name: vehicle.model_id?.name,
//       createdAt: vehicle.createdAt,
//       updatedAt: vehicle.updatedAt
//     }));
//     return res.status(200).json({
//       status: true,
//       message: "All vehicles fetched successfully",
//       data: transformedVehicles,
//     });
//   } catch (err) {
//     console.error("getAllVehicles error:", err);
//     return res.status(500).json({
//       status: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };


// const getVehicleDetail = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const vehicle = await Vehicle.findById(id)
//       .populate("type_id", "name")
//       .populate("brand_id", "name")
//       .populate("model_id", "name");

//     if (!vehicle) {
//       return res.status(404).json({
//         status: false,
//         message: "Vehicle not found"
//       });
//     }

//     const transformedVehicle = {
//       ...vehicle.toObject(),

//       type_id: vehicle.type_id?._id,
//       type_name: vehicle.type_id?.name,

//       brand_id: vehicle.brand_id?._id,
//       brand_name: vehicle.brand_id?.name,

//       model_id: vehicle.model_id?._id,
//       model_name: vehicle.model_id?.name,

//       createdAt: vehicle.createdAt,
//       updatedAt: vehicle.updatedAt
//     };

//     return res.status(200).json({
//       status: true,
//       message: "Vehicle details fetched successfully",
//       data: transformedVehicle,
//     });

//   } catch (err) {
//     console.error("getVehicleDetail error:", err);

//     return res.status(500).json({
//       status: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };


// const updateVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = req.body || {};

//     const {
//       type_id,
//       brand_id,
//       model_id,
//       fuel_type,
//       year,
//       is_active,
//       registration_number,
//       motor_policy_number,
//     } = body;

//     if (type_id && !mongoose.Types.ObjectId.isValid(type_id)) {
//       return res.status(400).json({ status: false, message: "Invalid type_id" });
//     }
//     if (brand_id && !mongoose.Types.ObjectId.isValid(brand_id)) {
//       return res.status(400).json({ status: false, message: "Invalid brand_id" });
//     }
//     if (model_id && !mongoose.Types.ObjectId.isValid(model_id)) {
//       return res.status(400).json({ status: false, message: "Invalid model_id" });
//     }

//     const vehicle = await Vehicle.findById(id);

//     if (!vehicle) {
//       return res.status(404).json({ status: false, message: "Vehicle not found" });
//     }

//     if (type_id) vehicle.type_id = type_id;
//     if (brand_id) vehicle.brand_id = brand_id;
//     if (model_id) vehicle.model_id = model_id;
//     if (fuel_type) vehicle.fuel_type = fuel_type;
//     if (year) vehicle.year = year;
//     if (typeof is_active !== "undefined") vehicle.is_active = is_active;
//     if (registration_number) vehicle.registration_number = registration_number;
//     if (motor_policy_number) vehicle.motor_policy_number = motor_policy_number;

//     if (req.files?.front_photo?.[0]?.path) vehicle.front_photo = req.files.front_photo[0].path;
//     if (req.files?.rear_photo?.[0]?.path) vehicle.rear_photo = req.files.rear_photo[0].path;

//     await vehicle.save();

//     return res.status(200).json({
//       status: true,
//       message: "Vehicle updated successfully",
//       data: vehicle,
//     });

//   } catch (err) {
//     console.error("updateVehicle error:", err);
//     return res.status(500).json({
//       status: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };


// const deleteVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const vehicle = await Vehicle.findById(id);

//     if (!vehicle) {
//       return res.status(404).json({ status: false, message: "Vehicle not found" });
//     }

//     await Vehicle.findByIdAndDelete(id);

//     return res.status(200).json({
//       status: true,
//       message: "Vehicle deleted successfully",
//     });

//   } catch (err) {
//     console.error("deleteVehicle error:", err);
//     return res.status(500).json({
//       status: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };

// module.exports = { addVehicle, getAllVehicles, getVehicleDetail, updateVehicle, deleteVehicle };
const mongoose = require("mongoose");
const Vehicle = require("../schema/vehical");
const Booking = require("../schema/booking");

const addVehicle = async (req, res) => {
  try {
    const {
      type_id,
      brand_id,
      model_id,
      fuel_type,
      year,
      Is_active,
      registration_number,
      motor_policy_number,
    } = req.body;

    const user_id = new mongoose.Types.ObjectId(req.user.id);

    if (!user_id) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(type_id)) {
      return res.status(400).json({ status: false, message: "Invalid type_id" });
    }
    if (!mongoose.Types.ObjectId.isValid(brand_id)) {
      return res.status(400).json({ status: false, message: "Invalid brand_id" });
    }
    if (!mongoose.Types.ObjectId.isValid(model_id)) {
      return res.status(400).json({ status: false, message: "Invalid model_id" });
    }

    const vehicle = await Vehicle.create({
      user_id,
      type_id,
      brand_id,
      model_id,
      fuel_type,
      year,
      is_active: Is_active,
      registration_number,
      motor_policy_number,
      front_photo: req.files?.front_photo?.[0]?.path || null,
      rear_photo: req.files?.rear_photo?.[0]?.path || null,
    });

    return res.status(201).json({
      status: true,
      message: "Vehicle added successfully",
      data: vehicle,
    });

  } catch (err) {
    console.error("addVehicle error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};


const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      user_id: new mongoose.Types.ObjectId(req.user.id)
    })
      .populate("type_id", "name")
      .populate("brand_id", "name")
      .populate("model_id", "name")
      .sort({ createdAt: -1 });

    const transformedVehicles = await Promise.all(vehicles.map(async (vehicle) => {
      const v = vehicle.toObject();

      const bookings = await Booking.find({
        vehicle_id: v.vehicle_id,
        booking_status: { $in: ["completed", "picked_up", "in_service"] }
      }).sort({ createdAt: -1 }).lean();

      return {
        ...v,
        type_id:           vehicle.type_id?._id,
        type_name:         vehicle.type_id?.name,
        brand_id:          vehicle.brand_id?._id,
        brand_name:        vehicle.brand_id?.name,
        model_id:          vehicle.model_id?._id,
        model_name:        vehicle.model_id?.name,
        total_pickups:     bookings.length,
        last_service_date: bookings.length > 0 ? bookings[0].pickup_date : null,
      };
    }));

    return res.status(200).json({
      status: true,
      message: "All vehicles fetched successfully",
      data: transformedVehicles,
    });
  } catch (err) {
    console.error("getAllVehicles error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};


const getVehicleDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id)
      .populate("type_id", "name")
      .populate("brand_id", "name")
      .populate("model_id", "name");

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found"
      });
    }

    const v = vehicle.toObject();

    const bookings = await Booking.find({
      vehicle_id: v.vehicle_id,
      booking_status: { $in: ["completed", "picked_up", "in_service"] }
    }).sort({ createdAt: -1 }).lean();

    const transformedVehicle = {
      ...v,
      type_id:           vehicle.type_id?._id,
      type_name:         vehicle.type_id?.name,
      brand_id:          vehicle.brand_id?._id,
      brand_name:        vehicle.brand_id?.name,
      model_id:          vehicle.model_id?._id,
      model_name:        vehicle.model_id?.name,
      total_pickups:     bookings.length,
      last_service_date: bookings.length > 0 ? bookings[0].pickup_date : null,
    };

    return res.status(200).json({
      status: true,
      message: "Vehicle details fetched successfully",
      data: transformedVehicle,
    });

  } catch (err) {
    console.error("getVehicleDetail error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};


const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const {
      type_id,
      brand_id,
      model_id,
      fuel_type,
      year,
      is_active,
      registration_number,
      motor_policy_number,
    } = body;

    if (type_id && !mongoose.Types.ObjectId.isValid(type_id)) {
      return res.status(400).json({ status: false, message: "Invalid type_id" });
    }
    if (brand_id && !mongoose.Types.ObjectId.isValid(brand_id)) {
      return res.status(400).json({ status: false, message: "Invalid brand_id" });
    }
    if (model_id && !mongoose.Types.ObjectId.isValid(model_id)) {
      return res.status(400).json({ status: false, message: "Invalid model_id" });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ status: false, message: "Vehicle not found" });
    }

    if (type_id) vehicle.type_id = type_id;
    if (brand_id) vehicle.brand_id = brand_id;
    if (model_id) vehicle.model_id = model_id;
    if (fuel_type) vehicle.fuel_type = fuel_type;
    if (year) vehicle.year = year;
    if (typeof is_active !== "undefined") vehicle.is_active = is_active;
    if (registration_number) vehicle.registration_number = registration_number;
    if (motor_policy_number) vehicle.motor_policy_number = motor_policy_number;

    if (req.files?.front_photo?.[0]?.path) vehicle.front_photo = req.files.front_photo[0].path;
    if (req.files?.rear_photo?.[0]?.path) vehicle.rear_photo = req.files.rear_photo[0].path;

    await vehicle.save();

    return res.status(200).json({
      status: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });

  } catch (err) {
    console.error("updateVehicle error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};


const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ status: false, message: "Vehicle not found" });
    }

    await Vehicle.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Vehicle deleted successfully",
    });

  } catch (err) {
    console.error("deleteVehicle error:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal server error",
    });
  }
};

module.exports = { addVehicle, getAllVehicles, getVehicleDetail, updateVehicle, deleteVehicle };