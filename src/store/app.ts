// Utilities
import { defineStore } from 'pinia';
import { User } from "firebase/auth";
import { Ref, ComputedRef, reactive, computed } from 'vue';
import {db} from '../firebase'

export interface AppStore {
  user: Ref<User> | Ref<null>;
  usuarioLogado: ComputedRef<boolean>;
}

export const useAppStore = defineStore('app', (): AppStore => {
  var user: any = reactive({});
  
  const usuarioLogado = computed((): boolean => {
    return !! user.value;
  });
  
  return {
    user,
    usuarioLogado,
  };
});
