<template lang="html">
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
