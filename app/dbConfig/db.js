import mongoose from 'mongoose'

const connection = async ()=>{
    const connectionUrl = process.env.DB_URL

    mongoose.connect((connectionUrl)).then(()=>console.log('App connected')).catch(error => console.log(error))
}

export default connection;