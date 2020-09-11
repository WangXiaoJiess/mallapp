import {
  homeList, ShowGoods, SearchHot,Goods, CatsTree, CadGoods, GoodsInfo,Phone, LoginName, Code, login, Login,UserData, Cart, addCart, DeleteCart,
  CartNum, pathCartChecked, OrderInfo,addArea, Area, patchArea, cretaeOrder,verifyPayPWD, payOrder, appWebPay, OrderByState,deleteArea,
  AllRateByGoodsId
  
} from './index'
// axios
import request from '../utils/reques'
import qs from 'qs'

// 获取首页数据
export function getHomeList(params = {}) {
  return request({
    url: homeList,
    method: 'get',
    params,
    hideloading: false
  })
}

// 获取列表数据
export function getShowGoods(params = {}) {
  return request({
    url: ShowGoods,
    method: 'get',
    params,
    hideloading: false
  })
}
// 热门搜索
export function getSearchHot(params = {}) {
  return request({
    url: SearchHot,
    method: 'get',
    params,
    hideloading: false
  })
}
// 获取商品信息（可分页）搜索
export function getGoods(params = {}) {
  return request({
    url: Goods,
    method: 'get',
    params,
    hideloading: false
  })
}
// 获取分类列表（三级分类信息）
export function getCatsTree(params = {}) {
  return request({
    url: CatsTree,
    method: 'get',
    params,
    hideloading: false
  })
}
// 分类页面进行的商品展示
export function getCadGoods(params = {}) {
  return request({
    url: CadGoods,
    method: 'get',
    params,
    hideloading: false
  })
}
//商品展示详情
export function getGoodsInfo(params = {}) {
  return request({
    url: GoodsInfo,
    method: 'get',
    params,
    hideloading: false
  })
}
// 验证手机号是否被注册
export function getPhone(params = {}) {
  return request({
    url: Phone,
    method: 'get',
    params,
    hideloading: false
  })
}
// 验证用户名是否可用
export function getLoginName(params = {}) {
  return request({
    url: LoginName,
    method: 'get',
    params,
    hideloading: false
  })
}
// 短信验证码
export function getCode(params = {}) {
  return request({
    url: Code,
    method: 'get',
    params,
    hideloading: false
  })
}
// 添加登录信息
export function postlogin(params = {}) {
  return request({
    url: login,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}
// 登录验证
export function postLogin(params = {}) {
  return request({
    url: Login,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}
// 获取用户详情数据
export function getUserData(params = {}) {
  return request({
    url: UserData,
    method: 'get',
    params,
    hideloading: false
  })
}

//获取用户购物车信息
export function getCart(params = {}) {
  return request({
    url: Cart,
    method: 'get',
    params,
    hideloading: false
  })
}

//添加购物车
export function postaddCart(params = {}) {
  return request({
    url: addCart,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}
// 删除购物车中选中的商品
export function patchDeleteCart(params = {}) {
  return request({
    url: DeleteCart,
    method: 'patch',
    params,
    hideloading: false
  })
}
// 修改购物车中商品的数量
export function patchCartNum(params = {}) {
  return request({
    url: CartNum,
    method: 'patch',
    params,
    hideloading: false
  })
}
// 修改购物车中商品是否是选择状态
export function patchpathCartChecked(params = {}) {
  return request({
    url: pathCartChecked,
    method: 'patch',
    params,
    hideloading: false
  })
}
// 展示订单信息，包含商品信息和店铺信息
export function getOrderInfo(params = {}) {
  return request({
    url: OrderInfo,
    method: 'get',
    params,
    hideloading: false
  })
}
// 添加用户的收货地址
export function postaddArea(params = {}) {
  return request({
    url: addArea,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}

// 获取用户的收货地址
export function getArea(params = {}) {
  return request({
    url: Area,
    method: 'get',
    params,
    hideloading: false
  })
}
// 修改用户的收货地址
export function patchaddArea(params = {}) {
  return request({
    url: patchArea,
    method: 'patch',
    params,
    hideloading: false
  })
}

// 创建订单 点击确定付款 但未完成付款操作
export function postcretaeOrder(params = {}) {
  return request({
    url: cretaeOrder,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}

// 创建订单 点击确定付款 但未完成付款操作
export function postverifyPayPWD(params = {}) {
  return request({
    url: verifyPayPWD,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}
// 进行订单的支付 （余额）
export function postpayOrder(params = {}) {
  return request({
    url: payOrder,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}

// 手机网页支付
export function postappWebPay(params = {}) {
  return request({
    url: appWebPay,
    method: 'post',
    data: qs.stringify(params),
    hideloading: false
  })
}
// 展示订单信息，包含商品信息和店铺信息
export function getOrderByState(params = {}) {
  return request({
    url: OrderByState,
    method: 'get',
    params,
    hideloading: false
  })
}

// 修改用户地址为删除状态
export function patchdeleteArea(params = {}) {
  return request({
    url: deleteArea,
    method: 'patch',
    params,
    hideloading: false
  })
}

// 根据商品id找到该商品所有的评论
export function getAllRateByGoodsId(params = {}) {
  return request({
    url: AllRateByGoodsId,
    method: 'get',
    params,
    hideloading: false
  })
}