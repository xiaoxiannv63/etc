const app = getApp();
const order = ['blue', 'red', 'green', 'yellow'];
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    limte: 10,
    currentMonth: "",
    monthList: [],
    vehicleType: {  //车辆类型有那些
      "1": "货车",
      "2": "汽车",
      "3": "卡车"
    },
    demoItems: [
      {
        "applyId": "01",
        "applyName": "换票申请",
        "applyTime": "2019-04-03",
        "applyType": 3,
        "buyerName": "汪洋",
        "hasRed": "",
        "status": "1",
        "statusName": "换票中",
        "sumAmount": "145.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "02",
        "applyName": "消费发票",
        "applyTime": "2019-04-03",
        "applyType": 1,
        "buyerName": "汪洋",
        "hasRed": "0",
        "status": "2",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "03",
        "applyName": "充值发票",
        "applyTime": "2019-04-03",
        "applyType": 2,
        "buyerName": "汪洋",
        "hasRed": "1",
        "status": "2",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "04",
        "applyName": "换票申请",
        "applyTime": "2019-04-03",
        "applyType": 3,
        "buyerName": "汪洋",
        "hasRed": "0",
        "status": "2",
        "statusName": "换票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "11",
        "applyName": "换票申请",
        "applyTime": "2019-04-03",
        "applyType": 3,
        "buyerName": "汪洋",
        "hasRed": "0",
        "status": "3",
        "statusName": "换票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "12",
        "applyName": "红冲申请",
        "applyTime": "2019-04-03",
        "applyType": 4,
        "buyerName": "汪洋",
        "hasRed": "0",
        "status": "2",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "05",
        "applyName": "红冲申请",
        "applyTime": "2019-04-03",
        "applyType": 4,
        "buyerName": "汪洋",
        "hasRed": "0",
        "status": "3",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "06",
        "applyName": "消费发票",
        "applyTime": "2019-04-03",
        "applyType": 1,
        "buyerName": "汪洋",
        "hasRed": "",
        "status": "1",
        "statusName": "开票中",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "07",
        "applyName": "充值发票",
        "applyTime": "2019-04-03",
        "applyType": 2,
        "buyerName": "汪洋",
        "hasRed": "",
        "status": "2",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      },
      {
        "applyId": "10",
        "applyName": "充值发票",
        "applyTime": "2019-04-03",
        "applyType": 2,
        "buyerName": "汪洋",
        "hasRed": "",
        "status": "2",
        "statusName": "开票完成",
        "sumAmount": "345.00",
        "sumInvoice": "1",
        "sumTaxAmount": "0.00"
      }
    ],
    items: {}, //保存月份数据，
    currentItem: []
  },
  getMonth() { //获取月份
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month
    }
    this.setData({
      currentMonth: year + "-" + month
    })
  },
  getMonthList() { //创建现在的时间 得到时间列表

    var data = new Date();
    //获取年
    var year = data.getFullYear();
    //获取月
    var mon = data.getMonth() + 2;
    var arry = new Array();
    for (var i = 0; i < 5; i++) {
      mon = mon - 1;
      if (mon <= 0) {
        year = year - 1;
        mon = mon + 12;
      }
      if (mon < 10) {
        mon = "0" + mon;
      }
      arry[i] = year + "-" + mon;
    }
    this.setData({
      monthList: arry
    })
  },
  onLoad(query) {
    this.getMonth()
    this.getMonthList()
    // this.getCardList(this.data.currentMonth);
    console.log(JSON.stringify(query)) //获取上一个页面传过来的参数
    // my.alert({
    //   content: JSON.stringify(query),
    // });
  },
  getCardList(month) {
    let itemTemp = { ...this.data.items }
    // let month = this.data.items.month
    if (month) {
      month.page = month.page + 1
      month.content = month.c
    } else {
      this.data.items.month = {
        page: 1,
        total: 2,
        amount: 500,
        content: this.data.demoItems
      }
    }
    this.setData({

    })
  },
  chageMonth(ev) {
    let month = ev.target.dataset.month
    this.setData({
      // currentMonth: month
    })
  },
  onShow() {
    if (app.myEtcNeedRefresh) {
      app.myEtcNeedRefresh = false;
      this.getCardList(this.data.currentMonth)
    }
  },

  onReachBottom() {
    console.log("我已经被触底了。。。判断，是否又下一页，如果又下一页，就加载下一页，如果没下一页，就跳到下一个月的第一页加载")
  },
  onItemClick(e) {

    let item = this.data.items.filter(res => {
      return res.applyId == e.index
    })[0]

    this.data.currentItem = item
    my.navigateTo({
      url: `../invoiceStatus/invoiceStatus?statusId=${this.data.currentItem.applyId}&applyType=${this.data.currentItem.applyType}`
    })
  },
  onPageScroll: function (e) {
    let me = this;
    //tab的吸顶效果

    if (e.scrollTop < me.data.tabTop) {
      if (me.data.tabFix) {
        return
      } else {
        me.setData({
          tabFix: ''
        })
      }
    } else {
      me.setData({
        tabFix: ''
      })
    }
  },
  getTime(e) {
    my.datePicker({
      format: 'yyyy-MM',
      currentDate: '2019-4',
      startDate: '2018-1',
      endDate: '2019-4',
      success: (res) => {
        console.log(res.date)
        //   my.alert({
        //   content: res.date,
        // });
      },
    });
  },
  upper(e) {
    console.log(e);
  },
  lower(e) {
    console.log(e);
  },
  scroll(e) {
    console.log(e.detail.scrollTop);
  },
  scrollToTop(e) {
    console.log(e);
    this.setData({
      scrollTop: 0,
    });
  },
  // 3.当页面滚动距离scrollTop > menuTop菜单栏距离文档顶部的距离时，菜单栏固定定位
})