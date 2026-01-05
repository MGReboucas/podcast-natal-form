# 🎙️ Podcast Natal — Lead Form & Tracking

Formulário de geração de leads do **Podcast Natal Studio**, desenvolvido em **Next.js + Prisma**, com foco em **conversão de anúncios (Meta Ads)** e **rastreamento de tráfego (UTM, pageview, campanhas)**.

Este projeto coleta leads de forma simples e envia o usuário diretamente para o WhatsApp após o envio, além de registrar eventos de navegação para análise de desempenho dos anúncios.

---

## 🚀 Funcionalidades

### ✅ Formulário de Orçamento

- Coleta de:
  - Nome
  - WhatsApp
  - Tipo de podcast
  - Interesse (único ou mensal)
  - Quantidade de horas / frequência
  - Preferência de horário
- Validação de campos obrigatórios
- UX otimizada para mobile (Meta Ads / Instagram)

### ✅ Integração com WhatsApp

- Após o envio:
  - Abre automaticamente o WhatsApp com mensagem pré-formatada
  - Mensagem contém todas as escolhas do formulário
- Reduz fricção e aumenta conversão

### ✅ Rastreamento de Tráfego (Tracking)

- Captura automática de:
  - `pageview`
  - `path`
  - `userAgent`
  - `referer`
  - UTMs:
    - `utm_source`
    - `utm_campaign`
    - `utm_adset`
    - `utm_ad`
    - `utm_medium`
    - `utm_content`
    - `utm_term`
  - `fbclid` (quando disponível)
- Evento salvo no banco via Prisma
- Envio **1 vez por sessão** (controle com `sessionStorage`)

### ✅ Backend com Prisma

- Banco PostgreSQL (NeonDB)
- Models:
  - `Lead`
  - `TrackingEvent`
- API Routes:
  - `/api/lead` → cria lead
  - `/api/track` → registra eventos de tracking

---

## 🧱 Stack Utilizada

- **Next.js 14 (App Router)**
- **React**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (NeonDB)**
- **TailwindCSS**
- **WhatsApp API (wa.me)**

---

## 📁 Estrutura do Projeto

```
podcast-natal-form/
├── app/
│ ├── api/
│ │ ├── lead/
│ │ │ └── route.ts # Criação de leads
│ │ └── track/
│ │ └── route.ts # Tracking de pageview e UTMs
│ ├── layout.tsx
│ └── page.tsx # Página do formulário
├── lib/
│ └── prisma.ts # Instância do Prisma Client
├── prisma/
│ ├── schema.prisma # Models do banco
│ └── migrations/
├── public/
│ └── podcast-natal-logo.png
├── .env
├── package.json
└── README.md

kotlin
Copiar código

```

## 🗄️ Models do Banco (Prisma)

### Lead

```prisma
model Lead {
  id          Int      @id @default(autoincrement())
  name        String
  whatsapp    String
  tipoPodcast String
  temLogo     Boolean
  interesse   String
  horas       Int?
  vezesMes    Int?
  horasSessao Int?
  horario     String?
  createdAt   DateTime @default(now())
}
TrackingEvent
prisma
Copiar código
model TrackingEvent {
  id           Int      @id @default(autoincrement())
  type         String
  path         String?
  referer      String?
  userAgent    String?
  utmSource    String?
  utmCampaign  String?
  utmAdset     String?
  utmAd        String?
  utmMedium    String?
  utmContent   String?
  utmTerm      String?
  fbclid       String?
  createdAt    DateTime @default(now())
}

```

⚙️ Variáveis de Ambiente
Crie um arquivo .env:

env
Copiar código
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
▶️ Como Rodar o Projeto
bash
Copiar código

# Instalar dependências

```
npm install
```

# Gerar Prisma Client

```
npx prisma generate
```

# Rodar migrations

```
npx prisma migrate dev
```

# Iniciar o servidor

```
npm run dev
```

```

mgr.dev
```
