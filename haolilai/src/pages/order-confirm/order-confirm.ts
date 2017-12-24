import { Component } from '@angular/core';
import {ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {PayPage} from '../pay/pay';


/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  cartList:Array<any>=[];
  constructor(
    public myModalCtrl:ModalController,
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    //初始化购物车的列表数据
    this.initData();
  }

  //向服务器端发起请求
  initData(){
    this.myHttp
      .sendRequest('http://localhost/haolilai/data/cart/list.php')
      .subscribe((result:any)=>{
        this.cartList=result.data;
      })
  }

  //显示模态窗口
  showPayModal(){
   let myModal= this.myModalCtrl.create(PayPage,{price:1000});

   myModal.present();

   //指定当去关闭模态窗时，要执行的方法
   myModal.onDidDismiss((data)=>{
     console.log(data);
     if(data.result){
      //返回
      if(this.navCtrl.canGoBack()){
        this.navCtrl.pop();
      }
      //跳转到首页
      this.navCtrl.parent.select(0);
     }
   })
  }

}
