const app = getApp();

Page({
  data: {
    cardId: '',
    month: '',
    chooseMonth: '',
    titleId: '',
    titleName: '',
    checked: false,
    selAllList: false, //全选按钮的值
    selAllOnOff: false, //全选开关 
    bindCardList: [],
    amount: 0,
    type: '',
    pageIndex_xf: 1,
    pageIndex_cz: 1,
    Items: [],
    Items_xf: [],
    Items_cz: [],
    hasMore_xf: true,
    hasMore_cz: true,
    searchFlog_xf: false,
    searchFlog_cz: true,
    total_xf: '0',
    total_cz: '0',
    total: '0',
    top: "420rpx",
    showAmount: true,
    invType: 'xf',
  },
  onLoad(query) {
    let d = new Date();
    console.log(query.type, 'query.type')
    this.setData({
      month: d.getFullYear() + "-" + num2(d.getMonth() + 1),
      cardId: query.cardId,
      titleId: query.titleId,
      titleName: query.titleName,
      type: query.type
    })
    function num2(num) {
      return ('0' + num).slice(-2)
    }
    this.getAmount();
    this.getTransList();
  },
  onShow() {
    if (app.recordListRefresh) {//判断是佛需要刷新
      app.recordListRefresh = false;
      this.setData({
        Items_xf: [],
        Items_cz: [],
        Items: [],
        pageIndex_xf: 1,
        pageIndex_cz: 1,
        hasMore_xf: true,
        hasMore_cz: true,
        selAllOnOff: false,
        bindCardList: [],
        total: 0
      })
      this.getAmount();
      this.getTransList();
    }
  },
  lower() {
    console.log("到底了xxxx")
    console.log(this.data['hasMore_cz'], "this.data['hasMore_cz']")
    if (this.data.invType == 'xf' && this.data['hasMore_xf']) {
      console.log(this.data['hasMore_xf'])
      this.getTransList();
    }
    else if (this.data.invType == 'cz' && this.data['hasMore_cz']) {
      console.log()
      this.getTransList();
    }
  },
  getAmount() {
    let json1;
    json1 = {
      cardId: this.data.cardId,
      ticketId: app.userInfo.ticketId
    }
    app.ajax(json1, 'CARD_DETAIL', (data) => {
      console.log('记账卡', data)
      if (data.cardType == "记账卡") {
        this.setData({
          amount: data.amount,
          top: "420rpx",
          showAmount: false
        })
      } else {
        this.setData({
          amount: data.amount,
          top: "580rpx",
          showAmount: true
        })
      }
    })
  },
  getTransList() {
    let json1, json2, that = this;
    json1 = {
      cardId: this.data.cardId,
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageIndex_xf,
      pageSize: 10
    }
    json2 = {
      cardId: this.data.cardId,
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageIndex_cz,
      pageSize: 10
    }
    console.log(this.data.invType)
    if (this.data.invType == 'xf') {
      console.log('xf发情请求')
      app.ajax(json1, 'INVOICE_TRANSLIST', (data) => {
        let hasMore_xf = data.items.length < 10 ? false : true;
        for (let i in data.items) {
          data.items[i].exTime = app.format(data.items[i].exTime)
        }
        if (data.items.length > 0) {
          this.data.Items_xf = this.data.Items_xf.concat(data.items)
          this.data.pageIndex_xf = ++this.data.pageIndex_xf
        }

        this.setData({
          hasMore_xf: hasMore_xf,
          pageIndex_xf: this.data.pageIndex_xf,
          Items: this.data.Items_xf
        })
        console.log('xf', this.data.Iems)

        if (this.data.selAllOnOff) {
          let arr = [], tot = 0;
          for (let i in this.data.Items) {
            arr.push(this.data.Items[i].tradeId);
            tot += this.data.Items[i].fee;
          }
          this.setData({
            bindCardList: arr,
            total: tot
          })
        }
      })
    }
    if (this.data.invType == 'cz') {
      console.log('cz发送请求')
      app.ajax(json2, 'INVOICE_RECHARGELIST', (data) => {
        console.log('cz发送的请求', data)
        let hasmore_cz = data.items.length < 10 ? false : true;
        for (let i in data.items) {
          data.items[i].time = app.format(data.items[i].time)
        }
        if (data.items.length > 0) {
          this.data.Items_cz = this.data.Items_cz.concat(data.items)
          this.data.pageIndex_cz = ++this.data.pageIndex_cz
        }
        this.setData({
          hasMore_cz: hasmore_cz,
          pageIndex_cz: this.data.pageIndex_cz,
          Items: this.data.Items_cz
        })
        console.log('cz', this.data.Items)
        if (this.data.selAllOnOff) {
          let arr = [], tot = 0;
          for (let i in this.data.Items) {
            arr.push(this.data.Items[i].tradeId);
            tot += this.data.Items[i].fee;
          }
          this.setData({
            bindCardList: arr,
            total: tot
          })
        }
      })
    }


  },
  listChange(e) {//改动
    // console.log(e.detail)
    let tot = 0;
    for (let i in e.detail.value) {
      for (let j in this.data.Items) {
        if (e.detail.value[i] == this.data.Items[j].tradeId)
          tot += this.data.Items[j].fee;

      }
    }
    this.setData({
      bindCardList: e.detail.value,
      total: tot
    })
  },
  selAll(e) {//全选
    var v = e.detail.value;
    if (v) {
      this.setData({
        checked: true
      })
    } else {
      this.setData({
        checked: false,
      })
    }
    let tot = 0
    if (v) {
      let arr = [];
      for (let i in this.data.Items) {
        arr.push(this.data.Items[i].tradeId);
        tot += this.data.Items[i].fee;
      }
      this.setData({
        selAllOnOff: true,
        bindCardList: arr,
        total: tot
      })
    } else {
      this.setData({
        selAllOnOff: false,
        bindCardList: [],
        total: tot
      })
    }

  },
  selDate() {
    let d = new Date();
    let that = this;
    let searchFlog_xf = false
    let searchFlog_cz = false
    if (this.data.invType == 'xf') {
      searchFlog_xf = true
      searchFlog_cz = false
    }
    else if (this.data.invType == 'cz') {
      searchFlog_xf = false
      searchFlog_cz = true
    }
    my.datePicker({
      format: 'yyyy-MM',
      startDate: (d.getFullYear() - 1) + "-" + (d.getMonth() + 1),
      currentDate: this.data.month,
      endDate: d.getFullYear() + "-" + (d.getMonth() + 1),
      success: (res) => {
        // console.log(res);
        that.setData({
          pageIndex_xf: 1,
          pageIndex_cz: 1,
          month: res.date,
          searchFlog_xf: searchFlog_xf,
          searchFlog_cz: searchFlog_cz,
          hasMore_cz: true,
          hasMore_xf: true,
          Items: [],
          Items_cz: [],
          Items_xf: []
        })
        that.getTransList();

      }
    });
  },
  settle() {//结算
    if (this.data.bindCardList.length <= 0) return;
    if (this.data.showAmount && this.data.total > this.data.amount) {
      my.alert({ 'content': '可开票余额不足，勾选的交易总金额不可大于可开票余额，请减少勾选交易记录后重试' })
      return;
    }
    app.inv = {
      bindCardList: this.data.bindCardList,
      titleId: this.data.titleId,
      month: this.data.month.split("-").join(""),
      tot: this.data.total,
      cardId: this.data.cardId,
      type: this.data.invType
    }
    // console.log(app.inv);
    my.navigateTo({
      url: '/pages/iWangTo/invAccept/invAccept'
    });
  },
  chooseXF() {
    this.setData({
      total: 0,
      selAllOnOff: false,
      checked: false,
      invType: 'xf'
    })
    this.setData({
      Items: this.data.Items_xf
    })
    if (this.data.searchFlog_xf) {
      this.setData({
        searchFlog_xf: false
      })
      this.getTransList()
    }
  },
  chooseCZ() {
    this.setData({
      total: 0,
      selAllOnOff: false,
      checked: false,
      invType: 'cz',
    })
    this.setData({
      Items: this.data.Items_cz
    })
    if (this.data.searchFlog_cz) {
      this.setData({
        searchFlog_cz: false
      })
      this.getTransList();
    }
  },
  noCurrentList() {
    my.alert({
      title: '关于可开票记录的说明',
      content: ' ·  自2018年1月1日开始，充值发票可在实际充值24小时后，在平台进行申请开票；\n ·  由于全国路网信息复杂，存在地域限制，信息传输时间不一致。如果24小时内未看到充值记录，建议您耐心等待，稍后再次查看； \n · 2017年12月31日以前产生的充值记录，请您联系ETC发行方处理。',
      buttonText: '我知道了'
    });
  }
});