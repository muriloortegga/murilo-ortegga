## Objetivo
Reciclar o repositório removendo tudo que não é usado, mantendo 100% do design/layout/copy atual. Nenhuma alteração visual.

## 1. Componentes customizados não usados — deletar
- `src/components/SectionLabel.tsx`
- `src/components/generic-project-layout.tsx`
- `src/components/maxi-social-case.tsx`
- `src/components/visual-identity-layout.tsx`

## 2. shadcn/ui — deletar tudo
Verificado: nenhum arquivo do app importa `@/components/ui/*`. Todas as referências são internas entre arquivos shadcn (button só é usado por carousel/calendar/etc., que também não são usados). Vou apagar a pasta inteira `src/components/ui/`.

Também removo:
- `src/hooks/use-mobile.tsx` (só usado por `ui/sidebar.tsx`)
- `components.json` (config do shadcn, sem propósito após a remoção)

## 3. Dependências do package.json — remover
Pacotes que só servem para os shadcn deletados:
`@radix-ui/*` (todos), `cmdk`, `vaul`, `embla-carousel-react`, `react-day-picker`, `react-resizable-panels`, `input-otp`, `recharts`, `sonner`, `react-hook-form`, `@hookform/resolvers`, `class-variance-authority`, `next-themes`.

Mantém: `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`, `zod` (se usado), TanStack, Tailwind, Vite, TS.

Vou rodar `rg` para confirmar cada um antes de remover via `bun remove`.

## 4. Assets órfãos — deletar
Estratégia: gerar lista de todos arquivos em `public/` e `src/assets/`, cruzar com `rg` no código-fonte, deletar os não referenciados.

Casos prováveis:
- `/public/natrave-marca.png`, `/public/natrave-social.png`, `/public/solid-full.png`, `/public/symplice-full.png`, `/public/hero-brandding.jpg` — verificar e remover se órfãos.
- `src/assets/logos/*.svg` — verificar duplicação com `public/assets/projects/brand-logos/*.svg`; manter só a fonte usada.
- `.gitkeep` em pastas que já têm conteúdo.

Mantém: thumbnails atuais (`/public/assets/projects/thumbnails/*.jpg`) e tudo referenciado em `trabalho.tsx` e nas rotas dos projetos.

## 5. Thumbnails da página /trabalho
Conforme combinado: **não altero** as fontes atuais. As 4 thumbnails já em `/assets/projects/thumbnails/` (kmillion, natrave, solid, symplice) continuam apontadas como hoje. As demais marcas (talk2buy, evidive, maxi, milgrows, kapyi, marco-boni, livin) seguem com mockups/unsplash/etc. atuais.

## 6. Verificação final
- `rg` para garantir que nenhum import quebrou.
- Build automático do harness valida tudo.

## Fora de escopo
- Mudanças de design, layout, animação, tipografia, copy.
- Reorganização de rotas ou alteração de comportamento.
