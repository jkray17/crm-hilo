<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form"  @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Пустое имя недопустимо</small>

      </div>

      <div class="col s12 m4">
        <span class="settings-title">Установка персональных данных и настройка аккаунта</span>
      </div>
      <div class="row">
    <div class="col s12 m12">

      <div class="settings-group">
        <ul class="collapsible setting popout" ref="collaps1">
          <li>
            <div class="collapsible-header" tabindex="0" >
              <span>Румы</span>
              <i class="material-icons caret right">keyboard_arrow_right</i>
            </div>
            <div class="collapsible-body">

              <form action="#">
                <div class="row">
                  <div class="col l12">

                    <ul class="collection with-header">
                      <li class="collection-header flex"><span class="name">Рум</span>
                          <span>NickName</span>
                          <span class="metka">Метка</span>
                          <span class="toall">Виден всем</span></li>

                      <li class="collection-item flex" v-for="r of userrooms" :key="r.id">
                        <div class="input-field">
                          <input disabled :value="r.nickname" :id="r.id" type="text" class="validate">
                          <label :for="r.id">{{ r.nameroom }}</label>
                        </div>
                          <!-- <span class="name">{{ r.nameroom }}</span> -->
                          <!-- <span>{{r.nickname}}</span> -->
                          <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                          <label class="small-item">
                            <input type="checkbox"  disabled="disabled" :checked="r.viewforall">
                            <span></span>
                          </label>
                          <button class="waves-effect waves-light btn-small small-item"><i class="material-icons">delete</i></button>
                          <button class="waves-effect waves-light btn-small small-item"><i class="material-icons">edit</i></button>
                      </li>


                      <li class="collection-item flex">
                        <select ref="select" v-model="currentroom">
                           <option value="" disabled selected>Добавить рум</option>
                           <option v-for="r of rooms" :key="r.id" :value="r.id">{{r.name}}</option>
                        </select>
                        <input id="nickname" type="text" v-model="nickname"
                        class="{invalid: $v.nickname.$dirty && !$v.nickname.$requiref}">
                        <label class="small-item">
                            <input type="checkbox" class="filled-in" v-model="viewforall">
                            <span>Показывать</span>
                          </label>
                        <span
                        v-if="$v.nickname.$dirty && !$v.nickname.required"
                        class="helper-text invalid"
                        >Никнейм не заполнен</span>
                      </li>

                    </ul>
                    <button class="waves-effect waves-light btn-small"
                    @click.prevent="addUserRoom"><i class="material-icons left">add</i>Добавить рум</button>

                  </div>
<!--
                <div class="input-field s12" style="display: flex">
                  <div class="input-field inline">PokerStars:</div>
                  <div class="input-field inline">
                    <input placeholder="Placeholder" type="text" value="yet_warm">
                  </div>
                </div> -->

<!--
                <p>
                  <label>
                    <input class="with-gap" name="group1" type="radio">
                    <span>PartyPoker</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input class="with-gap" name="group1" type="radio">
                    <span>888</span>
                  </label>
                </p> -->
                </div>
              </form>
            </div>
          </li>
          <li>
            <div class="collapsible-header" tabindex="0"><i class="material-icons">whatshot</i>Third</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span>
              <div>
                  <p>Коды активации NOD32 Internet Security, Smart Security и NOD 32 Antivirus</p>

                <pre>

                DEAS-W33U-63NK-KHGT-JU24
                27.05.2020

                DEAS-W33U-6ADR-RV43-C7K5
                27.05.2020

                DEAS-W33U-6AHG-GHXU-TBFC
                02.06.2020

                AFAX-W333-WADE-E5CH-6R9E
                17.10.2022

              </pre>
                Компания Eset банит сайты где размещены ключи, поэтому мы добавили ссылку на скачивание.
              </div>
            </div>
          </li>
        </ul>
        <div class="setting">
          Agree to Terms &amp; Conditions?

          <label class="right">
            <input type="checkbox" class="filled-in" checked="checked">
            <span></span>
          </label>
        </div>
      </div>

    </div>
  </div>


      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    name: '',
    nickname: 'VV',
    forall: true,
    viewforall: true,
    collaps1: null,
    rooms: [],
    userrooms: [],
    select: null,
    currentroom: null
  }),
  validations: {
    name: { required },
    nickname: { required }
  },

  watch: {
    currentroom(value) {}
  },
  created() {
    // this.current = 'PokerKing'
  },
  async mounted() {
    this.rooms = await this.$store.dispatch('fetchRooms')
    this.userrooms = await this.$store.dispatch('fetchUserRooms')
    // this.rooms = [{id: 222, name: "O FIRST TTT"},{id: 453, name: "fjhsgjfh"}]
    this.name = this.info.name
    console.log("info: ", this.info)
    this.collaps1 = M.Collapsible.init(this.$refs.collaps1).open(0)

    console.log("current room:", this.currentroom)
    // console.log(this.rooms[3].index)
    // console.log("rooms", this.rooms)

    setTimeout(() => {
    this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    })
  },
  destroyed() {
    if (this.collaps1 && this.collaps1.destroy) {
      this.collaps1.destroy()
    }
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info'])

  },
  methods: {
    ...mapActions(['updateInfo']),
    async addUserRoom() {
      if (this.$v.$invalid) {
        $v.touch()
        return
      }
      try {
        // const room = await this.$store.dispatch('addUserRoom', {
        //   nickname: this.nickname,
        //   nameroom: this.currentroom,
        //   viewforall: this.viewforall,
        // })
        const id = this.rooms.length
        const nickname = this.nickname
        const  nameroom = this.currentroom
        const viewforall = this.viewforall
        this.userrooms.push({id, nickname, nameroom, viewforall})
        // rooms.commit(addUserRoom, {
        //   nickname: this.nickname,
        //   nameroom: this.currentroom,
        //   viewforall: this.viewforall,
        // })
        console.log(this.currentroom)
        console.log("this.select.el", this.select.el)
        this.select.el.options[0].selected = true
        console.log("this.select", this.select)
        this.nickname = ''
        this.currentroom = null
        this.viewforall = true
        if (this.select && this.select.destroy) {
          this.select.destroy()
        }
        setTimeout(() => {
          this.select = M.FormSelect.init(this.$refs.select)
          M.updateTextFields()
        })
        console.log("this.select.el.options[0].selected", this.select.el.options[0].selected)
        setTimeout(() => {M.updateTextFields()})
        this.$v.$reset()
        this.$message('Room_HasBeenCreated')

      } catch(e) {}
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scope lang="sass">
.collection
  overflow: visible
  .collection-item
    background-color: rgba(164, 164, 163, 0.15)
    margin-bottom: 8px
.flex
  display: flex
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  .name
    width: 40%
  .small-item
    width: 40px
    // text-align: center
    padding: 0
div.input-field input[type="text"]:disabled + label
  color: #ffa726
  font-size: 150%
  font-weight: 600
</style>