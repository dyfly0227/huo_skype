<template>
  <Register v-model:visible="visible" />
  <div class="left-container">
    <div class="back-blue">
      <div class="flex-middle">
        <div class="user-icons"></div>
        <div class="flex-1">
          <div class="user-name">
            {{ userName }}
            <!-- <span>{{ coin }}</span> -->
          </div>
          <div class="address-coin">
            {{
              address.length > 20
                ? address.slice(0, 8) +
                  "..." +
                  address.slice(address.length - 8)
                : address
            }}
          </div>
        </div>
        <div class="more" @click.stop="showDrop = true">
          <img src="../assets/svg/more.svg" alt="" />
          <div
            class="drop-list"
            v-show="showDrop"
            @click.stop="showDrop = false"
          >
            <div class="item" v-if="!connected" @click="connectWallet">
              Connect Wallet
            </div>
            <template v-else>
              <div class="item" @click="toRegister">Register</div>
              <div class="item" @click="copyAddress">Copy Address</div>
              <div class="divide"></div>
              <div class="item red" @click="disconnect">Disconnects</div>
            </template>
          </div>
        </div>
      </div>

      <div class="search-area flex-middle" @click="showSearch = true">
        <img src="../assets/svg/search.svg" alt="" />
        <div>Search</div>
      </div>
    </div>
    <div class="serach-block" v-if="showSearch">
      <div class="input-area">
        <input type="text" placeholder="Search" v-model="searchVal" />
        <img src="../assets/svg/close.svg" alt="" @click="showSearch = false" />
      </div>
      <div class="serach-content">
        <div
          v-if="
            chatList.filter((item) => item.username.includes(searchVal))
              .length > 0
          "
          class="chat-list"
        >
          <div class="thead">chats</div>
          <ul>
            <li
              v-for="item of chatList.filter((item) =>
                item.username.includes(searchVal)
              )"
            >
              <img src="../assets/svg/robot.svg" alt="" />
              <div class="usernmae">{{ item.username }}</div>
              <div class="msg">{{ item.lastMsg }}</div>
              <div class="time">{{ item.lastTime }}</div>
            </li>
          </ul>
        </div>
        <div
          v-if="
            contactList.filter((item) => item.username.includes(searchVal))
              .length > 0
          "
          class="contact-list"
        >
          <div class="thead">contacts</div>
          <ul>
            <li
              v-for="item of contactList.filter((item) =>
                item.username.includes(searchVal)
              )"
            >
              <div class="icon">
                <img
                  src="../assets/svg/robot.svg"
                  alt=""
                  width="40"
                  height="40"
                />
                <span></span>
              </div>
              <div class="name">{{ item.username }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tabs flex-space">
      <div
        class="item"
        :class="{ active: tabIndex === 0 }"
        @click="tabIndex = 0"
      >
        <img src="../assets/svg/tab-1-active.svg" v-if="tabIndex === 0" />
        <img src="../assets/svg/tab-1.svg" v-else />
        <div>Chats</div>
      </div>
      <div
        class="item"
        :class="{ active: tabIndex === 1 }"
        @click="tabIndex = 1"
      >
        <img src="../assets/svg/tab-2-active.svg" v-if="tabIndex === 1" />
        <img src="../assets/svg/tab-2.svg" v-else />
        <div>Calls</div>
      </div>
      <div
        class="item"
        :class="{ active: tabIndex === 2 }"
        @click="tabIndex = 2"
      >
        <img src="../assets/svg/tab-3-active.svg" v-if="tabIndex === 2" />
        <img src="../assets/svg/tab-3.svg" v-else />
        <div>Contacts</div>
      </div>
      <div
        class="item"
        :class="{ active: tabIndex === 3 }"
        @click="tabIndex = 3"
      >
        <img src="../assets/svg/tab-4-active.svg" v-if="tabIndex === 3" />
        <img src="../assets/svg/tab-4.svg" v-else />
        <div>Notifications</div>
      </div>
    </div>
    <LeftTabs :index="tabIndex" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStatuStore } from "../stores/index";
import { storeToRefs } from "pinia";
import LeftTabs from "./LeftTabs.vue";
import "../assets/less/leftArea.less";
import Register from "./Register.vue";
import { connect } from "../api/index";
import { message } from "ant-design-vue";
import { useChatStore, useContactStore } from "../stores/index";
const { chatList } = useChatStore();
const { contactList } = useContactStore();
const visible = ref(false);
const tabIndex = ref(0);
const route = useRoute();
const router = useRouter();
const store = useStatuStore();
const { userName, address, coin, connected } = storeToRefs(store);
const { setCoin, setAddress, setUserName, setConnected } = store;

const searchVal = ref("");
const showSearch = ref(false);

const showDrop = ref(false);
const toRegister = () => {
  visible.value = true;
};
const connectWallet = async () => {
  const address = await connect();
  if (address) {
    setAddress(address);
    setConnected(true);
    message.success("The connection was successful");
  }
};
const disconnect = () => {
  setAddress("***********");
  setUserName("####");
  setConnected(false);
};
const copyAddress = async () => {
  await navigator.clipboard.writeText(address.value);
  message.success("The copy succeeded");
};
onMounted(() => {
  document.addEventListener("click", () => {
    showDrop.value = false;
  });
});
</script>
<style scoped lang="less"></style>
