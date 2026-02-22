# Folder Structure

This document describes the folder structure of the Koperasi Frontend project.

## Overview

```
app/
├── assets/
│   ├── css/          # Global CSS / Tailwind entry
│   └── images/       # Static images
├── components/
│   ├── base/         # Generic reusable UI components (BaseButton, BaseCard, etc.)
│   ├── admin/        # Components specific to admin role
│   ├── superadmin/   # Components specific to superadmin role
│   ├── dashboard/    # Shared dashboard components
│   ├── landing/      # Public landing page components
│   ├── layout/       # App layout components (header, footer)
│   ├── tenant/       # Tenant-specific display components
│   └── ui/           # Low-level UI primitives
├── composables/
│   ├── core/         # Foundational composables (useApi, useAuth, useModal, useToast, etc.)
│   ├── shared/       # Cross-role composables (usePagination, useDataTable, useWilayah, etc.)
│   ├── public/       # Public / unauthenticated composables (useNavigation, registration flows)
│   ├── superadmin/   # Superadmin feature composables
│   ├── admin/        # Admin feature composables
│   └── anggota/      # Member (anggota) feature composables
├── middleware/       # Route middleware (auth, role guards)
├── pages/            # File-based routing
├── plugins/          # Nuxt plugins (api.ts for Axios, etc.)
├── stores/           # Pinia stores (auth.ts, tenant.ts, ui.ts)
└── utils/            # Pure utility functions
```

## Composables Convention

- All composables in subdirectories under `app/composables/` are **auto-imported** via the `imports.dirs` setting in `nuxt.config.ts`.
- Composables should be named with the `use` prefix, e.g. `useAuth`, `usePagination`.
- **core/** – low-level primitives shared by all roles.
- **shared/** – feature composables that multiple roles share (pagination, file upload, region data).
- **public/** – composables for unauthenticated pages.
- **superadmin/**, **admin/**, **anggota/** – role-scoped feature composables.

## Components Convention

- **base/** components are fully generic and have no business logic.
- Role-specific components live in their respective subdirectory and may import base components.
- Components are auto-imported by Nuxt from the `app/components/` tree.
