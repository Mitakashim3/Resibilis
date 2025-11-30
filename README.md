# Resibilis 🧾

**Lightning-fast ("Bilis") Receipt Generator** for Filipino freelancers, students, and small sellers.

## ✨ Features

- 🚀 **Instant Generation** - Create professional receipts in seconds
- 🔒 **Secure by Design** - XSS/IDOR protection with strict validation
- 🌙 **Dark Mode** - Easy on the eyes, day or night
- 📱 **Mobile-First** - Thumb-friendly design for on-the-go use
- 💾 **Save & History** - Keep track of all your receipts (with account)
- 🆓 **Free Tier Friendly** - Runs on Vercel + Supabase free tiers

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + next-themes |
| Auth | Supabase Auth (Google OAuth) |
| Database | Supabase PostgreSQL |
| Forms | React Hook Form + Zod |
| Export | html-to-image + jsPDF |
| Security | DOMPurify + CSP Headers |

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── auth/
│   │   └── callback/         # OAuth callback handler
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (Server Component)
│   ├── providers.tsx         # Theme provider
│   └── InvoiceGenerator.tsx  # Main generator (Client Component)
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── AuthButton.tsx    # Sign in button
│   │   └── UserMenu.tsx      # User dropdown menu
│   ├── invoice/              # Invoice feature components
│   │   ├── InvoiceForm.tsx   # Form with validation
│   │   ├── InvoicePreview.tsx # Receipt preview
│   │   └── InvoiceHistory.tsx # Saved receipts list
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── ...
├── lib/
│   ├── schemas/              # Zod validation schemas
│   ├── supabase/             # Supabase clients
│   └── utils.ts              # Utility functions
├── types/
│   └── database.ts           # TypeScript types for Supabase
└── middleware.ts             # Security headers middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account (free tier)
- Google Cloud Console project (for OAuth)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/resibilis.git
cd resibilis
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project
2. Go to SQL Editor and run `supabase/schema.sql`
3. Enable Google OAuth in Authentication > Providers

### 3. Set Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Security Implementation

### Anti-XSS (Cross-Site Scripting)

1. **Zod Schema Validation** - All inputs validated before processing
2. **DOMPurify Sanitization** - HTML stripped from user inputs
3. **CSP Headers** - Strict Content Security Policy in middleware
4. **React Default Encoding** - Automatic output encoding

### Anti-IDOR (Insecure Direct Object References)

1. **Row Level Security (RLS)** - Database-level access control
2. **Auth Check** - All mutations verify `user_id = auth.uid()`
3. **No Sequential IDs** - UUIDs prevent enumeration

### Security Headers (middleware.ts)

```typescript
// Content Security Policy
// X-Frame-Options: DENY
// X-Content-Type-Options: nosniff
// Referrer-Policy: strict-origin-when-cross-origin
// Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📊 User Scenarios

### Scenario A: Guest User ("Nagmamadali")
- Fill form → Download PNG/PDF
- **Zero database cost** - All client-side

### Scenario B: Sign In ("Sukilin")
- Click "Sign in with Google"
- Auto-creates profile via database trigger

### Scenario C: Authenticated User ("Records Keeper")
- Fill form → Save to database
- View history with real-time updates
- RLS ensures data isolation

## 🎨 Component Data Flow

```
┌─────────────────┐     formData      ┌──────────────────┐
│  InvoiceForm    │ ────────────────► │  InvoicePreview  │
│  (User Input)   │                   │  (Live Preview)  │
│  + Zod Schema   │                   │  Always White BG │
└────────┬────────┘                   └────────┬─────────┘
         │                                     │
         │ onSave (authenticated)              │ onDownload
         ▼                                     ▼
┌─────────────────┐                   ┌──────────────────┐
│   Supabase      │                   │  html-to-image   │
│   + RLS         │                   │  (Client-side)   │
└─────────────────┘                   └──────────────────┘
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_APP_URL=https://resibilis.vercel.app
```

## 📝 License

MIT © 2024 Resibilis

---

Made with 💚 for Filipino entrepreneurs
