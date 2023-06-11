import { defineStore } from "pinia";
import { KeepAliveState } from "@/stores/interface";

export const useKeepAliveStore = defineStore({
  id: "exam-keepAlive",
  state: (): KeepAliveState => ({
    keppAliveName: []
  }),
  actions: {
    // 添加
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    // 移除
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter((item) => item !== name);
    },
    // 设置
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
    }
  }
});
