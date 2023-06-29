const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case

const competitionSchema = new Schema(
  {
    name: { type: String, required: true },
    competitionDescription: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    usersInGroup: [{ type: Schema.Types.ObjectId, ref: "User" }],
    portfolio: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatecddAt`
    timestamps: true,
  }
);

const Competition = model("Competition", competitionSchema);

module.exports = Competition;
