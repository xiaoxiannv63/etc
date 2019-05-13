const app = getApp();
Page({
  data: {
    tabs:['通行记录','开票记录'],
    tab:0,
    month:'',//查询月份
    nowMonth:'',//当月月份
    pageIndex:1,
    statusArr:['开票中','开票完成','审核中','审核完成'],
    status:'',
    items:[]
  },
  onLoad() {
    let date = new Date();
    let nowMonth = date.getFullYear()+"-"+num2(date.getMonth() + 1)
    this.setData({
      month: nowMonth,
      nowMonth: nowMonth
    })
    // 日期格式
    function num2(num){
      return ('0'+num).slice(-2)
    }
    this.data.tab == 0 ? this.getTripRecord() : this.getInvoiceRecord()
  },
  changeTab(e){
    this.setData({
      tab:e.target.dataset.index,
      month: this.data.nowMonth
    })
  },
  selDate(){
    let d = new Date();
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let setMonth = 1
    let setYear = 2018

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
          nomore:false,
        })
      }
    });
  },
  selStatus(){
    my.showActionSheet({
      title: '选择开票状态',
      items: this.data.statusArr,
      success: (res) => {
        this.setData({
          status: this.data.statusArr[res.index],
        });
      },
    });
  },
  //行程列表
  getTripRecord(){
    if(this.data.nomore) return;
    let json1 = {
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageIndex,
      pageSize: 10
    }
    app.ajax(json1,'MTC_MPRECORDS',(data) => {
      let nomore = false;
      console.log("====",nomore)
      if(data.items.length<10) nomore = true;
      data.items.forEach((item,index) => {
        item.applyTime = app.format(item.applyTime)
        
      })
      that.setData({
        items: that.data.items.concat(data.items),
        pageIndex: ++that.data.pageIndex,
        nomore: nomore
      })
    })
  },
  //开票列表
  getInvoiceRecord(){
    if(this.data.nomore) return;
    let json1 = {
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageIndex,
      pageSize: 10
    }
    app.ajax(json1,'MTC_MPRECORDS',(data) => {
      let nomore = false;
      console.log("====",nomore)
      if(data.items.length<10) nomore = true;
      data.items.forEach((item,index) => {
        item.applyTime = app.format(item.applyTime)
        
      })
      that.setData({
        items: that.data.items.concat(data.items),
        pageIndex: ++that.data.pageIndex,
        nomore: nomore
      })
    })
  },
  goMtcConfirm(){
    my.navigateTo({
      url: '/pages/mtc/recordConfirm/recordConfirm'
    });
  },
  goInvoiceDetail(){
    my.navigateTo({
      url: '/pages/mtc/invoiceDetail/invoiceDetail'
    });
  }
});
