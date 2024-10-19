const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

requestRouter.post(
  "/connection/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type " + status });
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      // console.log("existingConnectionRequest===>", existingConnectionRequest);

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.status(200).json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        connectionRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      // console.log("loggedInUser===>", loggedInUser);
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      // console.log("connectionRequest===>", connectionRequest);

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = requestRouter;
