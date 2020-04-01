const baseUrl = 'https://areal.weboostapp.com/api/api/v1/'

export function request(url, param) {
  return new Promise((resolve, reject) => {
    mpvue.showLoading();
    try {
      wx.request({
        url: baseUrl + url,
        method: param.method || 'POST',
        ...param,
        success(res) {
          const code = getIn(res, 'data', 'code')
          mpvue.hideLoading();
          if (code === 0) {
            console.log(param)
            param.successMsg &&
              mpvue.showToast({
                title: param.successMsg,
                icon: "none"
              });
            resolve(res.data.data || res.data)
          } else {
            param.errorMsg &&
              mpvue.showToast({
                title: param.errorMsg,
                icon: "none"
              });
            resolve('')
          }
        },
        fail(err) {
          mpvue.hideLoading();
          console.log('request fail:')
          mpvue.showToast({
            title: "服务器错误",
            icon: "none"
          });
          resolve('')
        },
      })
    } catch (err) {
      console.log('catched errro')
      mpvue.hideLoading();
      mpvue.showToast({
        title: "服务器错误",
        icon: "none"
      });
      resolve('')
    }
  })
}

export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate(input) {
  const date = new Date(input)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month.padStart(1,"0")}-${day.padStart(1,"0")}`
}

export function getIn(obj, ...restParams) {
  if (typeof (obj) === 'undefined') {
    return null
  }
  const validateObj = (object, key) => {
    return ['undefined'].indexOf(typeof (object[key])) === -1 ? object[key] : null
  }
  const paramLen = restParams.length
  let currentIndex = 0,
    currentVal = validateObj(obj, restParams[currentIndex])
  if (!restParams.length) {
    return obj
  }

  while (currentVal !== null) {
    // 如果已经是最后一层结构，直接返回
    if (currentIndex === paramLen - 1) {
      return currentVal
    }
    // 如果不是最后一层且值存在，进行深层判断
    if (currentVal !== null) {
      currentIndex++
      currentVal = validateObj(currentVal, restParams[currentIndex])
    } else {
      return null
    }
  }
}