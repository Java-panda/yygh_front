<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="app-container">
    <el-form ref="form" :model="hospitalSet" label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="hospitalSet.status"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveHospitalSet">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
</style>

<script>
import hospsetApi from '@/api/hospset'

export default {
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    this.getHospitalSetById()
  },
  methods: {
    getHospitalSetById() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        hospsetApi.getHospitalSetById(id).then(res => {
          this.hospitalSet = res.data
          console.log(res)
        }).catch(res => {
        })
      }
    },
    saveHospitalSet() {
      if (this.$route.params && this.$route.params.id) {
        hospsetApi.editHospitalSet(this.hospitalSet).then(res => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.$router.push({ path: '/hospset/list' })
        }).catch(res => {
          this.$message({
            type: 'warn',
            message: '更新失败!'
          })
        })
      } else {
        hospsetApi.saveHospitalSet(this.hospitalSet).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/hospset/list' })
        }).catch(res => {
          this.$message({
            type: 'warn',
            message: '添加失败!'
          })
        })
      }
    }
  }
}
</script>
