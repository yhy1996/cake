import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {DetailPage} from '../detail/detail';

/**
 * Generated class for the MyListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-list',
  templateUrl: 'my-list.html',
})
export class MyListPage {
  myKw:string="";
  nowPage:number=1;
  myList:Array<any>=[];
  totalPages:number=1;
  constructor(
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyListPage');
    //保存index传递来的搜索框中的值
    this.myKw=this.navParams.get('kw');
    this.loadData();
  }

  //向服务器list.php请求数据
  loadData(){
    this.myHttp
      .sendRequest('http://localhost/ajia_code/data/product/list.php?kw='+this.myKw+"&pno="+this.nowPage)
      .subscribe((result:any)=>{
        console.log(result);
        this.myList=result.data;
        this.totalPages=result.pageCount;
      });
  }

  //加载更多
  loadMore(infinite){
    this.nowPage++;
    //要访问的页码 不得 超过总页数
    if(this.nowPage>this.totalPages){
      infinite.complete();
      return;
    }
    this.myHttp
      .sendRequest('http://localhost/ajia_code/data/product/list.php?kw='
      + this.myKw + "&pno=" + this.nowPage)
      .subscribe((result:any)=>{
        //拼接下数组
        this.myList=this.myList.concat(result.data);
        //结束刷新动作
        infinite.complete();
      });
  }
  //跳转到详情页面
  jumpToDetail(index){
    this.navCtrl.push(
      DetailPage,{id:this.myList[index].lid});
  }

}
