import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getNowFormatDate } from "../utils/index";

export const useStatuStore = defineStore("statu", () => {
  const userName = ref("####");
  const address = ref("***********");
  const connected = ref(false);
  const coin = ref("0.00 BNB");
  const setUserName = (val) => {
    userName.value = val;
  };
  const setCoin = (val) => {
    coin.value = val;
  };
  const setAddress = (val) => {
    address.value = val;
  };
  const setConnected = (val) => {
    connected.value = val;
  };
  return {
    userName,
    address,
    coin,
    setCoin,
    setUserName,
    setAddress,
    connected,
    setConnected,
  };
});
export const useChatStore = defineStore("chat", () => {
  const chatList = ref([
    {
      username: "Robot No. 1",
      lastMsg: "Start chatting with me",
      lastTime: getNowFormatDate(),
      address: "1111",
    },
  ]);
  const currentChat = ref({
    username: "",
    address: "",
  });
  const setCurrentChat = (val) => {
    currentChat.value.username = val.username;
    currentChat.value.address = val.address;
  };
  const addChat = (username) => {
    chatList.value.push({
      username,
      lastMsg: "",
      lastTime: getNowFormatDate(),
    });
  };
  return { chatList, addChat, currentChat, setCurrentChat };
});

export const useContactStore = defineStore("contact", () => {
  const contactList = ref([
    {
      username: "Robot No.1",
      address: "1111",
    },
    {
      username: "Robot No.2",
      address: "2222",
    },
  ]);
  return {
    contactList,
  };
});
