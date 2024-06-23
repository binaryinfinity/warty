const defaultAvatarUrl = './../../images/loginProfile.png'
const db = wx.cloud.database()

Page({
    data: {
        eye_icon: '../../images/icons/visibilityOff.png',
        avatarUrl: defaultAvatarUrl,
        nickname: '',
        username: '',
        passcode: '',
        passcodecfm: '',
        inputValue: '',
        psTxtSwitch: true,
    },
    onLoad() {
    },

    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        this.setData({
            avatarUrl,
        })
    },

    onIconTap() {
        let psts = this.data.passcodecfm
        this.setData({
            psTxtSwitch: !this.data.psTxtSwitch,
            passcodecfm: psts
        })
    },

    formSubmit(e) {
        console.log(e.detail.value)
        this.setData({
            nickname: e.detail.value.nickname,
            username: e.detail.value.username,
            passcode: e.detail.value.passcode,
            passcodecfm: e.detail.value.passcodecfm,
        })
        console.log(this.data.nickname)
        console.log(this.data.username)
        console.log(this.data.passcode)
        console.log(this.data.passcodecfm)
        console.log(this.data.avatarUrl)
        console.log(getApp().globalData.user_openid)
    },

    bindPSKeyInput: function (e) {
        this.setData({
            passcode: e.detail.value
        })
        console.log(this.data.passcode)
    },

    bindPSCKeyInput: function (e) {
        this.setData({
            passcodecfm: e.detail.value
        })
        console.log(this.data.passcodecfm)
    },

    // Logic should be implement in the App.onLoad for checking if user is registered.
    queryMe() {
        wx.showLoading();
        let userOpenid = getApp().globalData.user_openid;
        db.collection('xs_user').where({
            user_openid: userOpenid
        })
        .get().then(res => {
            if(res.data.length>0) {
                wx.redirectTo({
                  url: '../order-form/index',
                })
            }else {
                wx.redirectTo({
                  url: '../register-apply/index',
                })
            }
        })
        wx.hideLoading();
    }

})
