const app = getApp();
Page({
  data: {
    urlQuery: {
      applyType:'',
      statusId:'02'
    },
    applyId:'',
    plateNum:'',
    itemContent:{},
    status: 'hp'//换票  tp
  },
  onLoad(query) {
    console.log('----query----',query);
    this.setData({
      applyId:query.applyId,
      plateNum:query.plateNum,
      status: query.status
    })
    this.setData({ 
      urlQuery: query
    })
    my.setNavigationBar({
      title: query.plateNum
    })
    this.getCardId()
  },
  onItemClick(e) {

  },
  onShareAppMessage() {
    return {
      title: '票根',
      desc: '简单快捷获取通行费电子发票',
      path: 'pages/startup/startup'
    };
  },
  getCardId(){
    let json1 = {
      applyId: this.data.applyId,
      ticketId:app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_APPLYDETAIL',(data)=>{
      data.applyTime = app.format(data.applyTime);
      this.setData({
        itemContent: data
      })
    })
  },
  lookElectronicInvoice(){
    let url;
    if(this.data.status == 'hp'){//换票
      url = `/pages/redChangeStatus/redChangeStatus?applyId=${this.data.applyId}&plateNum=${this.data.plateNum}&cardId=${this.data.itemContent.cardId}&change=true`
    }else{
      url = `/pages/redChangeStatus/redChangeStatus?applyId=${this.data.applyId}&plateNum=${this.data.plateNum}&cardId=${this.data.itemContent.cardId}&change=false`
    }
    let var1 = {
      currentTarget: {
        dataset: {
          url: url,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  invoiceError(){ //开票有误
    let str = "applyId="+this.data.applyId + '&cardId='+this.data.itemContent.cardId;
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/invoiceError/invoiceError?${str}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  lookQuotation(){ //查看行程
    let str = "applyId="+this.data.applyId + '&cardId='+this.data.itemContent.cardId;
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/quotation/quotation?${str}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
})