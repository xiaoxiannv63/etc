const app = getApp();

Page({
  data: {
    items:[],
    nomore:false,
    month:'',
    pageIndex:1,
    type:null
  },
  onLoad(query) {
    console.log('---query----',query)
    let d = new Date();
    if(!query.type){
      let json1 = {
        cardId: query.cardId,
        ticketId: app.userInfo.ticketId
      }
      app.ajax(json1,"CARD_DETAIL",(data)=>{
        this.setData({
          cardId: query.cardId,
          plateNum: query.plateNum,
          type: data.cardType,//0 储值卡 1 记账卡
          month: d.getFullYear()+"-"+num2(d.getMonth()+1)
        })
      })
    }else{
      this.setData({
        cardId: query.cardId,
        plateNum: query.plateNum,
        type: query.type,//0 储值卡 1 记账卡
        month: d.getFullYear()+"-"+num2(d.getMonth()+1)
      })
    }

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
          items:[],
          // czArr:[],
          // xfArr:[],
          nomore:false,
        })
        that.getItems();
      }
    });
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
      console.log("====",nomore)
      if(data.items.length<10) nomore = true;
      data.items.forEach((item,index) => {
        item.applyTime = app.format(item.applyTime)
        if(item.applyType == "变更抬头申请"){
          if(item.status == "开票中"){
            item.imgSrc = "../../../assets/myInvoice/hpsq.png"
          }else{
            item.imgSrc = item.hasRed ? "../../../assets/myInvoice/ybhc.png" : "../../../assets/myInvoice/hpsq.png"
          }
        }else if(item.applyType == "发票红冲申请"){
          if(item.status == "开票中"){
            item.imgSrc = "../../../assets/myInvoice/hcsq.png"
          }else{
            item.imgSrc = item.hasRed ? "../../../assets/myInvoice/ybhc.png" : "../../../assets/myInvoice/hcsq.png"
          }
        }
        if(item.applyType == "发票红冲申请"){
          if(item.status == "开票中"){
            item.status = "红冲中"
          }else if(item.status == "开票完成"){
            item.status = "红冲完成"
          }
        }else if(item.applyType == "变更抬头申请"){
          if(item.status == "开票中"){
            item.status = "换票中"
          }else if(item.status == "开票完成"){
            item.status = "换票完成"
          }
        }
      })
      that.setData({
        items: that.data.items.concat(data.items),
        pageIndex: ++that.data.pageIndex,
        nomore: nomore
      })
    })
  },
  toInvApp(e){
    console.log(e)
    let cur_applyType = e.target.dataset.applyType,cur_status=e.target.dataset.status,cur_hasRed = e.target.dataset.hasRed,url;
    if(cur_status == "红冲完成"){
      url = cur_hasRed ? `/pages/invoiceChange/invoiceChange?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}&cardId=${this.data.cardId}` : `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`
    }else if(cur_status == "换票完成"){
      url = cur_hasRed ? `/pages/invoiceChange/invoiceChange?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}&cardId=${this.data.cardId}` : `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`
    }else if(cur_status == "开票完成"){
      url = `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`
    }else{
      my.alert({
        content: e.target.dataset.status
      })
      return;
    }
    let var1={
      currentTarget: {
        dataset: {
          url: url,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
});