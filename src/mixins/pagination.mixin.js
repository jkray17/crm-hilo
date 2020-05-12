// import _ from 'lodash'
export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
    setupPagination(allItems) {
      const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) },
        (v, i) => arr.slice(i * size, i * size + size)
      )
      this.allItems = chunk(allItems, this.pageSize)
      this.pageCount = this.allItems.length
      // this.allItems = _.chunk(allItems, this.pageSize)
      // this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    console.log(this.allItems)
    console.log(this.pageCount)
    }
  }
}
