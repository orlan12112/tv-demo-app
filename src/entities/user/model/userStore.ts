import { defineStore } from 'pinia';
import type { User } from './types';

const STORAGE_KEY = 'tv_app_users';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),

  getters: {
    currentUser: (state) => state.users.find(u => u.isLoggedIn) || null,
    isAuthenticated: (state) => state.users.some(u => u.isLoggedIn),
  },

  actions: {
    initFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          this.users = JSON.parse(saved)
        } catch (e) {
          console.warn('Failed to parse users from localStorage')
          this.users = []
        }
      }
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },

    isLoginAvailable(login: string): boolean {
      return !this.users.some(user => user.login === login)
    },

    register(userData: Omit<User, 'id' | 'isLoggedIn'>) {
      if (!this.isLoginAvailable(userData.login)) {
        throw new Error('Пользователь с таким логином уже существует')
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        ...userData,
        isLoggedIn: false,
      }

      this.users.push(newUser)
      this.saveToStorage()
    },

    login(login: string, password: string): boolean {
      const user = this.users.find(u => u.login === login && u.password === password)
      if (!user) return false

      this.users.forEach(u => (u.isLoggedIn = false))
      user.isLoggedIn = true
      this.saveToStorage()
      return true
    },

    logout() {
      const currentUser = this.currentUser
      if (currentUser) {
        currentUser.isLoggedIn = false
        this.saveToStorage()
      }
    },
  },
})