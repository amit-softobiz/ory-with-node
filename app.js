const  express = require('express');
var router = require('./routes/auth_routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const port = 3000;

app.use('/',router);

app.listen(port, () => {
    console.log(`server is listening on port no. ${port}`);
})