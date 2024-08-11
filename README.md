# Groupware Frontend

## Domain

https://groupwares.io

## Deployments

AWS ECS

## Config

<img src="https://img.shields.io/badge/pnpm-f69220?style=for-the-badge&logo=pnpm&logoColor=white">

## Stack

<img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764abc?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/tailwind-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white">

## Install & Start

```bash
pnpm install

pnpm run start

# dev
pnpm run dev
```

## Structure

```bash
└── app
    ├── (route)
    ├── components
    ├── constant
    ├── module
    │   ├── hooks
    │   └── utils
    ├── providers
    ├── store
    └── types
```

## Features

📌 게시물 CRUD

- Toast-UI-Editor를 사용해 Markdown Template 지원
- React-Quill을 사용해 이미지 첨부 지원
- 댓글 작성 기능 지원

📌 프로젝트

- 칸반보드와 지도 (Kakao Map API)를 사용한 프로젝트 할일 생성
- Fullcalendar 를 사용한 스케줄 관리 지원
