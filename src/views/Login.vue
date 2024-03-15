<template>
  <v-app>
    <v-main>
      <v-container class="w-100 h-75">
        <v-row class="h-100 align-center justify-center " no-gutters>
          <v-col class="v-col-md-4">
            <v-form ref="formRef">
              <v-card>
                <v-card-title class="bg-primary">Login</v-card-title>
                <v-card-text>
                  <v-row align="center" justify="start">
                    <v-col md="11" cols="11">
                      <v-text-field 
                        class="mt-6" 
                        color="primary" 
                        label="email" 
                        variant="underlined" 
                        type="email"
                        v-model="email"
                      ></v-text-field>
                    </v-col>
                  <v-icon md="1" cols="1" size="large" icon="person" color="grey-darken-1" class="pr-2 pt-2"></v-icon>
                  </v-row>
                  <v-text-field 
                    label="senha" 
                    color="primary" 
                    variant="underlined" 
                    type="password"
                    placeholder="Digite sua senha (mínimo 6 dígitos)" 
                    class="mt-6"
                    v-model="senha"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-row  justify="end">
                    <v-col cols="12" md="5">
                      <v-btn block class="bg-primary" @click="executarLogin">entrar</v-btn>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-btn block variant="outlined" color="primary" @click="">Registrar</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
                <v-card-actions>
                  <v-row justify="end">
                    <v-col cols="12" md="5">
                      <v-btn size="x-small" block variant="text" color="primary" @click="">Esqueceu sua senha?</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';

const router = useRouter();
const email = ref("");
const senha = ref("");

function executarLogin(): void {
  signInWithEmailAndPassword(auth, email.value, senha.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      router.replace('chat');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
</script>
