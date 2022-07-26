import mongoose from 'mongoose'

const connectDB = (url) =>
    mongoose.connect(url).then(() => {
        console.log('MongoDB connected')
    })

export default connectDB
