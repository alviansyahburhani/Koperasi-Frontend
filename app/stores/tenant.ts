import { defineStore } from 'pinia'

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenantId: null as string | null,
    tenantName: null as string | null,
    subdomain: null as string | null,
    isLoaded: false,
  }),

  getters: {
    isTenant: (state) => !!state.subdomain,
  },

  actions: {
    setTenant(data: { tenantId: string; tenantName: string; subdomain: string }) {
      this.tenantId = data.tenantId
      this.tenantName = data.tenantName
      this.subdomain = data.subdomain
      this.isLoaded = true
    },

    clear() {
      this.tenantId = null
      this.tenantName = null
      this.subdomain = null
      this.isLoaded = false
    },
  },
})
