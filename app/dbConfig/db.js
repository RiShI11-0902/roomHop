import mongoose from 'mongoose'

const connection = async ()=>{
    const connectionUrl = 'mongodb+srv://rishi:nrarVWGs6IJLpADk@cluster0.sirc6hl.mongodb.net/roomhop?retryWrites=true&w=majority'

    mongoose.connect((connectionUrl)).then(()=>console.log('App connected')).catch(error => console.log(error))
}

export default connection;