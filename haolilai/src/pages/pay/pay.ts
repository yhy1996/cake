import { Component } from '@angular/core';
import {LoadingController, ViewController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  totalPrice=0;
  constructor(
    public myLoadCtrl:LoadingController,
    public myModalCtrl:ModalController,
    public myViewCtrl:ViewController,
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
    this.totalPrice=this.navParams.get('price');
  }

  //关闭模态窗
  closeModal(shouldJump:boolean){
    this.myViewCtrl.dismiss({result:shouldJump});
  }

  showLoading(){
    let myLoading=this.myLoadCtrl.create({
      content:'支付中'
    })
    //显示一个加载中的窗口
    myLoading.present();
    //3s之后，关闭加载中的窗口,并关闭模态框本身
    setTimeout(()=>{
      //关闭loading
      myLoading.dismiss();
      //关闭模态窗
      this.closeModal(true);
      // this.myViewCtrl.dismiss();
    },3000)
  }

}
