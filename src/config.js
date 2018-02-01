/**
 * 如果你还没有React技术栈基础，尤其是React和Redux的相关基础。建议先从这了解下：https://segmentfault.com/a/1190000009879742，
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config) {
    Toast.loading('加载中', 0)
    return config
})

axios.interceptors.response.use(function(config) {
    Toast.hide()
    return config
})