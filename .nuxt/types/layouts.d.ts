import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    admin: ComponentProps<typeof import("D:/SEMESTER 6/Koperasi-Frontend/app/layouts/admin.vue").default>,
    auth: ComponentProps<typeof import("D:/SEMESTER 6/Koperasi-Frontend/app/layouts/auth.vue").default>,
    dashboard: ComponentProps<typeof import("D:/SEMESTER 6/Koperasi-Frontend/app/layouts/dashboard.vue").default>,
    default: ComponentProps<typeof import("D:/SEMESTER 6/Koperasi-Frontend/app/layouts/default.vue").default>,
    superadmin: ComponentProps<typeof import("D:/SEMESTER 6/Koperasi-Frontend/app/layouts/superadmin.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}