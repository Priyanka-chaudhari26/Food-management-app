const { Signup, Login} = require("../Controllers/AuthController");
const {userVerification } = require("../Middlewares/AuthMiddleware");
const {Menu} = require("../Controllers/MenuController");
const {Order, Orders} = require("../Controllers/OrderController");
const {User} = require("../Controllers/UserController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
// router.post('/',userVerification);
router.post('/user',userVerification, User);
router.route('/menu')
    .get(Menu)    
    .post(userVerification, Menu);  

router.route('/menu/:id')
    .put(userVerification, Menu)    
    .delete(userVerification, Menu); 
router.post('/order', userVerification, Order);
router.get('/orders', userVerification, Orders);
module.exports = router;