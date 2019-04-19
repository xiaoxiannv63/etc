const app = getApp();
Page({
  data: {
    urlQuery: {
      applyType:'',
      statusId:'02'
    },
    applyId:'',
    plateNum:'',
    itemContent:{}
  },
  onLoad(query) {
    console.log('----query----',query);
    this.setData({
      applyId:query.applyId,
      plateNum:query.plateNum
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
      let str = "?applyId="+this.data.applyId + '&plateNum='+this.data.plateNum;
      my.navigateTo({
        // url: '/pages/myInvoice/invApplication/invApplication'+str
        url: '/pages/myInvoice/viewInvoice/viewInvoice'+str
      });
  },
  invoiceError(){ //开票有误 
    my.alert({
      title: '开票信息有误？',
      content: '若需修改开票信息或退票，请搜索下载“票根”APP，使用您当前账户的手机号进行登录。',
      buttonText: '确定',
      success: () => {

      },
    });
  },
  lookQuotation(){ //查看行程
    let str = "applyId="+this.data.applyId + '&cardId='+this.data.itemContent.cardId;
    my.navigateTo({
      url: `../quotation/quotation?${str}`
    })
  }

})