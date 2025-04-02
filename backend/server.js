const express= require('express');
const cors= require('cors');
const app = express();
app.use(cors());


app.get('/api', (req, res) => {
    return res.json({message: "Hello from the server!"});
}
);

app.listen(8081 , () => {
    console.log("Server is running on port 8081");
});


// const bodyParser= require('body-parser');
// const app= express();
// const port= 3000;