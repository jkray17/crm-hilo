<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>{{categories.length}}
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
      <h3>Не грусти- в ближайшем будущем нас ждут и удачные обновления</h3>
      <h3>Спланировать марафон</h3>
      <p>Критерии турнира:</p>
      <ul>
        <li>Цель: достижение определенного БР, заработок  в месяц/час etc</li>
        <li>Стартовые условия: достижение определенного БР, заработок  в месяц/час etc</li>
      </ul>
      <p>Спланировать турнир</p>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length"> Пока что записей нет<router-link to="/categories"> Добавить категорию</router-link></p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
              class="determinate"
              :class="cat.progressColor"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  name: 'planing',
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    // console.log(records)
    const categoires = await this.$store.dispatch('fetchCategories')
    // console.log(categories.length)

    this.categories = categoires.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? 'Пререрасход' : 'Отсалось'
        // tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    // addNewCategory(category) {
    //   this.categories.push(category)
    // },
    // updateCategories(category) {
    //   const idx = this.categories.findIndex( c => c.id === category.id)
    //   this.categories[idx].title = category.title
    //   this.categories[idx].limit = category.limit
    //   this.updateCount++
    // }
  }
}

</script>