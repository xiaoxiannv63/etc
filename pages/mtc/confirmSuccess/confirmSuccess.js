Page({
  data: {
    showTop: false,
  },
  onLoad() {},
  mailInp(e){
    let isMail, mailReg=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
    isMail = mailReg.test(e.detail.value);
    this.setData({
      mail: e.detail.value,
      canNotKp: !isMail
    })
  },
  onTopBtnTap() {
    this.setData({
      showTop: true,
    });
  },
  onPopupClose() {
    this.setData({
      showTop: false,
    });
  },
});
