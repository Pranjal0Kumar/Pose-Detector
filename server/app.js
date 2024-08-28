

//----------------------------------------------------IMPORTING FILES AND LIBRARIES--------------------------------------------------


const express = require('express');
const app = express();
const routes = require('./routes/route')
const mongoose = require('mongoose');


//--------------------------------------------------------CONNECTING MONGOOSE--------------------------------------------------------

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    serverSelectionTimeoutMS: 30000 // Increase if needed
  })


//---------------------------------MIIDLEWARES (IMPORTING ROUTES AND DECODING THE USER ENTERD DATA)----------------------------------



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", routes);


//--------------------------------------------------------DEFINING PORTS-----------------------------------------------------------


const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})



let localStream;

const setupDevice = () => {
    console.log('setupDevice invoked');
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
        // render local stream on DOM
        const localPlayer = document.getElementById('localPlayer');
        localPlayer.srcObject = stream;
        localStream = stream;
    }, (error) => {
        console.error('getUserMedia error:', error);
    });
};
