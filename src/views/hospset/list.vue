<template>
  <div class="app-container">
    <el-form :inline="true" :model="hospitalSetQueryVo" class="demo-form-inline">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSetQueryVo.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSetQueryVo.hoscode" placeholder="医院编号" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getlistPageHospitalSet()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="deleteHospitalSetByIds()">批量删除</el-button>
    <el-table
      :data="list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="hosname" label="医院名称" width="180" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteHospitalSetById(scope.row.id)">删除</el-button>
          <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary">修改</el-button>
          </router-link>
          <el-button v-if="scope.row.status === 1" type="success" @click="lockHospitalSet(scope.row.id,0)">锁定</el-button>
          <el-button v-if="scope.row.status === 0" type="warning" @click="lockHospitalSet(scope.row.id,1)">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding:30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getlistPageHospitalSet"
    />
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import hospsetApi from '@/api/hospset'

export default {
  data() {
    return {
      page: 1,
      limit: 3,
      list: null,
      total: 0,
      hospitalSetQueryVo: { hosname: '', hoscode: '' },
      multipleSelection: []
    }
  },
  created() {
    this.getlistPageHospitalSet()
  },
  methods: {
    getlistPageHospitalSet(page = 1) {
      this.page = page
      hospsetApi
        .listPageHospitalSet(this.page, this.limit, this.hospitalSetQueryVo)
        .then((response) => {
          this.list = response.data.records
          this.total = response.data.total
          console.log(response)
        })
        .catch((response) => {
          console.log(response)
        })
    },
    deleteHospitalSetById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospsetApi.deleteHospitalSetById(id).then(res => {
          this.getlistPageHospitalSet()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(res => {
          this.$message({
            type: 'warn',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteHospitalSetByIds() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        this.multipleSelection.forEach(val => {
          ids.push(val.id)
        })
        hospsetApi.deleteHospitalSetByIds(ids).then(res => {
          this.getlistPageHospitalSet()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(res => {
          this.$message({
            type: 'warn',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    lockHospitalSet(id, status) {
      hospsetApi.lockHospitalSet(id, status).then(res => {
        this.getlistPageHospitalSet()
      }).catch(res => {
        this.$message({
          type: 'warn',
          message: '设置失败!'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
