# API Integration

This document explains how the frontend communicates with the backend API.

## Axios Plugin (`app/plugins/api.ts`)

An Axios instance is registered as a Nuxt plugin and provided as `$api` via `useNuxtApp()`.

```ts
const { $api } = useNuxtApp()
const response = await $api.get('/endpoint')
```

### Configuration

| Variable | Default | Description |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:3002` | Base URL for all API requests |
| `NUXT_PUBLIC_API_TIMEOUT` | `30000` | Request timeout in milliseconds |

### Request Interceptor

On every request the interceptor reads `access_token` from `localStorage` and attaches it as a `Bearer` token in the `Authorization` header.

### Response Interceptor

On a `401 Unauthorized` response:
1. `access_token`, `refresh_token`, and `user` are removed from `localStorage`.
2. The user is redirected to `/auth/login` via `navigateTo`.

## `useApi` Composable (`app/composables/core/useApi.ts`)

A thin wrapper over `$api` that provides a consistent interface for data-fetching with loading/error state:

```ts
const { data, loading, error, get, post, put, del } = useApi()
await get('/some/resource')
```

## Adding a New API Call

1. Create or update a role-scoped composable in the appropriate subdirectory (e.g. `app/composables/admin/useSimpanan.ts`).
2. Inject `$api` via `useNuxtApp()` or call `useApi()`.
3. Wrap the call in `try/finally` to manage `loading` state.

## Environment Variables

Copy `.env.example` to `.env.development` and set:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3002
NUXT_PUBLIC_API_TIMEOUT=30000
```
