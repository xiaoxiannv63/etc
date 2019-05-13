const app = getApp();

Page({
  data:{
    items:[],
  },
  onLoad(){

  },
  onShow(){

  },
  view(e){
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/viewinvoice/viewinvoice`,
          openType: "redirectTo"
        }
      }
    }
    app.handleForward(var1)
  }
})