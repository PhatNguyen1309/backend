const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin' , 'system', 'staff'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin', 'system', 'staff'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'system', 'staff'), deleteProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;