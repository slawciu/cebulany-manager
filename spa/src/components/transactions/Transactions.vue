<template lang="pug">
  b-row
    b-col
      h1 Przelewy
      TransactionForm(@change="fetchTransactions")
      TransactionLegend(:budgets="budgets", :paymentTypes="paymentTypes")
      PromisedComponent(:state="promiseState")
        TransactionTable(
          :transactions="transactions",
          :budgets="budgets",
          :paymentTypes="paymentTypes",
          :sum="sum")
      TransactionLegend(:budgets="budgets", :paymentTypes="paymentTypes")
      TransactionUploadForm(@upload="uploadTransactions")

</template>

<script>
import TransactionLegend from './TransactionLegend'
import TransactionTable from './TransactionTable'
import TransactionForm from './TransactionForm'
import TransactionUploadForm from './TransactionUploadForm'
import linkVm from '@/helpers/linkVm'

import TransactionService from '@/services/transactions'
import BudgetService from '@/services/budget'
import PaymentTypeService from '@/services/paymentType'

export default {
  data () {
    return {
      transactions: [],
      paymentTypes: {},
      budgets: {},
      sum: 0,
      sumLeft: 0,
      promiseState: null
    }
  },
  components: {
    TransactionLegend,
    TransactionTable,
    TransactionForm,
    TransactionUploadForm
  },
  created () {
    this.fetchInit();
  },
  methods: {
    fetchInit () {
      let promises = [BudgetService.getAll(), PaymentTypeService.getAll()];
      linkVm(this, Promise.all(promises))
        .then(([budgetResponse, paymentTypeResponse]) => {
          this.budgets = this.transformArrayToMap(budgetResponse.data);
          this.paymentTypes = this.transformArrayToMap(paymentTypeResponse.data);
          this.fetchTransactions();
        })
    },
    transformArrayToMap (array) {
      let obj = {};
      array.forEach((item) => {
        obj[`${item.id}`] = item;
      });
      return obj;
    },
    fetchTransactions (params) {
      linkVm(this, TransactionService.get(params))
        .then((response) => {
          this.transactions = response.data.transactions;
          this.sum = response.data.sum;
          this.sumLeft = response.data.sumLeft;
        })
    },
    uploadTransactions () {
      this.fetchTransactions();
    }
  }
}
</script>

<style>
  .transaction-badge {
    display: inline-block;
    text-align: center;
    width: 16px;
    margin: 0 1px;
    border-radius: 4px;
    color: white;
    font-size: 7pt;
    font-weight: bold;
    border: solid black;
    border-width: 3px;
  }
  .transaction-badge-big {
    width: 18px;
    font-size: 9pt;
    border-radius: 8px;
  }
</style>
