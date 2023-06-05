<template>
  <div class="container">
    <LeftArea />
    <div class="right-area">
      <RightChat />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LeftArea from "../components/LeftArea.vue";
import RightChat from "../components/RightChat.vue";
import { connect, execute } from "../api/index";
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  // const address = await connect();
  // execute(address);
});
</script>
<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
}
.right-area {
  flex: 1;
  height: 100vh;
  margin-left: 4px;
  display: flex;
  flex-direction: column;
}
</style>
