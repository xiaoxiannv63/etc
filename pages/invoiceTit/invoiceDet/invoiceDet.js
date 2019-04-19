const app = getApp();
Page({
  data: {
    invoice:{},
    cardnum: 0,
    curPage: 1,
    pageSize: 10,
    items:[],
    hasmore: true  //是否有更多ETC卡绑定
  },
  onLoad(query) {
    // console.log(query);
    this.setData({
      invoice: query
    })
    this.getBindEtc();
  },
  onShow(){
    if(app.needRefresh){
      this.setData({
        curPage:1
      })
      this.getBindEtc();
    }
  },
  getBindEtc(){
    let json1 = {
      ticketId:app.userInfo.ticketId,
      titleId:this.data.invoice.tit,
      pageIndex:this.data.curPage,
      pageSize: 10
    }
    let that = this;
    app.ajax(json1,'TITLE_CARDLIST',function(data){
      let hasmore = (data.items.length < 10)?false:true
      that.setData({
        curPage: ++that.data.curPage,
        cardnum: data.cardnum,
        items: data.items,
        hasmore: hasmore
      })
    })
  },
  delTaitou(){//删除抬头
    let that = this;
    if(this.data.cardnum > 0){
      my.alert({
        title: '温馨提示',
        content: '该发票抬头存在已关联的ETC卡，只有先解除抬头与卡片的关联关系后才可能删除发票抬头。(若要解除当前抬头与ETC卡的关联关系，请将ETC卡与其他抬头关联)',
        buttonText: '我知道了',
        success: (res) => {
          
        },
      });
    }else{
      my.confirm({
        title: '温馨提示',
        content: '确认删除抬头信息吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if(result.confirm){
            let json1 = {
              titleId: that.data.invoice.tit,
              ticketId: app.userInfo.ticketId
            };
            app.ajax(json1,'TITLE_DELETE',function(){
              app.invTitIndNeedRefresh = true;
              my.navigateBack();
            })
          }
        },
      });
    }
  },
  toSelEtc(){//去关联ETC卡
    let str = '?tit='+this.data.invoice.tit;
    my.navigateTo({
      url:'/pages/invoiceTit/selEtc/selEtc'+str
    });
  },
  redact(){//编辑抬头
    let str = '?';
    let inv = this.data.invoice;
    for(let i in inv){
      str += i + "=" + inv[i] + "&"
    }
    // console.log(str);
    my.navigateTo({
      url:'/pages/invoiceTit/redact/redact'+str
    });
  }
});
