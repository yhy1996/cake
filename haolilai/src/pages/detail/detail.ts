import { Component } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {LogService} from '../../app/utility/service/log.service';
import {NotFoundPage} from '../not-found/not-found';
import {CartPage} from '../cart/cart';
import {LoginPage} from '../login/login';
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  //定义三个变量，实现跳转
  pageNotFound:any;
  pageLogin:any;
  pageCart:any;

  detailInfo:any;
  constructor(
    public myToastCtrl:ToastController,
    public myLog:LogService,
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
      this.pageNotFound=NotFoundPage;
      this.pageLogin=LoginPage;
      this.pageCart=CartPage;
  }

  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad DetailPage');
    //获取传递来的参数
    let productId=this.navParams.get('id');
    this.myLog.showLog("productId is "+productId);
    this.initDetailInfo(productId);
  }

  //根据产品的ID 得到详情数据
  initDetailInfo(id:number){
    this.myHttp
      .sendRequest('http://localhost/haolilai/data/product/details.php?lid='+id)
      .subscribe((result:any)=>{
        this.myLog.showLog('请求到的数据为：'+result);
        this.detailInfo=result.details;
      })
  }

  //将当前的商品 添加到购物车
  addToCart(){
    this.myHttp
    .sendRequest('http://localhost/haolilai/data/cart/add.php?buyCount=1&lid='+this.detailInfo.lid)
    .subscribe((result:any)=>{
      this.myLog.showLog(result);
      let showMsg="";
      if(result.code==200){
        //成功
        showMsg="添加成功";
      }
      else if(result.code==300){
        //未登录，跳转到登录页面
        showMsg="未登录，跳转到登录页面";
        this.navCtrl.push(LoginPage);
      }
      else if(result.code==500){
        //失败
        showMsg="添加失败";
      }
      let myToast=this.myToastCtrl.create({
        position:'bottom',
        duration:1500,
        message:showMsg
      });
      myToast.present();
    })
  }

}
