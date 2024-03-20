import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore("member", () => {
  const aaa = "";

  // // 会员信息
  // const profile = ref<LoginResult>()

  // // 保存会员信息，登录时使用
  // const setProfile = (val: LoginResult) => {
  //   profile.value = val
  // }

  // // 清理会员信息，退出时使用
  // const clearProfile = () => {
  //   profile.value = undefined
  // }


  
  // 记得 return
  return { aaa };
});
