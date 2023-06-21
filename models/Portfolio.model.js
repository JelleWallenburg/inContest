const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case

const portfolioSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    portfolioDescription: {
      type: String,
    },
    competition: [{ type: Schema.Types.ObjectId, ref: "Competition" }],
    sectionPerformance: [{ type: Schema.Types.ObjectId, ref: "Performance" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Portfolio = model("Portfoilio", portfolioSchema);

module.exports = Portfolio;
