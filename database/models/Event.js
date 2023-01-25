import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    end: { type: String },
    title: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
