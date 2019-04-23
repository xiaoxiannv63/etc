const app = getApp();

Page({
  data: {
    invType: 'xf',
    items:[],
    czArr:[],
    xfArr:[],
    nomore:false,
    month:'',
    pageIndex:1,
    type:null
  },
  onLoad(query) {
    console.log('---query----',query)
    let d = new Date();
    this.setData({
      cardId: query.cardId,
      plateNum: query.plateNum,
      type: query.type,//0 储值卡 1 记账卡
      month: d.getFullYear()+"-"+num2(d.getMonth()+1)
    })
    my.setNavigationBar({
      title: query.plateNum
    })
    this.getItems();
    function num2(num){
      return ('0'+num).slice(-2)
    }
  },
  selDate(){
    let d = new Date();
    let that = this;
    my.datePicker({
      format: 'yyyy-MM',
      endDate: d.getFullYear()+"-"+(d.getMonth()+1),
      success: (res) => {
        // console.log(res);
        that.setData({
          month: res.date,
          pageIndex:1,
          czArr:[],
          xfArr:[],
          nomore:false,
        })
        that.getItems();
      }
    });
  },
  chooseXF(){//选择消费
    this.setData({
      invType:'xf'
    })
  },
  chooseCZ(){//选择充值
    this.setData({
      invType:'cz'
    })
  },
  lower(){//滚动到底部事件
    console.log("到底了")
    if(!this.data.nomore){
      this.getItems();
    }
  },
  getItems(){
    //request
    if(this.data.nomore) return;
    let json1, that=this;
    json1 = {
      cardId: this.data.cardId,
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageIndex,
      pageSize: 10
    }
    my.showLoading({
      content:'加载中...'
    })
    app.ajax(json1,'INVOICE_SEARCHAPPLY',(data) => {
      let nomore = false;
      if(data.items.length<10) nomore = true;
      for(let i in data.items){
        data.items[i].applyTime = app.format(data.items[i].applyTime);
      }
      let czArr = [];
      let xfArr = [];
      data.items.forEach((item,index) => {
        if(item.applyType == "充值发票"){
          czArr.push(item)
        }else{
          xfArr.push(item)
        }
      })
      that.setData({
        czArr:this.data.czArr.concat(czArr),
        xfArr:this.data.xfArr.concat(xfArr),
        pageIndex: ++that.data.pageIndex,
        nomore: nomore
      })
    })
  },
  toInvApp(e){
    if(e.target.dataset.status == '开票完成'){
      let str = "?applyId="+e.target.dataset.applyId + '&plateNum='+this.data.plateNum;
      let var1 = {
        currentTarget: {
          dataset: {
            url: "/pages/invoiceStatus/invoiceStatus" + str,
            openType: "navigateTo"
          }
        }
      }
      app.handleForward(var1)
    }else{
      my.alert({
        content: e.target.dataset.status
      })
    }
  }
});
