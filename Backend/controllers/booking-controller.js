import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import bookings from "../models/Movie.js"

export const newBooking = async(req,res,next)=>{
    const{movie,date,seatNumber,user} = req.body;

    let existingUser;
    let existingMovie;
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if(!existingMovie){
        return res.status(404).json({message:"Movie not found with given ID"});
    }

    if(!existingUser){
        return res.status(404).json({message:"User not found with given ID"});
    }
    
    let newBooking;
    try {
        newBooking = new Bookings({
            movie,
            date:new Date(`${date}`),
            seatNumber,
            user

        });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.booking.push(newBooking);
    existingMovie.bookings.push(newBooking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await newBooking.save({ session });
    session.commitTransaction();
    

    
        
    } catch (err) {
        return console.log(err);
        
    }
    if(!newBooking){
        return res.status(500).json({message:"Unable to create a booking"});
    }

    return res.status(201).json({newBooking});
}

export const getBookingById = async(req,res,next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findById(id);
    } catch (err) {
        return console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(200).json({ booking })
}

export const deleteBooking = async(req,res,next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("movie user");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.booking.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();

    } catch (err) {
        return console.log(err);
        
    }
    if(!booking){
        return res.status(500).json({message: "Unable to Delete"});
    }

    return res.status(200).json({message: "Delete Successfully"});
}