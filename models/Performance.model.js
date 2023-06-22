const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case

const performanceSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    // portfolio: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }], -> I do not think this is necessary
    referenceDate: Date,
    totalAccount: { type: Number, required: true },
    totalPortfolio: { type: Number, required: true },
    totalResult: { type: Number, required: true }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Performance = model("Performance", performanceSchema);

module.exports = Performance;
