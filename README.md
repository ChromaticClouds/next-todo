# Next Todo

[![CI](https://github.com/ChromaticClouds/next-todo/actions/workflows/ci.yml/badge.svg)](https://github.com/ChromaticClouds/next-todo/actions/workflows/ci.yml)

Next.js App Router 기반의 개인 Todo 관리 애플리케이션입니다. 이메일/OTP와 Google OAuth 인증을 지원하며, OAuth 신규 사용자는 Redis 기반 온보딩 세션을 거쳐 프로필을 완성한 뒤 계정이 생성됩니다. 인증된 사용자는 본인이 소유한 Todo만 조회·생성·수정·삭제할 수 있습니다.

## 주요 기능

- Todo 목록, 검색, 상세 조회, 생성, 수정, 완료 상태 변경, 삭제
- 사용자별 Todo 소유권 분리
- 이메일/비밀번호 회원가입과 이메일 OTP 인증
- 이메일/비밀번호 로그인
- Google OAuth 로그인
- 신규 OAuth 사용자의 추가 프로필 온보딩
- JWT access/refresh token 기반 세션
- Redis를 이용한 refresh session, OTP, onboarding, OAuth handoff 관리
- Supabase Storage를 이용한 프로필 이미지 저장
- 반응형 UI, 다크 모드, Todo 진행률 시각화

## 인증 및 인가 흐름

```text
Google OAuth
  ├─ 기존 사용자
  │    └─ 1회용 OAuth handoff → access/refresh 쿠키 발급
  └─ 신규 사용자
       └─ Redis onboarding session → 프로필 입력 → 계정 생성
                                     → access/refresh 쿠키 발급

이메일 회원가입
  └─ OTP 발송 → OTP 검증 → 계정 생성 → access/refresh 쿠키 발급

Todo API 요청
  └─ access token 검증
       ├─ 유효: 사용자 ID로 Todo 소유권 검사
       └─ 만료: refresh token + Redis session 검증
                  └─ access token 재발급 후 소유권 검사
```

인증 토큰은 `HttpOnly`, `SameSite=Lax` 쿠키로 전달되며 프로덕션에서는 `Secure` 옵션이 적용됩니다. Todo 생성 시 `ownerId`는 클라이언트 입력을 신뢰하지 않고 인증 컨텍스트의 사용자 ID로 서버에서 설정합니다. 조회·수정·삭제 쿼리도 항상 `ownerId`를 포함하며, 다른 사용자의 Todo에는 리소스 존재 여부를 노출하지 않도록 `404`를 반환합니다.

## 기술 스택

| 구분                       | 기술                                          |
| -------------------------- | --------------------------------------------- |
| Framework                  | Next.js 16, React 19, TypeScript              |
| Authentication             | Auth.js/NextAuth Google Provider, JWT, bcrypt |
| State and Forms            | TanStack Query, TanStack Form, Zod            |
| Server Logic               | Effect                                        |
| Database                   | MongoDB, Mongoose                             |
| Session and Temporary Data | Redis, ioredis                                |
| File Storage               | Supabase Storage                              |
| Email                      | Nodemailer                                    |
| UI                         | Tailwind CSS, shadcn/ui, Radix UI, Recharts   |
| HTTP Client                | ky                                            |

## 프로젝트 구조

```text
app/
  api/auth/             인증, OTP, OAuth, 온보딩 Route Handlers
  api/todos/            인증이 필요한 Todo CRUD Route Handlers
  onboard/profile/      OAuth 신규 사용자 프로필 입력
  todos/                Todo 상세 및 수정 화면
features/
  auth/                 인증 서비스, JWT, 가드, OAuth handoff
  tasks/                Todo 모델, 서비스, UI, Query 설정
  user/                 사용자 모델과 프로필 스키마
lib/                    MongoDB, Redis, Supabase, Effect 공통 설정
services/               공통 HTTP 클라이언트
scripts/                데이터 마이그레이션 스크립트
```

## API 개요

### 인증 API

| Method     | Endpoint                                 | 설명                            |
| ---------- | ---------------------------------------- | ------------------------------- |
| `POST`     | `/api/auth/register`                     | 이메일 회원가입 요청과 OTP 발송 |
| `GET`      | `/api/auth/email/verify`                 | OTP 세션의 이메일 조회          |
| `POST`     | `/api/auth/email/verify`                 | OTP 검증, 계정 생성, 로그인     |
| `POST`     | `/api/auth/login`                        | 로컬 계정 로그인                |
| `GET/POST` | `/api/auth/[...nextauth]`                | Google OAuth 진입점 및 callback |
| `GET`      | `/api/auth/onboarding/bootstrap`         | 온보딩 토큰 검증 및 쿠키 설정   |
| `GET`      | `/api/auth/onboarding/bootstrap/profile` | 온보딩 프로필 초기값 조회       |
| `POST`     | `/api/auth/onboarding/register`          | 온보딩 완료와 계정 생성         |

### Todo API

모든 Todo API는 인증이 필요합니다.

| Method   | Endpoint             | 설명                         |
| -------- | -------------------- | ---------------------------- |
| `GET`    | `/api/todos?search=` | 현재 사용자의 Todo 목록 조회 |
| `POST`   | `/api/todos`         | 현재 사용자 소유의 Todo 생성 |
| `GET`    | `/api/todos/:id`     | Todo 상세 조회               |
| `PATCH`  | `/api/todos/:id`     | Todo 완료 상태 변경          |
| `PUT`    | `/api/todos/:id`     | Todo 내용 수정               |
| `DELETE` | `/api/todos/:id`     | Todo 삭제                    |

## 로컬 실행

### 요구 사항

- Node.js 20 이상
- pnpm
- MongoDB
- Redis
- Google OAuth Client
- Supabase 프로젝트와 `avatars` Storage bucket
- SMTP 계정

### 설치

```bash
corepack enable
pnpm install
```

### 환경 변수

프로젝트 루트에 `.env.local`을 생성합니다.

```dotenv
NODE_ENV=development
APP_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

AUTH_SECRET=<auth-secret>
AUTH_GOOGLE_ID=<google-oauth-client-id>
AUTH_GOOGLE_SECRET=<google-oauth-client-secret>

MONGO_URI=<mongodb-connection-string>

REDIS_HOST=<redis-host>
REDIS_PORT=<redis-port>
REDIS_USER=<redis-user>
REDIS_PASS=<redis-password>

JWT_ACCESS_SECRET=<access-token-secret>
JWT_REFRESH_SECRET=<refresh-token-secret>
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=14d

NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<supabase-publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>

MAIL_PREFIX=todo
MAIL_USER=<smtp-user>
MAIL_PASS=<smtp-password>
```

Google OAuth의 승인된 redirect URI에는 다음 주소를 등록합니다.

```text
http://localhost:3000/api/auth/callback/google
```

배포 환경에서는 `localhost:3000`을 실제 서비스 도메인으로 교체해야 합니다.

### 개발 서버

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 검증 명령

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## CI

GitHub Actions는 pull request와 `main` 브랜치 push마다 다음 검사를 자동 실행합니다.

1. `pnpm install --frozen-lockfile`
2. ESLint
3. TypeScript typecheck
4. Next.js production build

동일 브랜치에 새 커밋이 push되면 이전 실행은 취소되고 최신 커밋을 검사합니다. CI 빌드는 외부 MongoDB나 Redis에 접속하지 않으며, 컴파일에 필요한 비밀이 아닌 placeholder 환경 변수만 사용합니다.

## 기존 Todo 소유자 마이그레이션

`ownerId` 도입 전에 생성된 Todo는 어떤 사용자에게도 자동 귀속되지 않습니다. 먼저 대상 사용자 ObjectId를 지정해 dry-run 결과를 확인합니다.

```bash
pnpm migrate:todo-owner <USER_OBJECT_ID>
```

출력된 orphaned Todo 수와 대상 사용자를 확인한 뒤 실제 반영할 때만 `--apply`를 추가합니다.

```bash
pnpm migrate:todo-owner <USER_OBJECT_ID> --apply
```

스크립트는 대상 사용자의 존재 여부를 검증하고 `ownerId`가 없거나 `null`인 Todo만 갱신합니다.

## 주요 보안 정책

- Todo API는 Route Handler에서 인증을 검증합니다.
- access token 만료 시 Redis에 등록된 refresh session만 재발급에 사용할 수 있습니다.
- OAuth 기존 사용자 로그인에는 60초 후 만료되는 일회용 handoff token을 사용합니다.
- OAuth 사용자는 `provider + providerAccountId` 조합으로 식별합니다.
- Todo 수정 요청은 허용된 필드만 `$set`하여 소유권 필드 변경을 차단합니다.
- 이메일 로그인 실패는 계정 존재 여부를 노출하지 않는 동일한 오류 메시지를 반환합니다.

## License

이 저장소는 현재 별도의 라이선스를 명시하지 않습니다.
