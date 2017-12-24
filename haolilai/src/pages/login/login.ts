import { Component } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {LogService} from '../../app/utility/service/log.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname:string="";
  upwd:string="";
  constructor(
    public myToastCtrl:ToastController,
    public myHttp:MyHttpService,
    public myLog:LogService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //将用户所输入的用户名和密码  发送给服务器
  doLogin(){
    this.myHttp
    .sendRequest('http://localhost/haolilai/data/user/login.php?uname='+this.uname+'&upwd='+this.upwd)
    .subscribe((result:any)=>{
      this.myLog.showLog(result);
      let showMsg="";
      if(result.code==200){
        //登录成功
        showMsg="登录成功";
        //当用户登录成功后 返回上一页
        this.navCtrl.pop();
      }
      else if(result.code==200){
        //用户名或者密码错误
        showMsg="用户名或密码错误";
      }
      else if(result.code==500){
        //登录失败
        showMsg="登录失败";
      }
      let myToast=this.myToastCtrl.create({
        position:'bottom',
        message:showMsg,
        duration:1500
      })
      myToast.present();
    })
  }

}
