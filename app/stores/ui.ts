import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,
    loading: false,
    pageTitle: '',
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setPageTitle(title: string) {
      this.pageTitle = title
    },
  },
})
