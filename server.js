import express from 'express';

const app = express();
const port = process.env.PORT || 5000

app.get('/',(req, res)=>{
    res.send('This is from backend')
})

app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})