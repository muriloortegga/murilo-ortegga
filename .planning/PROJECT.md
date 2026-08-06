# Portfólio Murilo Ortega — Reposicionamento para Recrutadores

## What This Is

Site de portfólio pessoal de Murilo Ortega (murilo-ortegga.lovable.app), profissional com 8 anos de experiência em branding, direção de arte, social media, conteúdo e presença digital, atuando via seu estúdio Eme Creative Hub (São Paulo). Hoje o site é 100% estruturado como landing page de agência/freelancer (CTAs de WhatsApp para orçamento, headlines de venda de serviço). Este projeto reestrutura a **home page** para funcionar primariamente como landing de conversão para **recrutadores de vagas remotas** em Social Media, Branding, Marketing e Design Gráfico, mantendo a camada freelancer/agência como opção secundária.

## Core Value

Em poucos segundos de home page, um recrutador entende quem é Murilo, com o que ele trabalha, os resultados que já entregou (via cases reais, não só imagens bonitas), e consegue agir (LinkedIn, e-mail, CV) — sem que nada do conteúdo/projetos/páginas existentes seja perdido ou fique inacessível.

## Requirements

### Validated

<!-- Inferred from existing codebase — shipped and in production today. -->

- ✓ Site em produção via Lovable (lovable-tagger) + deploy Cloudflare Workers, sincronizado com push em `main` no GitHub — existente
- ✓ Stack React 19 + TanStack Start (SSR, rotas file-based) + Tailwind CSS 4 + Framer Motion + Vite 7 — existente
- ✓ 11 rotas de projeto individuais (evidive, kapyi, kmillion, livin, marco-boni, maxi, milgrows, natrave, solid, symplice, talk2buy) — existente
- ✓ Página `/sobre` com trajetória, hard skills, stack de IA, stack de gestão, e "Brand Board" com 4 cases — existente
- ✓ Página `/trabalho` com listagem completa de projetos — existente
- ✓ 6 métodos/serviços documentados em `/metodos` e sub-rotas — existente
- ✓ SEO básico (schema.org Person, sitemap.xml) — existente
- ✓ CV em PDF disponível em `public/cv/` — existente (link quebrado na home, ver Context)

### Active

- [ ] Home com hero de presença visual (foto) + headline dupla (profissional contratável + resultado entregue)
- [ ] CTA primário da home voltado a recrutador (LinkedIn + e-mail + CV em destaque); WhatsApp/orçamento como CTA secundário
- [ ] Prova social (13 logos de clientes) com contexto/resultado, não logo solto
- [ ] 5 cases em destaque na home com narrativa problema → ação → resultado (NaTrave, Symplice, Maxi, Solid+, + Milgrows ou Kapyi)
- [ ] Seção de competências na home: hard skills + soft skills (hoje só em `/sobre`)
- [ ] Métodos/serviços atuais reposicionados na home como competências profissionais primeiro, "serviço contratável" como camada secundária
- [ ] Bloco de contato final na home com LinkedIn, e-mail, CV em destaque, WhatsApp secundário
- [ ] Correção do link de download do CV (aponta para arquivo inexistente)
- [ ] Confirmação/correção da URL do LinkedIn

### Out of Scope

- Reescrever `/sobre`, `/trabalho`, `/contato`, `/metodos` ou páginas de projeto individuais — podem ser tocadas em fases futuras, não nesta
- Adicionar novas seções de conteúdo além das listadas em Active
- Trocar o stack técnico (React/TanStack/Tailwind/Vite permanecem)
- Adicionar testes automatizados — débito técnico real (ver CONCERNS.md) mas não objetivo desta fase
- Corrigir rota morta `/servicos/*` → `/metodos/*` no `ContextNav` — bug real identificado no mapeamento, mas fora do escopo da home; registrar como débito técnico separado
- Otimizar GIFs pesados (kmillion 91MB, natrave 66MB) — fora do escopo da home, registrar como débito técnico separado
- Excluir qualquer conteúdo, página, projeto, texto ou asset existente — regra inegociável, nunca out of scope no sentido de "descartar", só de "não tocar agora"

## Context

