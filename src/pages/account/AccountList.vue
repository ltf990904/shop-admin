<template>
  <div>
    <!-- 列表顶部 -->
    <el-row type="flex" justify="space-between" align="middle" class="tooltip">
      <el-col></el-col>
      <div>
        <el-input placeholder="会员名称" v-model="searchvalue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 会员列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="reg_time" label="时间"></el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
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
      tableData: [
        {
          username: "",
          gender: 1,
          age: 28,
          phone_numer: 13800138000,
          email: "",
          time: ""
        }
      ],
      selectedRows: [],

      pageIndex: 1,
      pageSize: 5,
      searchvalue: "",
      orderstatus: 0,
      totalCount: 0,

      options: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "VIP"
        }
      ],
      statusValue: ""
    };
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    handleEdit(val) {
      this.$router.push({ name: "order-edit", params: { id: val.id } });
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    getList() {
      //获取列表数据
      this.$axios({
        method: "GET",
        url: `/admin/account/getlist`,
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
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    hanleStatusChange(val) {
      this.orderstatus = val;
      this.getList();
    }
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

.block {
  margin-top: 20px;
}
</style>
