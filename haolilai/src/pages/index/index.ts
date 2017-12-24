import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {DetailPage} from '../detail/detail';
import {LogService} from '../../app/utility/service/log.service';
import {MyListPage} from '../my-list/my-list';

/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems:Array<any>=[];
  newArrivalItems:Array<any>=[];
  recommendedItems:Array<any>=[];
  detailPage:any;
  myInput:string="";
  constructor(
    public myLog:LogService,
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
      this.detailPage=DetailPage;
  }

  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad IndexPage');
    this.initData();
  }

  ionViewWillEnter(){
    this.myInput="";
  }

  //初始化视图需要用到的数据
  initData(){
    this.myHttp
      .sendRequest('http://localhost/haolilai/data/product/index.php')
      .subscribe((result:any)=>{
        this.myLog.showLog('请求到的数据为：'+result);
        this.carouselItems=result.carouselItems;
        this.newArrivalItems=result.newArrivalItems;
        this.recommendedItems=result.recommendedItems;
      })
  }

  //跳转到list并发送myInput
  jumpToMyList(){
    this.navCtrl.push(MyListPage,{kw:this.myInput});
  }

}
