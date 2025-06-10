# BlobNest Frontend

BlobNest is a modern, professional web dashboard for managing and monitoring your Azure Blob Storage account. It provides a user-friendly interface for administrators and users to view, organize, and control containers, files, and storage activity in real time.

[Backend Repository](https://github.com/elkhayate/blobnest-backend)

## Features

- **Dashboard Overview**: Visualize total containers, files, storage size, and recent activity with beautiful charts and metrics.
- **Container Management**: List, search, create, edit, and delete containers. View metadata, access levels, and file counts.
- **File Pages & Previews**: Browse files within containers, preview files directly in cards, and manage file actions.
- **User Management**: Role-based access control for admins, uploaders, and viewers. Manage users and permissions.
- **Activity & Storage Metrics**: Track uploads, downloads, deletions, and storage usage over time with interactive charts.
- **Audit Logs**: Review system and user actions for compliance and troubleshooting.
- **Responsive UI**: Works seamlessly on desktop and mobile devices.
- **Error Boundaries**: Friendly error handling and recovery for all major pages.

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **State/Data**: React Query, Suspense, custom hooks
- **Charts**: Chart.js, react-chartjs-2
- **Backend**: Express.js, TypeScript, Supabase, Azure Storage SDK
- **Security**: Helmet, Express Rate Limit, Express Validator, Zod
- **Logging**: Winston, Morgan
- **File Handling**: Multer
- **Performance**: Compression

## Who is it for?
- Cloud administrators managing Azure Blob Storage
- Teams needing a visual, secure way to monitor and control storage
- Organizations requiring audit logs and role-based access

## Live Demo

You can [connect with me on LinkedIn](https://www.linkedin.com/in/mohamed-el-khayate-4535a91b6/) to request demo credentials for testing the application with an existing Azure account. Alternatively, you're welcome to sign up and connect your own Azure storage account.