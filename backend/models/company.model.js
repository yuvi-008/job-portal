import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    website: {
        type: String, // url to company logo
       
    },
    logo: {
        type: String,
       
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true

});
export const Company = mongoose.model("Company", companySchema);