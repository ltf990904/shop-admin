<template>
  <div>
    <!-- 列表顶部 -->
    <el-row type="flex" justify="space-between" align="middle" class="tooltip">
      <el-col>
        <el-button>新增</el-button>
        <el-button @click>删除</el-button>
      </el-col>
      <div>
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 允许多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="类型" width="180"></el-table-column>

      <el-table-column prop="market_price" label="价格" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ids: []
    };
  },
  methods: {
    // 获取商品列表数据
    getList() {
      this.$axios({
        url: "/admin/goods/getlist?pageIndex=1&pageSize=4&searchvalue="
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        this.tableData = message;
      });
    },
    handleEdit(index, row) {},
    handleDelete(row) {},
    handleSelectionChange(val) {}
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.tooltip {
  margin: 20px 0;
}

.goods-img {
  width: 64px;
  margin-right: 10px;
}
</style>
