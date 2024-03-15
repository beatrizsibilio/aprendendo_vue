<template>
  <v-app class="cor-fundo">
    <v-main>
      <v-container fluid>
        <v-row justify="end">
          <v-col cols="2" md="1" offset="11">
            <v-btn variant="text" density="default" icon="" @click="logout">
              <v-icon :color="cor.icone" icon="mdi-logout"></v-icon>
              <v-tooltip activator="parent" location="start" text="sair"></v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="7" cols="12" class="mt-n8">
            <Tabela :desenhar-tabela="digitouTabela"/>
          </v-col>
          <v-col md="5" cols="12" class="mt-n4">
            <v-card min-height="600px" :color="cor.fundoInput">
              <v-card class="componente-barraRolagem" min-height="450" :color="cor.fundoChat">
                <div v-for="mensagem in mensagens">
                  <v-row :class="mensagem.posicao" v-model="mostrarChat">
                    <v-col md="7" cols="8">
                      <v-card class="formatacaoMsg" :color="mensagem.corfundoMsg">
                        <v-list :style="{ 'background-color': mensagem.corfundoMsg }">
                          <v-list-item>
                            {{ mensagem.textoMsg }}
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
              <v-form @submit.prevent="verificarTexto">
                <v-row class="ml-4">
                  <v-col md="10" cols="10" class="mt-9">
                    <v-textarea 
                      auto-grow 
                      v-model="novaMsg" 
                      @keydown.enter.prevent="enterClicado" 
                      :color="cor.textoImput"
                      label="Mensagem" 
                      rows="1" 
                      max-rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col md="2" cols="2" class="mt-10 ml-n2">
                    <v-btn variant="text" density="default" icon="" type="submit" :disabled="inativarBtn">
                      <v-icon :color="cor.icone" size="large" icon="mdi-send"></v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { ref } from 'vue';
import Tabela from './Tabela.vue'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import router from '@/router';

const novaMsg = ref("");
const digitouTabela = ref(false);

const cor = {
  fundoChat: '#E8F5E9',
  fundoInput: '#C8E6C9',
  textoImput: '#1B5E20',
  icone: '#1B5E20'
}

const mostrarChat = computed({
  get() {
    return mensagens.length == 0
  },

  set() {
    mostrarChat.value = true
  }
})

const inativarBtn = computed({
  get() {
    return novaMsg.value.length == 0
  },

  set() {
    inativarBtn.value = true
  }
})

var mensagens = reactive([] as any);

function logout(): void {
  signOut(auth).then(() => {
    router.push("/");
  });
}

function enterClicado(event: any): void {
  if (event.key === 'Enter' && !event.shiftKey) {
    verificarTexto();
  } else if (event.key === 'Enter' && event.shiftKey) {
    novaMsg.value += '\n';
  }
};

function verificarTexto(): void {
  if(novaMsg.value.toUpperCase() == "TABELA") {
    digitouTabela.value = true;
    novaMsg.value = "";
  } else {
    enviarMsg();
  }
}

function enviarMsg(): void {
  mensagens.push(
    {
      posicao: "d-flex justify-end",
      corfundoMsg: '#81C784',
      textoMsg: novaMsg.value
    }
  );
  buscarResposta(novaMsg.value);
  novaMsg.value = "";
};

function enviarResposta(resposta: string, mensagemRecebida: string): void {
  mensagens.push(
    {
      posicao: "d-flex justify-start",
      corfundoMsg: '#A5D6A7',
      textoMsg: resposta
    }
  );
  console.log(mensagemRecebida);
}

function buscarResposta(mensagemRecebida: string): void {
  var respostas = [
    "Boa tarde, estaremos felizes em te ajudar!",
    "Bom dia, no que posso ajudar?",
    "Estou à disposição para te ajudar!",
    "Obrigado pela preferência!",
    "Bom dia!",
    "Boa tarde!",
    "Boa noite!",
    "Diga, em que posso te ajudar?",
    "Olá, precisa de ajuda?",
    "Bom dia, em que posso ser útil?"
  ];

  const indiceAleatorio = Math.floor(Math.random() * respostas.length);
  enviarResposta(respostas[indiceAleatorio], mensagemRecebida);
}
</script>

<style scoped>
.formatacaoMsg {
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
  font-size: 15px;
}

.componente-barraRolagem {
  max-height: 200px;
  overflow-y: auto;
}

.cor-fundo {
  background-color: #F5F5F5;
}
</style>