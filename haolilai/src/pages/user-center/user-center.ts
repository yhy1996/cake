import { Component } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';

/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  isUserLogin:boolean=false;
  loginData:string="";
  loginPage:any;
  constructor(
    public myHttp:MyHttpService,
    public myToastCtrl:ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.loginPage=LoginPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
    this.getUname();
  }
  
  ionViewWillEnter(){
    this.getUname();
  }

  //退出登录
  doLogout(){
    this.myHttp
      .sendRequest('http://localhost/haolilai/data/user/logout.php')
      .subscribe((result:any)=>{
        console.log(result)
        let showMsg="";
        if(result.code==200){
          //退出成功，跳转到第0个tab(去首页)
          this.navCtrl.parent.select(0);
          showMsg="退出成功，将跳转到首页";
        }else{
          //退出失败
          showMsg="退出失败，请重试";
        }
        this.myToastCtrl.create({
          message:showMsg,
          duration:1500,
          position:'top'
        }).present();
      })
  }

  //获取当前登录用户名
  getUname(){
    this.myHttp.sendRequest('http://localhost/haolilai/data/user/session_data.php')
    .subscribe((result:any)=>{
      console.log(result);
      if(result.uid){
        this.isUserLogin=true;
        this.loginData=result.uname;
      }else{
        this.isUserLogin=false;
      }
    })
  }

}
