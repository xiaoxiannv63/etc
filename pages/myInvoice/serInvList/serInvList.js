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
    let invoiceObj={
      "消费发票申请":{
        "开票中":{
            "text":"开票中",
            "img":{
              "false":""
            } 
        },
        "开票完成":{
            "text":"开票完成",
            "img":{
              "false":""
            } 
        }
      },
      "变更抬头申请":{
        "开票中":{
            "text":"换票中",
            "img":{
              "false":"../../../assets/myInvoice/hpsq.png"
            }
          },
        "开票完成":{
            "text":"换票完成",
            "img":{
              "true":"../../../assets/myInvoice/ybhc.png",
              "false":"../../../assets/myInvoice/hpsq.png"
            }
        }
      },
      "发票红冲申请":{
          "开票中":{
              "text":"红冲中",
              "img":{
                "false":"../../../assets/myInvoice/hcsq.png"
              }
          },
          "开票完成":{
              "text":"红冲完成",
              "img":{
                "true":"../../../assets/myInvoice/ybhc.png",
                "false":"../../../assets/myInvoice/hcsq.png"
              }
          }
      }
    }
    app.ajax(json1,'INVOICE_SEARCHAPPLY',(data) => {
      let nomore = false;
      console.log("====",nomore)
      if(data.items.length<10) nomore = true;
      data.items.forEach((item,index) => {
        item.applyTime = app.format(item.applyTime)
        // if(item.applyType == "变更抬头申请"){
        //   if(item.status == "开票中"){
        //     item.imgSrc = "../../../assets/myInvoice/hpsq.png"
        //   }else{
        //     item.imgSrc = item.hasRed ? "../../../assets/myInvoice/ybhc.png" : "../../../assets/myInvoice/hpsq.png"
        //   }
        // }else if(item.applyType == "发票红冲申请"){
        //   if(item.status == "开票中"){
        //     item.imgSrc = "../../../assets/myInvoice/hcsq.png"
        //   }else{
        //     item.imgSrc = item.hasRed ? "../../../assets/myInvoice/ybhc.png" : "../../../assets/myInvoice/hcsq.png"
        //   }
        // }
        // if(item.applyType == "发票红冲申请"){
        //   if(item.status == "开票中"){
        //     item.status = "红冲中"
        //   }else if(item.status == "开票完成"){
        //     item.status = "红冲完成"
        //   }
        // }else if(item.applyType == "变更抬头申请"){
        //   if(item.status == "开票中"){
        //     item.status = "换票中"
        //   }else if(item.status == "开票完成"){
        //     item.status = "换票完成"
        //   }
        // }
        item.status = invoiceObj[item.applyType][item.status].text
        item.imgSrc = invoiceObj[item.applyType][item.status]['img'][item.hasRed]
      })
      let czArr = [];
      let xfArr = [];
      data.items.forEach((item,index) => {
        if(item.applyType == "充值发票申请"){
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
    console.log(e)
    let cur_applyType = e.target.dataset.applyType,cur_status=e.target.dataset.status,cur_hasRed = e.target.dataset.hasRed,url;
    if(cur_status == "红冲完成"){
      url = cur_hasRed ? `/pages/invoiceChange/invoiceChange?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}` : `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`
    }else if(cur_status == "换票完成"){
      url = cur_hasRed ? `/pages/invoiceChange/invoiceChange?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}` : `/pages/invoiceStatus/invoiceStatus?applyId=${e.target.dataset.applyId}&plateNum=${this.data.plateNum}`
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