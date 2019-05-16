const app = getApp();

Page({
  data:{
    items:{},
  },
  onLoad(){

  },
  onShow(){
    // this.getDetail()
  },
  getDetail() {
    let json1 = {
      applyId: this.data.applyId,
      ticketId: app.userInfo.ticketId
    }
    app.ajax(json1,"MTC_APPLYDETAIL",(data)=>{
      data.applyTime = app.format(data.applyTime);
      data.enTime = app.format(data.enTime);
      data.enTime = app.format(data.enTime);
      this.setData({
        items: data
      })
    })
  },
  view(e){
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/viewInvoice/viewInvoice`,
          openType: "redirectTo"
        }
      }
    }
    app.handleForward(var1)
  }
})