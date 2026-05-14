import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema ({
    subscriber:{
        type:Schema.Types.ObjectId,  // onw who is Subscribing 
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,  // the channel being subscribed to
        ref:"User"
    }
},{timestamps:true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema )