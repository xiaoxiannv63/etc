const app = getApp();
Page({
  data: {
    userType: 'PERSONAL',
    items: [],
    personItems: [],
    companyItems: [],
    first: true,
    noData: 0,
    personItems: [
      {
        number: '粤A123456', licensePlate: '23455***11222', type: '记账卡',
        rise: '行云数据（北京）科技有限公司',
        arrow: true,
      },
      {
        number: '粤A123456', licensePlate: '23455***11222', type: '记账卡',
        rise: '',
        arrow: true,
      },
      {
        number: '粤A123456', licensePlate: '23455***11222', type: '记账卡',
        rise: '行云数据（北京）科技有限公司',
        arrow: true,
      },
      {
        number: '粤A123456', licensePlate: '23455***11222', type: '记账卡',
        rise: '',
        arrow: true,
      }
    ],
    companyItems: [],
    first: true,
    noData: 0,  //没有数据 1，有数据 0.  默认有数据形式
  },
  onLoad(query) {
    this.getCardList();
  },
  onShow() {
    if (app.myEtcNeedRefresh) {
      app.myEtcNeedRefresh = false;
      this.getCardList()
    }
  },
  choosePer(){
    console.log('cper',this.data.userType)
    if(this.data.userType == 'PERSONAL')return;
    this.setData({
      userType: 'PERSONAL',
      items: this.data.personItems
    })
  },
  chooseCom(){
        console.log('cCom',this.data.userType)

    if(this.data.userType == 'COMPANY')return;
    if(this.data.first){
      this.setData({
        first:false,
        userType: 'COMPANY',
      })
      this.getCardList()
    }else{
      this.setData({
        userType: 'COMPANY',
        items: this.data.companyItems
      })
    }
  },
  getCardList() {
    console.log(app.userInfo,'app.userInfo')
    let js1 = {
      userType: this.data.userType,
      ticketId: app.userInfo ? app.userInfo.ticketId : ''
    }
    my.showLoading({
      content: '加载中...'
    })

    // setTimeout(() => {
    //   my.hideLoading();
    //   this.setData({
    //     items : this.data.personItems
    //   })
    // }, 2000)
    
    app.ajax(js1,'CARD_LIST',(data)=>{
      my.hideLoading();
      let noData = data.items.length == 0? 1 : 0;
      if(this.data.userType == 'PERSONAL'){
        this.setData({
          personItems: data.items,
          items: data.items,
          noData: noData
        })
      }else{
        this.setData({
          companyItems: data.items,
          items: data.items,
          noData: noData
        })
      }
    })
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handlePlusClick() {
    my.alert({
      content: 'plus clicked',
    });
  },
  onItemClick(ev) {
    my.navigateTo({
      url: `../invoiceRecord/invoiceRecord?index=${ev.index}&type=1`
    })
    // my.alert({
    //   content: `点击了第${ev.index}行`,
    // });
  },
  onItemButton(ev) {
    console.log(ev)
    my.alert({
      content: `点击了第${ev}按钮`,
    });
  },
})