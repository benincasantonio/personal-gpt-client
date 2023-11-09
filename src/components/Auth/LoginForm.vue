<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user-store';
import { useField } from 'vee-validate'
import * as yup from 'yup'

const { value: email, errorMessage: emailErrorMessage } = useField<string>(
  'email',
  yup
    .string()
    .trim()
    .required('Please enter your email.')
    .email('Please enter a valid email address.')
)

const { value: password, errorMessage: passwordErrorMessage } = useField<string>(
  'password',
  yup
    .string()
    .trim()
    .required('Please enter your password.')
    .min(8, 'Your password must be at least 8 characters long.')
)

const onSubmit = async (event: Event) => {
  event.preventDefault()
  const userStore = useUserStore()

  await userStore.login(email.value, password.value);

  router.push({name: 'chat'});
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="field">
      <label for="email" class="label">Email</label>
      <div class="control">
        <input
          type="email"
          name="email"
          v-model="email"
          class="input"
          placeholder="Email"
          :class="{ 'is-danger': !!emailErrorMessage }"
        />
      </div>
      <p class="help is-danger">{{ emailErrorMessage }}</p>
    </div>

    <div class="field">
      <label for="password" class="label">Password</label>
      <div class="control">
        <input
          type="password"
          name="password"
          v-model="password"
          class="input"
          placeholder="Password"
          :class="{ 'is-danger': !!passwordErrorMessage }"
        />
      </div>
      <p class="help is-danger">{{ passwordErrorMessage }}</p>
    </div>

    <div class="field">
      <div class="control">
        <button type="submit" class="button is-black">Login</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (width >= 768px) {
    max-width: 60%;
  }

  .field {
    width: 100%;
  }
}
</style>
