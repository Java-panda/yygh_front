import request from '@/utils/request'

export default {
  getDictChildrenByParentId(id) {
    return request({
      url: `/admin/cmn/dict/getDictChildrenByParentId/${id}`,
      method: 'get'
    })
  }
}
