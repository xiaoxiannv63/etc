
const app = getApp();
Page({
  data: {
    applyId:'',
    status: {
      tp: "红冲",
      hp: "变更"
    }
  },
  onLoad(query) {
    console.log('---换??退??---',query)
    this.setData({
      applyId: query.applyId,
      cardId: query.cardId,
      plateNum: query.plateNum
    })
  },
  changeEvent(e) {
    // my.navigateTo({
    //   url: `../changing/changing?statusId=${e.target.dataset.status}`
    // })
    let that = this
    console.log(e.currentTarget,e.target)
    if(e.target.dataset.status == "hp"){
      let var1 = {
        currentTarget: {
          dataset: {
            url: `/pages/changing/changing?applyId=${this.data.applyId}&cardId=${this.data.cardId}`,
            openType: "navigateTo"
          }
        }
      }
      app.handleForward(var1)
    }else{
    my.confirm({
      title: '温馨提示',
      content: `您正在申请发票${that.data.status[e.target.dataset.status]}，请您认真核对需要${that.data.status[e.target.dataset.status]}的发票，申请提交后，系统将三个工作日内处理您的申请，原有发票将无法继续使用，该发票申请对应的交易记录恢复为待开票状态。`,
      align:'left',
      confirmButtonText: e.target.dataset.status == 'hp' ?'确定换票':'确定退票/红冲',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
            let json1 = {
              applyId: that.data.applyId,
              cardId: that.data.cardId,
              ticketId: app.userInfo.ticketId
            }
            app.ajax(json1,"INVOICE_REVERSAL",function(res){
              let data = {
                currentTarget:{
                  dataset:{
                    url: `/pages/myInvoice/serInvList/serInvList?cardId=${that.data.cardId}&plateNum=${that.data.plateNum}`,
                    openType: "redirectTo"
                  }
                }
              }
              app.handleForward(data)
            })
          }
        },
      });
    }
  },
});
