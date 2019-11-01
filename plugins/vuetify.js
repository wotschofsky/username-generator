import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
   theme: {
      primary: colors.teal.base,
      secondary: colors.indigo.base,
      accent: colors.deepPurple.base,
      error: colors.red.base,
      warning: colors.orange.base,
      info: colors.cyan.base,
      success: colors.green.base
   },
   iconfont: 'mdi'
})
