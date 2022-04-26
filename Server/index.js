const connectToMongo = require('./db')
const express = require("express");
const cors = require('cors')
connectToMongo()
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());
//available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'))
app.use('/api/otppwrst',require('./routes/emails'))

app.listen(port,()=>{
    console.log("server started")
})
