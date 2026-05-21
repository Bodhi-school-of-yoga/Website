# Bodhi - Yoga Brand Website

A production-ready fullstack yoga brand website built with **Next.js**, **Strapi CMS**, and **PostgreSQL**.

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Frontend   | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| CMS        | Strapi 5, TypeScript                                |
| Database   | PostgreSQL 16                                       |
| API Client | Axios, React Query (TanStack Query)                 |
| Containers | Docker, Docker Compose                              |

## Project Structure

```
bodhi/
├── apps/
│   ├── web/              # Next.js frontend (App Router)
│   │   ├── src/
│   │   │   ├── app/      # Pages & routing
│   │   │   ├── components/
│   │   │   ├── lib/      # API client, queries, utils
│   │   │   └── types/    # TypeScript types
│   │   └── ...
│   └── cms/              # Strapi CMS
│       ├── config/       # Server, DB, middleware config
│       └── src/api/      # Content types (yoga-class, instructor, blog-post, testimonial)
├── docker-compose.yml
├── .env.example
└── package.json          # Workspace root
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL 14+ (or Docker)
- npm >= 9

### 1. Clone & Install

```bash
git clone <repo-url> bodhi
cd bodhi
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials and secrets
```

### 3. Start PostgreSQL

**Option A: Local PostgreSQL**

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE bodhi;
CREATE USER bodhi_user WITH PASSWORD 'changeme_strong_password';
GRANT ALL PRIVILEGES ON DATABASE bodhi TO bodhi_user;
```

**Option B: Docker (database only)**

```bash
docker compose up postgres -d
```

### 4. Start Strapi CMS

```bash
npm run dev:cms
```

This starts Strapi at `http://localhost:1337`. On first run you'll create an admin account.

After starting:
1. Go to `http://localhost:1337/admin`
2. Create your admin user
3. Go to **Settings > Roles > Public** and enable `find` and `findOne` for all content types
4. Create sample content (classes, instructors, blog posts, testimonials)

### 5. Start Next.js Frontend

```bash
npm run dev:web
```

Frontend runs at `http://localhost:3000`.

### Docker Compose (Full Stack)

```bash
docker compose up --build
```

This starts all three services:
- **PostgreSQL** at port 5432
- **Strapi CMS** at http://localhost:1337
- **Next.js** at http://localhost:3000

## Content Types

| Content Type  | Fields                                                       |
| ------------- | ------------------------------------------------------------ |
| Yoga Class    | title, slug, description, level, duration, schedule, image, instructor |
| Instructor    | name, slug, bio, specialization, experience, photo, classes  |
| Blog Post     | title, slug, excerpt, content, coverImage, author, category  |
| Testimonial   | name, quote, rating, avatar                                  |

## Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `npm run dev:web`   | Start Next.js dev server  |
| `npm run dev:cms`   | Start Strapi dev server   |
| `npm run build:web` | Build Next.js for production |
| `npm run build:cms` | Build Strapi for production  |
| `npm run start:web` | Start Next.js production  |
| `npm run start:cms` | Start Strapi production   |

## Pages

- **/** - Home (hero, features, class preview, testimonials, CTA)
- **/about** - Studio story, philosophy, stats
- **/classes** - All classes with level filters
- **/instructors** - Team profiles
- **/blog** - Articles grid
- **/blog/[slug]** - Individual blog post
- **/contact** - Contact form & studio info

## Production Deployment

1. Set all environment variables with secure values
2. Build both apps: `npm run build:web && npm run build:cms`
3. Use the Docker Compose setup or deploy individually:
   - Strapi: any Node.js host (Railway, Render, AWS)
   - Next.js: Vercel, or any Node.js host
   - PostgreSQL: managed service (Neon, Supabase, RDS)
