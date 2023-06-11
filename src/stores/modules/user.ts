import { defineStore } from "pinia";
import { UserState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

export const useUserStore = defineStore({
  id: "exam-user",
  state: (): UserState => ({
    token: "",
    userInfo: { name: "Captain" }
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("exam-user")
});
