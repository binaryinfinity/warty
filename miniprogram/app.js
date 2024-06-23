// app.js
const { envId } = require('./envList');

App({
    globalData: {
        haveGetOpenId: false,
        user_openid: '',
        userInfo: {},
    },

    onLaunch() {
        wx.cloud.init({
            env: envId
        });

        wx.showLoading({
            title: '获取OpenId',
        });

        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId'
            }
        }).then((resp) => {
            this.globalData.haveGetOpenId = true;
            this.globalData.user_openid = resp.result.openid;
            console.log(this.globalData.user_openid)
            wx.hideLoading();
        }).catch((e) => {
            this.setData({
                showUploadTip: true
            });
            wx.hideLoading();
        });
    },

    funTmpStorage() {
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success(res) {
                if (res.confirm) {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            wx.showTabBar({
                                success: function (res) {
                                    console.log('[ConsoleLog]; ')
                                    console.log(res)
                                },
                                fail(res) {
                                    console.log('[ConsoleLog]; ')
                                    console.log(res)
                                }
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('[ConsoleLog]: 用户点击取消, 退出小程序')
                    wx.exitMiniProgram({
                        success: (res) => {
                            console.log('[ConsoleLog]: ' + 'exitMiniProgram Success')
                            console.log('[ConsoleLog]: ' + res)
                        },
                        fail: () => {
                            console.log('[ConsoleLog]: ' + 'exitMiniProgram fails')
                        }
                    })
                }
            }
        });
    }

});


