const app = getApp();
Page({
  data: {
    index: "1",
    tabs: [
      {
        title: '新开具'
      },
      {
        title: '红字发票',
      },
      { title: '已作废' },
    ],
    activeTab: 0,
  },
  onLoad(query) {
    if (query.index) {
      this.setData({
        index: query.index
      })
      if (this.data.index == "3") {
        this.setData({
          tabs: [
            {
              title: '新开具'
            },
            {
              title: '红字发票',
            },
            { title: '已作废' },
          ]
        })
      }else if(this.data.index == "4"){
        this.setData({
          tabs: [
            {
              title: '红字发票',
            },
            { title: '已作废' },
          ]
        })
      }
    }
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
});
