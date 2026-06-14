import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/model/userStore'
import { 
	validateLogin,
	validatePassword,
	getValidationState
} from '@/shared/lib/validators';

const useAuth = () => {
	const router = useRouter();
	const userStore = useUserStore();

  const loginInput = ref<HTMLInputElement | null>(null);

	const form = ref({
		login: '',
		password: '',
	});

	const errors = ref({
		login: '',
		password: '',
		general: '', 
	});

	const validateAll = () => {
		errors.value.login = validateLogin(form.value.login) ? '' : 'Логин не может быть пустым';
		errors.value.password = validatePassword(form.value.password)
			? '' : 'Пароль должен быть не менее 5 символов и содержать только латинские буквы, цифры и спецсимволы';
	};

	const isFormValid = computed(() => {
		validateAll();
		return errors.value.login === '' && errors.value.password === '';
	});

	const getValidationStateForField = (field: keyof typeof form.value) => {
		return getValidationState(field, errors.value, form.value);
	};

	const clearError = (field: keyof typeof errors.value) => {
		errors.value[field] = '';
	};

	const handleSubmit = () => {
		validateAll();
		if (!isFormValid.value) return;

		const success = userStore.login(form.value.login, form.value.password);
		if (success) {
			router.push('/profile');
		} else {
			errors.value.general = 'Неверный логин или пароль';
		}
	};

	return {
		loginInput,
		form,
		errors,
		isFormValid,
		getValidationStateForField,
		clearError,
		handleSubmit,
	};
};

export default useAuth;