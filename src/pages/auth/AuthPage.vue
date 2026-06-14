<template>
  <BContainer class = "mt-4">
    <h2 class="mb-4">Вход в аккаунт</h2>

    <BForm @submit.prevent="handleSubmit">
      <BFormGroup label="Логин:" label-for="login">
        <BFormInput
          id="login"
          ref="loginInput"
          v-model="form.login"
          :state="getValidationStateForField('login')"
          placeholder="Введите логин"
          @input="clearError('login')"
        />
        <BFormInvalidFeedback :state="getValidationStateForField('login')">
          {{ errors.login }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label="Пароль:" label-for="password">
        <BFormInput
            id="password"
            type="password"
            v-model="form.password"
            :state="getValidationStateForField('password')"
            placeholder="Введите пароль"
            @input="clearError('password')"
        />
        <BFormInvalidFeedback :state="getValidationStateForField('password')">
          {{ errors.password }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BButton class="btn_layout" type="submit" variant="primary" :disabled="!isFormValid">
        Войти
      </BButton>

      <div v-if="errors.general" variant="danger" class="mt-3 text-danger">
        {{ errors.general }}
      </div>

      <div class="mt-3">
        <p>Нет аккаунта? <BLink to="/register">Зарегистрироваться</BLink></p>
      </div>
    </BForm>
  </BContainer>
</template>

<script setup lang="ts">
  import { watch, onMounted, nextTick } from 'vue';
  import {
    BContainer,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BLink,
  } from 'bootstrap-vue-next';
  import useAuth from '../../shared/lib/useAuth';

  const {
    loginInput,
    form,
    errors,
    isFormValid,
    getValidationStateForField,
    clearError,
    handleSubmit,
  } = useAuth();

  onMounted(() => {
    nextTick(() => {
      loginInput.value?.focus();
    });
  });

  watch(
    () => ({ ...form.value }),
    () => {
      if (errors.value.general) {
        errors.value.general = ''
      }
    },
    { deep: true }
  );
</script>

<style scoped lang="css">
  .btn_layout{
    margin-top: 20px;
  }
  .form-text.text-danger {
    color: #dc3545 !important;
  }
</style>