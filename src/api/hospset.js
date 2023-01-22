import request from '@/utils/request'

export default {
  listPageHospitalSet(page, limit, hospitalSetQueryVo) {
    return request({
      url: `/admin/hosp/hospitalset/listPageHospitalSet/${page}/${limit}`,
      method: 'post',
      data: hospitalSetQueryVo
    })
  },
  getHospitalSetById(id) {
    return request({
      url: `/admin/hosp/hospitalset/getHospitalSetById/${id}`,
      method: 'get'
    })
  },
  saveHospitalSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalset/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  editHospitalSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalset/editHospitalSet`,
      method: 'put',
      data: hospitalSet
    })
  },
  deleteHospitalSetById(id) {
    return request({
      url: `/admin/hosp/hospitalset/deleteHospitalSetById/${id}`,
      method: 'delete'
    })
  },
  deleteHospitalSetByIds(ids) {
    return request({
      url: `/admin/hosp/hospitalset/deleteHospitalSetByIds`,
      method: 'delete',
      data: ids
    })
  },
  lockHospitalSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalset/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  }
}

// export function listPageHospitalSet(page, limit, hospitalSetQueryVo) {
//   return request({
//     url: `/admin/hosp/hospital/listPageHospitalSet/${page}/${limit}`,
//     method: 'post',
//     params: hospitalSetQueryVo
//   })
// }
