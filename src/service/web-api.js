import axios from "axios";

/**
 * @typedef {Object} SmmsApiResponse
 * @property {String} code 上传文件状态。正常情况为 success。出现错误时为 error
 * @property {String} filename 上传文件时所用的文件名
 * @property {String} storename 上传后的文件名
 * @property {Int} size 文件大小
 * @property {Int} width 图片的宽度
 * @property {Int} height 图片的高度
 * @property {String} hash 随机字符串，用于删除文件
 * @property {String} delete 删除上传的图片文件专有链接
 * @property {String} url 图片服务器地址
 * @property {String} path 图片的相对地址
 * @property {String} msg 上传图片出错时将会出现
 * @property {number} timestamp
 */
const dayUpAxios = axios.create({
  // baseURL: "http://47.98.190.65:8080/daydayup/"
  // baseURL: "http://localhost:8079/daydayup/"
  baseURL: "http://localhost:8079/daydayup",
  withCredentials: true
});

/**
 * 向sm.ms API上传图片
 * https://sm.ms/doc/
 *
 * @async
 * @return {Promise<SmmsApiResponse>} A promise to the token.
 */
function uploadForm(file) {
  let formData = new FormData();
  formData.append("smfile", file);
  return axios
    .post("https://sm.ms/api/upload", formData)
    .then(x => x.data.data);
}

/**
 * 从后端获取语录
 * http://47.98.190.65:8080/daydayup
 */
function getQuotes() {
  return dayUpAxios.get("/admin", {
    params: {method: "queryPassedCards"}
  })
    .then(response => response.data);
}

function getQuotesByTheme(theme) {
  return dayUpAxios.get("/user", {
    params: {
      method: "queryPassedCards",
      theme: theme
    }
  })
    .then(response => response.data);
}

/**
 * 用户登录
 * @param loginParams
 * @returns {Promise<AxiosResponse<any>>}
 */
function userLogin(loginParams) {
  loginParams["method"] = "login";
  return dayUpAxios
    .post("/user", null, {
      params: loginParams
    })
    .then(response => response.data);
}

/**
 * 提交新语录表单
 * @param newQuoteParams
 * @returns {Promise<AxiosResponse<any>>}
 */
function commitForm(newQuoteParams) {
  newQuoteParams["method"] = "upload";
  return dayUpAxios
    .post("/user", null, {
      params: newQuoteParams
    })
    .then(response => response.data);
}

function likeAQuote(likedId) {
  return dayUpAxios
    .post("/user", null, {
      params: {
        method: "upVote",
        id: likedId
      }
    })
    .then(response => response.data);
}


export {uploadForm, getQuotes, userLogin, commitForm, likeAQuote};

