<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">Записей нет</p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      />

    </section>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import { Line } from 'vue-chartjs'

export default {
  name: 'hystory',
  data: () => ({
    records: [],
    loading: true
  }),
  extends: Line,
  mixins: [paginationMixin],
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')
    this.records = this.records.map( record => {
          return {
            ...record,
            categoryName: categoires.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
                  record.type === 'income'
                    ? 'Доход'
                    : 'Расход'
          }
        })
    this.setupPagination(this.records)
    this.setup(categoires)

    this.loading = false
  },
   methods: {
    setup(categoires) {
      console.log('TYT')
      this.renderChart({
        labels: categoires.map(c => c.title),
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 69, 3, 94, -12, 12, 3, 67 ,13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.2)',
                '#08f',
                'rgba(255, 159, 255, 0.61)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
    }
  },
  computed: {
    // ...mapGetters(['info'])
  },
  components: { HistoryTable }
}

</script>