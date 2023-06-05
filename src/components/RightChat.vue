<template>
  <!-- top -->
  <div class="top-container">
    <div class="user-name flex-middle">
      <img src="../assets/svg/robot.svg" alt="" width="40" height="40" />
      <span>{{ currentChat.username }}</span>
    </div>
    <div class="right-btns">
      <img src="../assets/svg/tab-2.svg" alt="" />
    </div>
  </div>
  <!-- Midddle -->
  <div class="middle-container" id="middle">
    <template v-for="item of chatList">
      <div class="msg-type-a" v-if="item.type === 'A'">
        <img src="../assets/svg/robot.svg" alt="" />
        <div>
          <div class="info">{{ currentChat.username }} {{ item.time }}</div>
          <div class="msg">{{ item.msg }}</div>
        </div>
      </div>
      <div v-else class="msg-type-b">
        <div class="info">{{ item.time }}</div>
        <div class="msg">{{ item.msg }}</div>
      </div>
    </template>
  </div>
  <!-- bottom -->
  <div class="bottom-container">
    <div class="blank"></div>
    <div class="main">
      <div class="input-area flex-middle">
        <div class="emoji-area" @click.stop="">
          <EmojiPicker
            :native="true"
            @update:text="onSelectEmoji"
            pickerType="input"
            :hide-search="true"
            :disable-skin-tones="true"
            mode="prepend"
          />
        </div>
        <input
          type="textarea"
          v-model="inputVal"
          placeholder="Type a message"
          @keyup.enter.native="sendMsg"
        />
        <img src="../assets/svg/font.svg" alt="" />
      </div>
      <div class="send-btn flex-middle flex-center" @click="sendMsg">
        <img src="../assets/svg/send.svg" alt="" />
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChatStore } from "../stores/index";
import { getNowFormatDate } from "../utils/index";
import EmojiPicker from "vue3-emoji-picker";
// import css
import "vue3-emoji-picker/css";
import { storeToRefs } from "pinia";
const store = useChatStore();
const { currentChat } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
const chatList = ref([]);
const sendMsg = () => {
  const msg = inputVal.value;
  addChatList(msg, "B");
  setTimeout(() => {
    addChatList("I will repeat your words:" + msg);
  }, 200);
  inputVal.value = "";
};
const addChatList = (msg, type = "A") => {
  chatList.value.push({
    msg,
    time: getNowFormatDate(),
    type,
  });
  nextTick(scrollToBottom);
};
const scrollToBottom = () => {
  const ele = document.querySelector("#middle");
  console.log(ele.scrollHeight, ele.scrollTop);
  ele.scrollTop = ele.scrollHeight;
};
const inputVal = ref("");
const onSelectEmoji = (text) => {
  inputVal.value += text.slice(0, 2);
};
onMounted(() => {
  setTimeout(() => {
    addChatList("Hi, let's talk about something");
  }, 1000);
});
</script>
<style scoped lang="less">
.top-container {
  display: flex;
  height: 56px;
  border-bottom: 1px solid rgb(225, 225, 225);
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .user-name {
    color: rgb(33, 33, 33);
    font-size: 17px;
    span {
      margin-left: 10px;
    }
  }
  .right-btns {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(241, 241, 244);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(231, 231, 234);
    }
  }
}

.bottom-container {
  background-color: #fff;
  display: flex;
  padding-top: 10px;
  padding-bottom: 20px;
  width: calc(100vw - 325px);
  .blank {
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 80px;
  }
  .main {
    width: 960px;
    flex-grow: 0;
    flex-shrink: 1;
    display: flex;
    align-items: center;
  }
  .input-area {
    flex: 1;
    background-color: rgb(241, 241, 241);
    border-radius: 24px;
    height: 50px;
    padding: 0 10px;

    .emoji-area {
      position: relative;
      width: 20px;
      height: 20px;
      cursor: pointer;
      :deep(.v3-input-picker-icon) {
        transform: translate(12px, -21px);
      }
      :deep(.v3-emoji-picker-input) {
        visibility: hidden;
      }
      .emoji-picker {
        position: absolute;
        bottom: 40px;
        left: 0;
      }
    }
    input {
      background-color: transparent;
      font-size: 14px;
      color: rgb(37, 36, 35);
      border: 0;
      outline: none;
      flex: 1;
      margin: 0 10px;
    }
  }
  .send-btn {
    background: linear-gradient(135deg, rgb(16, 84, 173), rgb(9, 154, 222));
    height: 40px;
    width: 40px;
    border-radius: 20px;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(9, 154, 222);
    }
  }
}

.middle-container {
  flex: 1;
  padding: 30px;
  overflow: auto;

  .msg-type-a {
    display: flex;
    align-items: flex-start;
    margin-top: 10px;
    padding-right: 40%;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .info {
      font-size: 12px;
      color: rgb(138, 141, 145);
    }
    .msg {
      margin-top: 5px;
      padding: 9px 12px;
      border-radius: 0px 10px 10px;
      background-color: rgb(241, 241, 241);
      font-size: 14px;
      line-height: 22px;
      color: rgb(33, 33, 33);
      word-break: break-all;
    }
  }
  .msg-type-b {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
    padding-left: 40%;
    .info {
      font-size: 12px;
      color: rgb(138, 141, 145);
    }
    .msg {
      margin-top: 5px;
      padding: 9px 12px;
      border-radius: 10px 10px 0px;
      background-color: rgb(204, 247, 255);
      font-size: 14px;
      line-height: 22px;
      color: rgb(33, 33, 33);
      word-break: break-all;
    }
  }
}
</style>
