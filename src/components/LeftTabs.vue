<template>
  <div class="tabs-container relative">
    <template v-if="index === 0">
      <div class="new-chat">
        <img src="../assets/svg/edit.svg" alt="" />
        <span>New Chat</span>
      </div>
      <div class="chat-list">
        <ul>
          <li
            v-for="item of chatList"
            :class="{ active: item.address === currentChat.address }"
            @click="setCurrentChat(item)"
          >
            <img src="../assets/svg/robot.svg" alt="" />
            <div class="usernmae">{{ item.username }}</div>
            <div class="msg">{{ item.lastMsg }}</div>
            <div class="time">{{ item.lastTime }}</div>
          </li>
        </ul>
      </div>
    </template>
    <div v-if="index === 2" class="contact-list">
      <div class="letter">R</div>
      <ul>
        <li v-for="item of contactList">
          <div class="icon">
            <img src="../assets/svg/robot.svg" alt="" width="40" height="40" />
            <span></span>
          </div>
          <div class="name">{{ item.username }}</div>
        </li>
      </ul>
    </div>
    <div v-if="index === 3" class="notification">
      Push Notifications are turned off
    </div>
    <div class="blue-text" v-if="index === 0">
      Start chatting on Skype
      <div class="gray-text">use Search to find anyone on Skype</div>
    </div>
    <div class="blue-text" v-if="index === 1">
      Call anyone on Skype
      <div class="gray-text">Start making calls on Skype for free .</div>
    </div>
    <div class="blue-text" v-if="index === 2">
      Find your contacts
      <div class="gray-text">use Search to find anyone on Skype</div>
    </div>
    <div class="gradient"></div>
    <div class="white"></div>
    <div class="emoji">
      <span v-if="index === 0"></span>
      <span v-if="index === 1" class="index1"></span>
      <span v-if="index === 2" class="index2"></span>
    </div>
    <div class="cloud">
      <img src="../assets/svg/cloud.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChatStore, useContactStore } from "../stores/index";
const route = useRoute();
const router = useRouter();
const { chatList, currentChat, setCurrentChat } = useChatStore();
const { contactList } = useContactStore();
const props = defineProps({
  index: Number,
});
onMounted(() => {
  if (currentChat.address === "" && chatList.length > 0) {
    setCurrentChat(chatList[0]);
  }
});
</script>
