const app = getApp();
Page({
  data: {
    applyId:'',
    cardId:'',
    list:[]
  },
  onLoad(query) {
    console.log('---query----',query)
    this.setData({
      applyId:query.applyId,
      cardId:query.cardId
    })
    this.getRoute();
  },
  getRoute(){//获取行程详情
    let json1 = {
        applyId: this.data.applyId,
        cardId: this.data.cardId,
        ticketId:app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_ROUTEDETAIL',(data)=>{
      data.items.forEach((item,index)=>{
        item.enTime = app.format(item.enTime);
        item.exTime = app.format(item.exTime);
      })
      this.setData({
        list: data.items
      })
    })
  },
  lookRouteInvoice(e){
    let item = e.target.dataset.item
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/routeInvoice/routeInvoice?cardId=${this.data.cardId}&tradeId=${item}&applyId=${this.data.applyId}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
});