- **Negócio**: Murilo Ortega, Eme Creative Hub, São Paulo. Mudança de público-alvo primário: de clientes de agência para recrutadores de vagas remotas (Social Media, Branding, Marketing, Design Gráfico) às quais ele já se candidatou.
- **Codebase mapeado** em `.planning/codebase/` (commit `1329f81`): SSR TanStack Start, conteúdo hardcoded inline nas rotas (sem CMS/backend), deploy Cloudflare Workers.
- **Achados do mapeamento relevantes para esta fase**:
  - Link de "Baixar CV" na home aponta para `/cv/curriculo.pdf` (inexistente); arquivo real é `public/cv/CV MURILO ORTEGA 2026.pdf`.
  - LinkedIn já está preenchido como `https://linkedin.com/in/muriloortega` em `Footer.tsx` e `contato.tsx` — não está quebrado como "#", mas precisa confirmação do usuário se é a URL correta.
  - Não existe foto/retrato nítido de Murilo no repo — só 3 imagens de mood/background em grayscale + baixa opacidade (`hero-bg.jpg`, `middle-bg.jpg`, `footer-bg.jpg`) usadas em `/sobre`. Origem do asset de foto para o hero da home é uma decisão pendente.
  - `ContextNav` linka para `/servicos/*`, rotas que não existem (reais são `/metodos/*`) — bug pré-existente, não introduzido por este projeto.
- **Sincronização Lovable**: push em `main` aciona rebuild automático (lovable-tagger + Cloudflare Workers via wrangler.jsonc). Branch conectada no painel do Lovable deve ser confirmada pelo usuário antes do merge final da PR desta fase.

## Constraints

- **Conteúdo**: Nenhum conteúdo/página/projeto/texto/asset existente pode ser excluído — só reorganizado, reescrito ou movido de posição/hierarquia.
- **Deploy/Sync**: Toda mudança de código do site deve refletir automaticamente no Lovable via push em `main`. Mudanças estruturais grandes continuam sendo feitas em branch separada (`feature/home-recruiter-redesign`), nunca commit direto de código em `main` durante a execução da fase (exceto documentação em `.planning/`, que não afeta o site) — **mas, a partir de 2026-08-05, o merge da branch pra `main` acontece a cada fase aprovada pelo usuário no checkpoint final dela**, não mais só uma vez no final da Fase 4. Isso significa que o site ao vivo é atualizado incrementalmente conforme cada fase fecha, e a Fase 4 (QA completa: responsivo, SEO/meta, integridade de links, squint test) passa a ser uma passada de polimento final sobre o que já está no ar, não mais um gate obrigatório antes do primeiro deploy.
- **Estética**: Dark mode, editorial, tipograficamente minimalista, premium — linguagem visual não muda, só arquitetura de informação e hierarquia de conversão. Consultar skill `ui-ux-pro-max` antes de gerar componente novo.
- **Tech stack**: React 19 + TanStack Start + Tailwind CSS 4 + Framer Motion + Vite 7 — fixo, não é decisão desta fase.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Público primário da home muda de "cliente de agência" para "recrutador remoto" | Usuário já se candidata a vagas remotas em Social Media/Branding/Marketing/Design Gráfico; camada freelancer continua existindo, só vira secundária | — Pending |
| Escopo desta fase = apenas a home page (`src/routes/index.tsx`) | Demais páginas já cobrem o conteúdo completo; home deve ser resumo estratégico, não arquivo completo | — Pending |
| Granularidade do roadmap = Coarse (fase única, múltiplos planos internos se necessário) | Pedido do usuário é especificamente sobre a home, não o site inteiro | — Pending |
| Bugs pré-existentes fora do escopo da home (rota `/servicos/*`, GIFs pesados) ficam registrados mas não corrigidos nesta fase | Evitar scope creep; tratados como débito técnico separado | — Pending |
| Merge da branch pra `main` passa a acontecer a cada fase aprovada (não só no final da Fase 4) | Usuário quer iterar e ver o site ao vivo atualizar com frequência, em vez de esperar as 4 fases completas; decisão explícita do usuário em 2026-08-05 | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-04 after initialization*
