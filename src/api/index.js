const api = {
    homeList: '/api/Home/getHomeREC', // 首页轮播  九宫格
    ShowGoods: '/api/Home/getHomeShowGoods',  // 首页列表
    SearchHot: '/api/Goods/getSearchHot',  // 热门搜索
    Goods: '/api/Goods/getGoods',  // 获取商品信息（可分页）搜索
    CatsTree: '/api/Goods/getCatsTree',// 获取分类列表（三级分类信息）
    CadGoods: '/api/Goods/getCadGoods', // 分类页面进行的商品展示
    GoodsInfo: '/api/Goods/GetGoodsInfo', //商品展示详情
    Phone: '/api/Verify/GetPhone', // 验证手机号是否被注册
    LoginName: '/api/Verify/LoginName', // 验证用户名是否可用
    Code: '/api/SMSCode/GetCode',  // 短信验证码
    login: '/api/LoginPage/AddLogin', // 添加登录信息
    Login: '/api/LoginPage/Login',  // 登录验证
    UserData: '/api/UserInfo/getUserData', // 获取用户详情数据
    Cart: '/api/Cart/getCart',  // 获取用户购物车信息
    addCart: '/api/Cart/addCart', // 添加购物车
    DeleteCart: '/api/Cart/DeleteCart', // 删除购物车中选中的商品
    CartNum: '/api/Cart/patchCartNum', // 修改购物车中商品的数量
    pathCartChecked: '/api/Cart/pathCartChecked', // 修改购物车中商品是否是选择状态
    OrderInfo: '/api/Order/getOrderInfo', // 展示订单信息，包含商品信息和店铺信息
    addArea: '/api/UserInfo/addArea', // 添加用户的收货地址
    Area: '/api/UserInfo/getArea', // 获取用户的收货地址
    patchArea: '/api/UserInfo/patchArea', // 修改用户的收货地址
    cretaeOrder: '/api/Order/cretaeOrder', // 创建订单 点击确定付款 但未完成付款操作
    verifyPayPWD: '/api/Order/verifyPayPWD', // 验证支付密码
    payOrder: '/api/Order/payOrder', // 进行订单的支付 （余额）
    appWebPay: '/api/Alipay/appWebPay', // 手机网页支付
    OrderByState: '/api/Order/getOrderByState', // 展示订单信息，包含商品信息和店铺信息
    deleteArea: '/api/UserInfo/deleteArea', // 修改用户地址为删除状态
}

module.exports = api 