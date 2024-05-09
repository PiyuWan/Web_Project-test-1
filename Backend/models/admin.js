import mongoose from "mongoose";
import Movie from "./Movie.js"

const adminSchema = new mongoose.Schema({
    email:{
        type :String,
        unique : true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    addedMovies: [{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
       
    }]
})

export default mongoose.model("Admin",adminSchema);