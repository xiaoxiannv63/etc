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
    let nowTime = d.getTime()
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let setMonth = 1
    let setYear = 2018
    // if(setMonth<=0){
    //   setMonth += 12
    //   setYear -= 1
    // }
    console.log(nowYear,nowMonth,setYear,setMonth)

    let that = this;
    my.datePicker({
      format: 'yyyy-MM',
      startDate: setYear + "-" + setMonth,
      currentDate: this.data.month,
      endDate: nowYear + "-" + nowMonth,
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
    if(this.data.czArr.length < 10){
      this.getItems()
    }
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
      data.items.forEach((item,index) => {
        if(item.applyType == "红冲申请"){
          if(item.status == "开票中"){
            item.status = "红冲中"
          }else if(item.status == "开票完成"){
            item.status = "红冲完成"
          }
        }else if(item.applyType == "换票申请"){
          if(item.status == "开票中"){
            item.status = "换票中"
          }else if(item.status == "开票完成"){
            item.status = "换票完成"
          }
        }
      })
      let czArr = [];
      let xfArr = [];
      data.items.forEach((item,index) => {
        if(item.applyType == "充值发票申请"){
          czArr.push(item)
        }else if(item.applyType == "消费发票申请"){
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
      let var1 = {
        currentTarget: {
          dataset: {
            url: `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`,
            openType: "navigateTo"
          }
        }
      }
      app.handleForward(var1)
    }else if(e.target.dataset.status == '换票完成'){//换票完成
      let var2 = {
        currentTarget: {
          dataset: {
            url: `/pages/redChangeStatus/redChangeStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}&cardId=${this.data.cardId}&change=1`,
            openType: "navigateTo"
          }
        }
      }
      app.handleForward(var2)
    }else{
      my.alert({
        content: e.target.dataset.status
      })
    }
  }
});
