<template>
  <div>
    <!-- 列表顶部 -->
    <el-row type="flex" justify="space-between" align="middle" class="tooltip">
      <el-col>
        <router-link to="goods-add" class="btn-add">
          <el-button>新增</el-button>
        </router-link>
        <el-button @click="handleMoreDelete">删除</el-button>
      </el-col>
      <div>
        <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 允许多选 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column prop="categoryname" label="类型" width="200"></el-table-column>
      <!-- 价格 -->
      <el-table-column prop="market_price" label="价格" width="200"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ids: [],
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
      searchvalue: ""
    };
  },
  methods: {
    // 获取商品列表数据
    getList() {
      // this.$axios({
      //   url: "/admin/goods/getlist?pageIndex=1&pageSize=4&searchvalue="
      // }).then(res => {
      //   // console.log(res);
      //   const { message } = res.data;
      //   this.tableData = message;
      // });

      this.$axios({
        method: "GET",
        url: `/admin/goods/getlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        const { message, pageIndex, pageSize, totalcount } = res.data;
        this.tableData = message;
        (this.pageIndex = pageIndex), (this.pageSize = pageSize);
        this.totalCount = totalcount;
      });
    },

    // 删除单行数据
    handleDelete(row) {
      const id = row.id;
      this.$confirm("是否删除商品?").then(() => {
        this.$axios({
          url: `/admin/goods/del/${id}`
          // 处理跨域请求的参数
          // withCredentials: true
        }).then(res => {
          const { status, message } = res.data;
          this.$message({
            type: "success",
            message
          });
          // 刷新数据商品列表
          this.getList();
        });
      });
    },
    // 多选的时候触发
    handleSelectionChange(val) {
      var ids = val.map(v => {
        return v.id;
      });
      this.ids = ids;
    },
    // 删除多条数据
    handleMoreDelete() {
      const id = this.ids.join(",");
      // 判断是否选择了商品
      if (id == "") {
        this.$message({
          type: "error",
          message: "没有选择商品"
        });
        return;
      }
      // 询问是否删除
      this.$confirm("是否删除所选商品?").then(() => {
        //调用删除接口
        this.$axios({
          url: `/admin/goods/del/${id}`,
          // 处理跨域请求的参数
          withCredentials: true
        }).then(res => {
          const { status, message } = res.data;
          // 删除成功后的提示
          this.$message({
            type: "success",
            message
          });
          // 刷新数据列表
          this.getList();
        });
      });
    },
    // 编辑商品
    handleEdit(index, row) {
      // 跳转到编辑页，并且带上id
      this.$router.push(`/admin/goods-edit/${row.id}`);
    },
    // 搜索
    handleSearch() {
      // this.pageIndex = 1;
      this.getList();
    },
    // 没有显示多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 当前页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.tooltip {
  margin: 20px 0;
}
.btn-add {
  margin-right: 10px;
}
.goods-img {
  width: 64px;
  margin-right: 10px;
}

.block {
  margin-top: 20px;
}
</style>
