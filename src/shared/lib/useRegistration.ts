import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/model/userStore';
import { 
	validateLogin,
	validateName,
	validatePassword,
	getValidationState
} from '@/shared/lib/validators';

const useRegistration = () => {
	const router = useRouter()
	const userStore = useUserStore()
	const loginInput = ref<HTMLInputElement | null>(null);

	const form = ref({
		login: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});

	const errors = ref({
		login: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});

	const validateAll = () => {
		if (!validateLogin(form.value.login)) {
			errors.value.login = 'Логин не может быть пустым';
		} else if (!userStore.isLoginAvailable(form.value.login)) {
			errors.value.login = 'Этот логин уже занят';
		} else {
			errors.value.login = '';
		}

		errors.value.firstName = validateName(form.value.firstName)
			? '' : 'Имя должно содержать только буквы и не быть пустым';

		errors.value.lastName = validateName(form.value.lastName)
			? '' : 'Фамилия должна содержать только буквы и не быть пустой';

		errors.value.password = validatePassword(form.value.password)
			? '' : 'Пароль должен быть не менее 5 символов и содержать только латинские буквы, цифры и спецсимволы';

		errors.value.confirmPassword = form.value.password === form.value.confirmPassword
			? '' : 'Пароли не совпадают';
	}

	const isFormValid = computed(() => {
 	 	validateAll();
  	return Object.values(errors.value).every(err => err === '');
	});

	const clearError = (field: keyof typeof errors.value) => {
		errors.value[field] = '';
	};

	const validationState = computed(() => (field: keyof typeof errors.value) => {
		return getValidationState(field, errors.value, form.value)
	})

	const handleSubmit = () => {
		validateAll()
		try {
			userStore.register({
				login: form.value.login,
				password: form.value.password,
				firstName: form.value.firstName,
				lastName: form.value.lastName,
			})
			router.push('/auth');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		};
	}

	return {
		loginInput,
		form,
		errors,
		isFormValid,
		validationState,
		clearError,
		handleSubmit,
	}
};

export default useRegistration;