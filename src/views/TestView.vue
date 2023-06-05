<template>
  <EmojiPicker
    :native="true"
    :hide-search="true"
    :disable-skin-tones="true"
    @update:text="onSelectEmoji"
    pickerType="input"
  />
  <div id="input"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import EmojiPicker from "vue3-emoji-picker";
// import css
import "vue3-emoji-picker/css";
const route = useRoute();
const router = useRouter();
const input = ref("");
const onSelectEmoji = (emoji) => {
  const str = utf16toEntities(emoji);
  console.log(str);
  input.value += str;
};
onMounted(() => {});

function entitiestoUtf16(strObj) {
  const patt = /&#\d+;/g;
  const arr = strObj.match(patt) || [];

  let H;
  let L;
  let code;

  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i];
    code = code.replace("&#", "").replace(";", "");
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xdc00;
    code = `&#${code};`;
    const s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
}
function utf16toEntities(str) {
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, (char) => {
    let H;
    let L;
    let code;
    let s;

    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      s = `&#${code};`;
    } else {
      s = char;
    }

    return s;
  });

  return str;
}
</script>
<style scoped></style>
