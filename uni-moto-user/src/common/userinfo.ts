import { defineStore } from "pinia";
import { ref } from "vue";

export type Userinfo = {
    phone: string
}

export const useUserinfoStore = defineStore("userinfo", () => {
  const profile = ref<Userinfo>();

  const setProfile = (val: Userinfo) => {
    profile.value = val;
  };

  const clearProfile = () => {
    profile.value = undefined
  }

  return { profile, setProfile, clearProfile };
});
