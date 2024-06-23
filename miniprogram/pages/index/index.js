Page({
    data: {
        goodsList: [
            {
                id: '1"',
                title: 'Q And A',
                url: '/pages/qanda-page/index'
            }, {
                _id: '1',
                title: '云开发开始',
                url: '/pages/cloud-dev/index'
            }, {
                _id: '1',
                title: '商品列表',
                url: '/pages/goods-list/index'
            }, {
                _id: '1',
                title: '云开发部署',
                url: '/pages/deployService/index'
            }, {
                _id: '1',
                title: '云开发组件',
                url: '/pages/cloud-dev-components/index'
            }, {
                _id: '1',
                title: '正在加载页面',
                url: '/pages/loading-page/index'
            }, {
                _id: '1',
                title: 'OCR_示例',
                url: '/pages/ocr-components/index'
            }, {
                _id: '1',
                title: '开始页面',
                url: '/pages/home-page/index'
            }, {
                id: '1',
                title: '登陆页面',
                url: '/pages/login-page/index'
            }, {
                id: '1',
                title: 'Order Form',
                url: '/pages/order-form/index'
            }, {
                id: '1',
                title: 'Applies',
                url: '/pages/register-apply/index'
            }, {
                id: '1',
                title: 'Register',
                url: '/pages/register-page/index'
            }, {
                id: '1',
                title: 'Draft',
                url: '/pages/draft-page/index'
            }],
    },

    onLoad() {
        // this.fetchGoodsList();
    },
    jumpPage(e) {
        const index = e.currentTarget.dataset.index;
        const current_url = this.data.goodsList[index].url;
        wx.navigateTo({
            url: current_url,
        })
    },

    goToPage() {
        wx.navigateTo({
            url: '/pages/examples/index',
        })
    },

    async fetchGoodsList() {
        this.setData({ isLoading: true });
        const res = await wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: { type: 'fetchGoodsList' },
        });
        const goodsList = res?.result?.dataList || [];
        this.setData({
            isLoading: false,
            goodsList
        });
    },
});   