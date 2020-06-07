<template>
  <b-card>
    <b-row class="mb-2">
      <b-col>
        <div class="float-right">
          <b-button class="mr-2" variant="primary" @click="onClickAddUser">Adicionar pessoa</b-button>
          <b-button variant="danger" @click="$emit('loggout')">Sair</b-button>
        </div>
      </b-col>
    </b-row>
    <b-list-group class="text-center">
      <b-list-group-item>
        <b-row>
          <b-col>
            <h6>Nome</h6>
          </b-col>
          <b-col>
            <h6>Idade</h6>
          </b-col>
          <b-col>
            <h6>Ações</h6>
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item :key="index" v-for="(user, index) in users">
        <b-row>
          <b-col>{{ user.name }}</b-col>
          <b-col>{{ user.age }}</b-col>
          <b-col>
            <b-button class="mr-2" @click="onClickUpdateUser(user)">Atualizar</b-button>
            <b-button variant="danger" @click="deleteUser(user)">Deletar</b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      id="modal"
      :title="isCreating ? 'Adicionando usuário' : `Atualizando dados de ${data.name}`"
      hide-footer
    >
      <b-form @submit="onSubmit">
        <b-form-group label="Nome" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="data.name"
            type="text"
            placeholder="Digite o nome do usuário"
            required
          />
        </b-form-group>

        <b-form-group label="Idade" label-for="input-age">
          <b-form-input
            id="input-age"
            v-model="data.age"
            placeholder="Digite a idade da pessoa"
            type="number"
            required
          />
        </b-form-group>
        <b-button class="float-right" type="submit" variant="primary">
          <b-spinner v-if="isSubmitting" small type="grow" label="Spinning" />
          <span v-else>{{ isCreating ? 'Salvar' : 'Atualizar' }}</span>
        </b-button>
      </b-form>
    </b-modal>
  </b-card>
</template>

<script>
import { firestore } from "../firebase";

export default {
  data() {
    return {
      collection: firestore.collection("users"),
      data: {
        id: null,
        name: null,
        age: null
      },
      users: [],
      isCreating: false,
      isSubmitting: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isCreating ? this.addUser() : this.updateUser();
    },
    onClickAddUser() {
      this.isCreating = true;
      this.$bvModal.show("modal");
    },
    onClickUpdateUser(user) {
      this.isCreating = false;
      this.data = {
        ...user
      };
      this.$bvModal.show("modal");
    },
    addUser() {
      this.isSubmitting = true;

      const { name, age } = this.data;

      this.collection
        .add({
          name,
          age
        })
        .then(() => {
          this.$bvModal.hide("modal");
          this.getData();
        })
        .finally(() => {
          this.data.name = null;
          this.data.age = null;
          this.isSubmitting = false;
        });
    },
    updateUser() {
      this.isSubmitting = true;

      const { name, age } = this.data;

      this.collection
        .doc(this.data.id)
        .update({
          name,
          age
        })
        .then(() => {
          this.$bvModal.hide("modal");
          this.getData();
        })
        .finally(() => {
          this.data.id = null;
          this.data.name = null;
          this.data.age = null;
          this.isSubmitting = false;
        });
    },
    deleteUser(user) {
      this.collection
        .doc(user.id)
        .delete()
        .finally(() => {
          this.getData();
        });
    },
    getData() {
      this.collection
        .get()
        .then(snap => {
          this.users = snap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
        })
        .catch(() => this.getData());
    }
  }
};
</script>

<style>
</style>