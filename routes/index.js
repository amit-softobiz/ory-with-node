
// const router  = express.Router();
// const sdk = require('@ory/client')
// require('dotenv').config()




// const ory  = new sdk.FrontendApi(
//     new sdk.Configuration({
//         basePath: process.env.ORY_SDK_URL,
//     }),
// )

// router.get("/", function(req,res, next){
//     ory.toSession({cookie:req.header("cookie")}).then(({data:session})=>{
//         res.render("landing",{title:"amit", identity:session.identity,})
//     }).catch(()=>{res.redirect("/.ory/ui/login")})
// })
// router.get("/user", (req, res)=>{
//     res.send("hi amit ....");
// })

// module.exports = router