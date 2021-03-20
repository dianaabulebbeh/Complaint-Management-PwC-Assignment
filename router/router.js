var router=require('express').Router();
var complaint=require('../controllers/complaint');
var userController=require('../controllers/user');

router.route('/').get(userController.signupPage)
router.route('/register').post(userController.register)
router.route('/login').post(userController.signin)
router.route('/addComplaint').post(complaint.addComplaint)
router.route('/updateComplaintStatus').put(complaint.updateComplaintStatus)
router.route('/customerPage').get(userController.customerPage)
router.route('/adminPage').get(userController.adminPage)

module.exports=router;


