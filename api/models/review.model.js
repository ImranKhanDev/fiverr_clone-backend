import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  gigId:{
    type:String,
    required:true,
  },
  userId:{
    type:Number,
    required:true,
  },
  desc:{
    type:String,
    required:true,
  },
  star:{
    type:Number,
    required:true,
    enum:[1,2,3,4,5]
  },
}
  , { timestamps:true},
);
export default mongoose.model('Review',ReviewSchema)