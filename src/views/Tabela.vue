<template>
  <v-container fluid>
    <v-row v-show="props.desenharTabela" class="mb-5">
      <v-col md="12" cols="12">
        <v-table fixed-header density="compact">
          <thead>
            <tr>
              <th class="text-left" v-for="coluna in colunas">
                {{ coluna }}
              </th>
            </tr>
          </thead>
          <tbody class="fonte-tabela">
            <tr v-for="linha in dadosTabela()">
              <td v-for="elemento in linha">{{ elemento }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { tab1, tab2, tab3 } from '../configTabelas';
const props = defineProps({
  desenharTabela: {
    type: Boolean,
  },
});

var colunas: any = [];
var tab = tab3;

Object.keys(tab[0]).forEach(key => {
  colunas.push(key);
});

function dadosTabela(): Array<Object>
{
  return tab
}


</script>