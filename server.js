const app = require('./src/app')
const connectToDB = require('./src/config/db')

const PORT = 3000;

connectToDB();

app.get("/health",(req,res)=>{
   res.json({ status: 'ok' });
})

app.listen(PORT,()=>{
    console.log("server listen to port 3000")
})