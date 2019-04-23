const app = getApp();

Page({
  data: {
    items:[],
    noData: 0
  },
  toInvDet(e){
    let ind = e.currentTarget.dataset.index;
    let d = this.data.items;
    // console.log(ind);
    let str = "?tit="+d[ind].titleId+
              "&titType="+d[ind].titleType+
              "&name="+(!d[ind].name?'':d[ind].name)+
              "&tax="+(!d[ind].taxNum?'':d[ind].taxNum)+
              "&add="+(!d[ind].address?'':d[ind].address)+
              "&tel="+(!d[ind].tel?'':d[ind].tel)+
              "&bank="+(!d[ind].bank?'':d[ind].bank)+
              "&acc="+(!d[ind].bankAccount?'':d[ind].bankAccount);

    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/invoiceTit/invoiceDet/invoiceDet' + str,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  addTaitou(){
    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/invoiceTit/addTaitou/addTaitou',
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  onLoad() {
    this.getTitList();
  },
  onShow(){
    if(app.invTitIndNeedRefresh){
      app.invTitIndNeedRefresh = false;
      this.getTitList();
    }
  },
  getTitList(){
    let json1 = {
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'TITLE_SEARCH',function(data){
      let noData = data.items.length == 0?1:0;
      that.setData({
        items: data.items,
        noData: noData
      })
    })

  }
});
