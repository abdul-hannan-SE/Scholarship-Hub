const { getPrograms, getSingleProgram } = require("../utils/shared");
const id_validator = require("../../controllers/utils/IdValidator");
require("dotenv").config();
const { User } = require("../../models/user");
const ChatBox = require("../../models/Conversation");
const { Stripe } = require("stripe");
const { createConfirmedPaymentIntent } = require("../../services/stripe");
exports.getPrograms = getPrograms;
const Noti = require("../../models/notification");
const fs = require("fs");
const path = require("path");

exports.getSingleProgram = getSingleProgram;

exports.hireExpert = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { paymentMethodId, expertId } = req.body;
    const id = id_validator.validateID(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "No such user exists" });
    }

    if (
      !["CollegeStudent", "UniversityStudent", "PostGraduateStudent"].includes(
        user.role
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "Only students can hire experts , not admin or agent(expert)",
        });
    }

    const expert = await User.findById(expertId);
    if (!expert) {
      return res.status(400).json({ message: "No such expert exists" });
    }

    const chatBox = await ChatBox.findOne({
      sender: userId,
      receiver: expertId,
    });

    if (chatBox) {
      return res
        .status(400)
        .json({ message: "You have already hired this expert" });
    }

    const resp = await createConfirmedPaymentIntent(
      "1000",
      userId,
      paymentMethodId
    );
    if (resp?.error) {
      return res.status(400).json({ message: resp.error.message });
    }

    if (resp.paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment unsuccessfull" });
    }

    const newChatBox = new ChatBox({
      sender: userId,
      receiver: expertId,
      latest_message: user.username + " has hired " + expert.username,
    });

    await newChatBox.save();

    return res
      .status(201)
      .json({ message: "Expert hired! , you can now chat with this expert" });
  } catch (err) {
    if (!err.satusCode) err.satusCode = 500;
    next(err);
  }
};

exports.getAppExpert = async (req, res) => {
  try {
    const experts = await User.find({ role: "Agent" });
    return res.status(200).json({ experts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getExpertById = async (req, res) => {
  try {
    const expert = await User.findById(req.params.id);
    if (!expert) {
      return res.status(400).json({ message: "No such expert exists" });
    }
    return res.status(200).json({ expert });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getNotificationByRegion = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "No such user exists" });
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    nextDayDate.setHours(0, 0, 0, 0);


    const notifications = await Noti.find({
      regions: { $in: [user.province] },
      createdAt: { $gt: currentDate  , $lt : nextDayDate}
    }).populate({path : "related_program" , select : " title description targetedRegions"});

    return res.status(200).json({notifications});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyDetails=async(req ,res)=>{
  try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "No such user exists" });
      }

      if(!user.role.includes("Student")){
        return res.status(400).json({ message: "You are not a student , cannot get profile" });
      }

      return res.status(200).json({ user });
  } catch (error) {
        return res.status(500).json({ message: error.message });
  }
}




exports.updateMyDetails=async(req ,res)=>{
  try {
        const {username , age , password , province ,hasOtherScholarship , monthlyIncome ,role , cgpa}= req.body;
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "No such user exists" });
      }

      if(!user.role.includes("Student")){
        return res.status(400).json({ message: "You are not a student , cannot edit profile" });
      }

      user.username=username;
      user.age=age;
      user.password=password;
      user.province=province;
      user.hasOtherScholarship=hasOtherScholarship;
      user.monthlyIncome=monthlyIncome;
      user.role=role;
      user.cgpa=cgpa;
      await user.save();
         
      return res.status(201).json({ message : "Details updated successfully!" , user});
  } catch (error) {
        return res.status(500).json({ message: error.message });
      }


}

exports.updateProfilePic=async(req , res)=>{
     try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "No such user exists" });
      }

      if(req.file){
            
        if(user?.imageUrl){
          const filePath = path.join(__dirname, ".." , "..", user.imageUrl.split("localhost:8080/")[1]);
                           // Check if file exists
        // fs.access(filePath);

        // File exists, delete it
         fs.unlinkSync(filePath , ()=>{

         });

        }

        user.imageUrl = "http://localhost:8080/images/user_profile_pics/" + req.file.filename;
        await user.save();
      }

      res.status(201).json({message : "Profile pic updated successfully!" , user});
     } catch (error) {
        return res.status(500).json({ message: error.message });
     }
}


