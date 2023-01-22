<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <a ref="http://localhost:8202/admin/cmn/dict/downloadDictExcelList" target="_blank">
      <el-button type="success" @click="download">导出数据</el-button>
    </a>
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">

        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/uploadDictExcelList'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-button type="success" @click="upload"><i class="fa fa-plus" /> 导入</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="值"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="dictCode"
        label="代码"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
</style>

<script>
import dictApi from '@/api/dict'

export default {
  data() {
    return {
      tableData: [],
      dialogImportVisible: false
    }
  },
  created() {
    this.getDictChildrenByParentId(1)
  },
  methods: {
    getDictChildrenByParentId(id) {
      dictApi.getDictChildrenByParentId(id).then(res => {
        this.tableData = res.data
      })
    },
    download() {
      window.location.href = 'http://localhost:8202/admin/cmn/dict/downloadDictExcelList'
    },
    upload() {
      this.dialogImportVisible = true
    },
    onUploadSuccess() {
      this.dialogImportVisible = false
      this.getDictChildrenByParentId(1)
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        dictApi.getDictChildrenByParentId(tree.id).then(res => {
          resolve(res.data)
        })
      }, 1000)
    }
  }
}
</script>
