<template>
  <div>
    <div class="form-control">
      <div></div>
      <el-row style="width:100%; margin-top:20px" type="flex" justify="end">
        <el-col :span="6">
          <el-select v-model="statusValue" placeholder="选择订单状态" @change="hanleStatusChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入会员名称" v-model="searchvalue" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="订单id" minWidth="50"></el-table-column>
      <el-table-column prop="user_name" label="会员名称" minWidth="80"></el-table-column>
      <el-table-column prop="area" label="地址" minWidth="200"></el-table-column>
      <el-table-column prop="expressTitle" label="快递"></el-table-column>
      <el-table-column prop="statusName" label="状态" minWidth="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`order-edit/${scope.row.id}`">
            <el-button size="mini" type="primary">编辑</el-button>
          </router-link>
          <router-link :to="`order-detail/${scope.row.id}`">
            <el-button size="mini" type="success">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

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
          label: "待付款"
        },
        {
          value: 2,
          label: "已付款"
        },
        {
          value: 3,
          label: "已发货"
        },
        {
          value: 4,
          label: "已签收"
        },
        {
          value: 5,
          label: "已取消"
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
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    getList() {
      // 获取列表数据
      this.$axios({
        method: "GET",
        url: `/admin/order/getorderlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          vipname: this.searchvalue,
          orderstatus: this.orderstatus
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
<style scoped lang="less">
.form-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.el-table {
  margin-bottom: 20px;
}

.goods-info {
  display: flex;
  align-items: center;

  .goods-img {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      display: block;
      height: 64px;
    }
  }
}
.el-button {
  display: inline-block;
  margin-left: 5px;
}
</style>