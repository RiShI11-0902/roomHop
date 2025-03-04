import mongoose from 'mongoose'

const connection = async ()=>{
    const connectionUrl = process.env.DB_URL
    console.log(connectionUrl);
    
   await mongoose.connect((connectionUrl)).then(()=>console.log(' connected')).catch(error => console.log(error))
}

export default connection;