<template>
<!-- socket.io 통신하기위한 nuxt vue 파일. socketServerVueBasic.js(서버) 파일과 통신함.
실행방법 npm run dev하면 됨. -->
  <div class="">
      <input type="text" name="" v-model="sendMessage">
      <button type="button" name="button" @click="msgSend">소켓 이벤트 발생</button>
      <h1>{{msg}}</h1>

<!-- store (VueX) 실습 -->
      <button @click="$store.commit('increment', 2)">{{ count }}</button>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            sendMessage: '',
            msg: ''
        }
    },
    methods: {
        msgSend () {
            socket.emit('everyBodySend', this.sendMessage)
        }
    },
    beforeMount () {
        socket.on('everyBodySend', (msg) => {
            console.log(msg)
            this.msg = msg
        })
    },
    computed: mapState([
        'count'
    ])
}
</script>
