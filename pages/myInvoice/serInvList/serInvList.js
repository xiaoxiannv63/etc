const app = getApp();

Page({
  data: {
    invType: 'xf',
    items:[],
    nomore:false,
    month:'',
    pageIndex:1
  },
  onLoad(query) {
    let d = new Date();
    this.setData({
      cardId: query.cardId,
      plateNum: query.plateNum,
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
          items:[],
          nomore:false,
        })
        that.getItems();
      }
    });
  },
  chooseXF(){//选择消费
    this.setData({
      invType:'xf',
      //items:[]  //列表请求新的
    })
  },
  chooseCZ(){//选择消费
    this.setData({
      invType:'cz',
      //items:[]  //列表请求新的
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
    app.ajax(json1,'INVOICE_SEARCHAPPLY',function(data){
      let nomore = false;
      if(data.items.length<10)nomore = true;
      for(let i in data.items){
        data.items[i].applyTime = app.format(data.items[i].applyTime);
      }
      that.setData({
        pageIndex: ++that.data.pageIndex,
        items: that.data.items.concat(data.items),
        nomore: nomore
      })

    })
  },
  toInvApp(e){
    if(e.target.dataset.status == '开票完成'){
      let str = "?applyId="+e.target.dataset.applyId + '&plateNum='+this.data.plateNum;
      my.navigateTo({
        // url: '/pages/myInvoice/invApplication/invApplication'+str
        url: '/pages/invoiceStatus/invoiceStatus'+str
      });
    }else{
      my.alert({
        content: e.target.dataset.status
      })
    }
  }
});
