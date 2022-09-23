// // imports 
// const Product = require('./models/Product')
// require('dotenv').config()
// const jsonProduct = require('./products.json')
// const connectDB  = require('./db/connect')



// const start = async ()=>{
//     try{
//         await connectDB(process.env.MONGO_URI);
//         await Product.deleteMany();
//         await Product.create(jsonProduct);
//         const task = await Product.find();
    
//         process.exit(0)
//     }catch(err){
//         console.log(err);
//         process.exit(1)
//     }
// }

// start();




