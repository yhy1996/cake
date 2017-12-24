import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
import {IndexPage} from '../index/index';
import {OrderConfirmPage} from '../order-confirm/order-confirm';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  //用户是否已经登录
  isUserLogin:boolean=false;
  //保存购物车中的数组
  cartList:Array<any>=[];

  constructor(
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage'); 
  }

  ionViewWillEnter(){
    console.log("cart will enter");
    this.checkUserLogin();
    this.getCartInfo();
  }

  //跳转到登录页面
  jumpToLogin(){
    this.navCtrl.push(LoginPage);
  }

  //跳转到订单确认
  jumpToOrderConfirm(){
    this.navCtrl.push(OrderConfirmPage);
  }

  //跳转到首页
  jumpToIndex(){
    // this.navCtrl.push(IndexPage);
    //tab页面可以通过parent的属性得到tabs实例
    //tabs实例支持一个select方法，可以通过指定
    //tabs的序号index，告诉要选中第index个tab
    this.navCtrl.parent.select(0);
  }

  //计算当前购物车的产品一个多少钱
  sunAll(){
    let totalPrice=0;
    for(var i=0;i<this.cartList.length;i++){
      var product=this.cartList[i];
      totalPrice+=(product.count*product.price);
    }
    return totalPrice;
  }

  //获取购物车中的数据
  getCartInfo(){
    this.myHttp
      .sendRequest('http://localhost/haolilai/data/cart/list.php')
      .subscribe((result:any)=>{
        console.log('----',result);
        if(result.data){
          this.cartList=result.data;
        }
      });
  }

  // 检查用户是否登录
  checkUserLogin(){
    this.myHttp
    .sendRequest('http://localhost/haolilai/data/user/session_data.php')
    .subscribe((result:any)=>{
      if(result.uid){
        //已登录
        this.isUserLogin=true;
      }else{
        //未登录
        this.isUserLogin=false;
      }
    })
  }

  //修改购物车中的产品数量
  //参数  isMinus true就是减 false就是加
  //参数  index cartList中要操作第几个列表项
  modifyCartCount(isMinus:boolean,index:number){
    //定义一个变量 保存当前count
    let myCount=this.cartList[index].count;
    if(isMinus){
      myCount--;
      if(myCount==-1){
        return;
      }
    }else{
      myCount++;
    }
    this.cartList[index].count=myCount;
  }

}
