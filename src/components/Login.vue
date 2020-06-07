<template>
  <b-card title="LOGIN" class="mt-5" style="width: 600px; margin: auto;">
    <b-form @submit="e => onSubmit(e)">
      <b-form-group label="Email" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="email"
          type="text"
          placeholder="Digite o seu endereço de email"
          required
        />
      </b-form-group>

      <b-form-group label="Senha" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="password"
          placeholder="Digite a sua senha"
          type="text"
          required
        />
      </b-form-group>
      <p v-if="hasError" class="text-danger">O seu email ou senha estão incorretos</p>
      <b-button class="float-right" type="submit" variant="primary">Entrar</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "Login",
  data() {
    return {
      hasError: false,
      email: "joao@email.com",
      password: "123456"
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$emit("login");
        })
        .catch(() => (this.hasError = true));
    }
  }
};
</script>

<style>
</style>