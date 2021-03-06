import {
  axios
} from '@/utils/request'

const api = {
  user: '/mock/api/user',
  role: '/mock/api/role',
  service: '/mock/api/service',
  permission: '/mock/api/permission',
  permissionNoPager: '/mock/api/permission/no-pager'
}

export default api

//post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

//put
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}

//get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

//deleteAction
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl(avatar, subStr) {
  if (!subStr) subStr = 'http'
  try {
    if (avatar && avatar.startsWith(subStr)) {
      return avatar;
    } else {
      if (avatar && avatar.length > 0 && avatar.indexOf('[') == -1) {
        return window._CONFIG['staticDomainURL'] + "/" + avatar;
      }
    }
  } catch (err) {
    return;
  }
}
