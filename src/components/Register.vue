<template>
  <div class="register-wrap" v-if="visible">
    <div class="cover"></div>
    <div class="main">
      <div class="title">
        Register
        <img
          src="../assets/svg/close.svg"
          alt=""
          @click="emits('update:visible', false)"
        />
      </div>
      <input type="text" placeholder="Enter username" v-model="username" />
      <div class="under-line"></div>
      <div class="btn" @click="confirm">confirm</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import { execute } from "../api/index";
import { storeToRefs } from "pinia";
import { useStatuStore } from "../stores/index";
import { message } from "ant-design-vue";

const store = useStatuStore();
const { address } = storeToRefs(store);
const { setUserName } = store;

const props = defineProps({
  visible: Boolean,
});
const emits = defineEmits(["update:visible"]);
const route = useRoute();
const router = useRouter();
const username = ref("");
onMounted(() => {});
const confirm = async () => {
  if (username.value === "") {
    message.error("Please enter username !");
  } else {
    const res = await execute(username.value, address.value);
    if (res) {
      setUserName(username.value);
      emits("update:visible", false);
    }
  }
};
</script>
<style scoped lang="less">
.register-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  left: 0;
  top: 0;
  .cover {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
  }
  .main {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    background-color: #fff;
    border-radius: 3px;
    padding: 50px;
    font-family: "SF Bold", "Segoe System UI Bold", "Segoe UI Bold", sans-serif;
    padding-top: 100px;
    input {
      background-color: transparent;
      font-weight: 400;
      font-size: 26px;
      border: 0;
      outline: none;
      color: #0f5bb2;
      width: 100%;
      padding: 10px;
    }
    .under-line {
      border-bottom: 2px solid #0f5bb2;
    }
    .btn {
      background: linear-gradient(135deg, rgb(9, 154, 222), rgb(16, 84, 173));
      color: #fff;
      display: inline-block;
      padding: 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 50px;
      margin-left: 390px;
      font-size: 16px;
      &:hover {
        background: #0f5bb2;
      }
    }
    .title {
      background-color: #0f5bb2;
      color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
      img {
        position: absolute;
        right: 15px;
        top: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
