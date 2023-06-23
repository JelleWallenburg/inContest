const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case

const portfolioSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    referenceDate: {type: Date},
    totalAccount: { type: Number, required: true },
    totalPortfolio: { type: Number, required: true },
    totalResult: { type: Number, required: true }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//Create unique compound index
portfolioSchema.index({createdBy: 1, referenceDate: 1},{unique: true});

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
