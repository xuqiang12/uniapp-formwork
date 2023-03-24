import baseUrl from "@/common/util/config.js"
import qs from "qs";
const request = (config) => {
  console.log("🚀 ~ file: request.js:4 ~ request ~ config:", config)
  // 处理 apiUrl
  if (config.url.indexOf("http://") == -1) {
    config.url = baseUrl + config.url;
  }
  // config.header = !config.header? {source : 'app'} : {source: 'app', ...config.header};
  //判断是否有token，token存在header添加token,
  if (uni.getStorageSync("token")) {
    var token = uni.getStorageSync("token");
    config.header = {
      // source: 'app',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authentication: token
    }
  } else {
    config.header = {
      // source: 'app',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  config.timeout = 5000;
  // 判断结束
  config.data = qs.stringify(config.data);
  // config.data = !config.data ? {} : config.data;
  let promise = new Promise((resolve, reject) => {
    uni.request(config).then(responses => {
      console.log(responses, config.url, "这是请求的接口")
      // 异常
      if (responses[0]) {
        reject({ message: "网络超时" });
        uni.showToast({ title: '网络超时', icon: 'none' })
      } else if (responses[1].data.code === 403) {
        uni.removeStorageSync('token')
        // reject(
        //   uni.showModal({
        //     title: '下线通知',
        //     content: '您的账号在另一地点登录了，已被迫下线。',
        //     showCancel: false,
        //     confirmColor: "#31D9BC",
        //     success: function (res) {
        //       console.log(res, '下线通知')
        //       if (res.confirm) {
        uni.reLaunch({
          url: "/pages/login/index"
        })
        //       }
        //     }
        //   }));
      } else if (responses[1].data.code === 5009) {
        uni.removeStorageSync('token')
        reject(
          uni.showModal({
            content: responses[1].data.message,
            showCancel: false,
            confirmColor: "#31D9BC",
            success: function (res) {
              if (res.confirm) {
                uni.reLaunch({
                  url: "/pages/login/login"
                })
              }
            }
          }))
      } else if (responses[1].data.code === 10000) {
        reject(
          uni.showToast({
            title: responses[1].data.msg,
            icon: 'none'
          }))
      } else if (responses[1].data.code === 200) {
        let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
        resolve(response);
      } else {
        uni.showToast({
          title: responses[1].data.message,
          icon: 'none'
        })
      }
    }).catch(error => {
      reject(error);
    })
  })
  return promise;
};

export default request;
