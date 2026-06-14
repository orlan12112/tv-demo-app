<template>
  <BContainer class="mt-4">
    <h2 class="mb-4">Регистрация</h2>

    <BForm @submit.prevent="handleSubmit">
      <BFormGroup label="Логин:" label-for="login">
        <BFormInput
          id="login"
          ref="loginInput"
          v-model="form.login"
          :state="validationState('login')"
          placeholder="Введите логин"
          @input="clearError('login')"
        />
        <BFormInvalidFeedback :state="validationState('login')">
          {{ errors.login }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label="Имя:" label-for="firstName">
        <BFormInput
          id="firstName"
          v-model="form.firstName"
          :state="validationState('firstName')"
          placeholder="Введите имя"
          @input="clearError('firstName')"
        />
        <BFormInvalidFeedback :state="validationState('firstName')">
          {{ errors.firstName }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label="Фамилия:" label-for="lastName">
        <BFormInput
          id="lastName"
          v-model="form.lastName"
          :state="validationState('lastName')"
          placeholder="Введите фамилию"
          @input="clearError('lastName')"
        />
        <BFormInvalidFeedback :state="validationState('lastName')">
          {{ errors.lastName }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label="Пароль:" label-for="password">
        <BFormInput
          id="password"
          v-model="form.password"
          type="password"
          :state="validationState('password')"
          placeholder="Минимум 5 символов"
          @input="clearError('password')"
        />
        <BFormInvalidFeedback :state="validationState('password')">
          {{ errors.password }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label="Подтверждение пароля:" label-for="confirmPassword">
        <BFormInput
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          :state="validationState('confirmPassword')"
          placeholder="Повторите пароль"
          @input="clearError('confirmPassword')"
        />
        <BFormInvalidFeedback :state="validationState('confirmPassword')">
          {{ errors.confirmPassword }}
        </BFormInvalidFeedback>
      </BFormGroup>

      <BButton class="btn_layout" type="submit" variant="primary" :disabled="!isFormValid">
        Зарегистрироваться
      </BButton>
    </BForm>
  </BContainer>
</template>

<script setup lang="ts">
  import { onMounted, nextTick } from 'vue';
  import {
    BContainer,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
  } from 'bootstrap-vue-next';
  import useRegistration from '../../shared/lib/useRegistration';

  const {
    loginInput,
    form,
    errors,
    isFormValid,
    validationState,
    clearError,
    handleSubmit,
  } = useRegistration();

  onMounted(() => {
    nextTick(() => {
      loginInput.value?.focus();
    });
  });
</script>

<style scoped lang="css">
  .btn_layout{
    margin-top: 20px;
  }
</style>