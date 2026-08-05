# Requirements: Portfólio Murilo Ortega — Reposicionamento para Recrutadores

**Defined:** 2026-08-04
**Core Value:** Em poucos segundos de home page, um recrutador entende quem é Murilo, com o que ele trabalha, os resultados que já entregou, e consegue agir (LinkedIn, e-mail, CV) — sem que nada do conteúdo/projetos/páginas existentes seja perdido ou fique inacessível.

## v1 Requirements

Requirements for the home page restructure. Each maps to roadmap phases.

### Fixes (bloqueantes — precisam ser resolvidos antes da hierarquia de CTA fazer sentido)

- [ ] **FIX-01**: Link de download do CV na home aponta para o arquivo real (`public/cv/CV MURILO ORTEGA 2026.pdf`), testado manualmente
- [ ] **FIX-02**: URL do LinkedIn confirmada pelo usuário como correta (hoje `https://linkedin.com/in/muriloortega`, não verificada)
- [ ] **FIX-03**: Asset de foto para o hero resolvido — origem definida (foto real do usuário, ou fallback explícito no tratamento visual atual) antes do trabalho de layout do hero começar

### Hero

- [ ] **HERO-01**: Headline dupla no hero — linha 1 comunica papel/valor profissional contratável (terminologia de cargo padrão de mercado), linha 2 comunica resultado/prova entregue
- [ ] **HERO-02**: Foto/presença visual do Murilo em destaque no hero (não como camada de fundo em grayscale/baixa opacidade como hoje em `/sobre`)
- [ ] **HERO-03**: Cluster de CTA primário no hero — LinkedIn + e-mail + CV com hierarquia visual dominante
- [ ] **HERO-04**: CTA secundário no hero — "Ver Portfolio completo" (mantém acesso a `/trabalho`)

### Prova Social

- [ ] **PROOF-01**: Marquee de 13 logos de clientes existentes mantido, com linha de contexto/resultado associada (não logo solto sem explicação)
- [ ] **PROOF-02**: Conteúdo qualitativo aceito como fallback quando não houver métrica quantificável por cliente

### Cases

- [ ] **CASE-01**: 5 cases em destaque na home com narrativa Problema → Ação → Resultado: NaTrave, Symplice, Maxi, Solid+, e o 5º a decidir entre Milgrows ou Kapyi
- [ ] **CASE-02**: Cada case mostra resultado/contexto visível sem precisar clicar (não é só thumbnail bonito)
- [ ] **CASE-03**: Demais projetos (além dos 5 em destaque) continuam acessíveis via `/trabalho`, sem sumir de lugar nenhum

### Competências

- [ ] **SKILL-01**: Seção de hard skills na home (Photoshop, Illustrator, After Effects, Figma, Canva, Capcut, Premiere, stack de IA, stack de gestão) — condensada, não duplicando o conteúdo completo de `/sobre`
- [ ] **SKILL-02**: Seção de soft skills na home — lista a definir com o usuário no discuss-phase

### Métodos

- [ ] **METHOD-01**: Os 6 métodos atuais (Estrutura de Marca, Comunicação de Marca, Conversão de Marca, Autoridade de Marca, Percepção de Marca, Expansão de Marca) reposicionados na home com framing de competência profissional primeiro, "serviço contratável" como camada secundária — conteúdo mantido, só copy/hierarquia mudam

### Contato

- [ ] **CONTACT-01**: Bloco de contato final na home (não existe hoje) com LinkedIn + e-mail + CV em destaque como ação primária
- [ ] **CONTACT-02**: WhatsApp/orçamento presente no bloco de contato final como opção secundária, com peso visual subordinado (não removido, não escondido)
- [ ] **CONTACT-03**: Hierarquia de CTA (recrutador primário, freelance secundário) aplicada de forma consistente em todo lugar que um CTA aparece na home (hero, métodos, bloco de contato final) — não só em um componente isolado

### Anti-Requisitos (validados pela pesquisa — NÃO fazer)

- [ ] **ANTI-01**: Não usar barras/gráficos de porcentagem de proficiência de skill
- [ ] **ANTI-02**: Não usar saudação genérica sem valor no hero ("Olá, sou o Murilo")
- [ ] **ANTI-03**: Não replicar a lista completa de todos os projetos na home
- [ ] **ANTI-04**: WhatsApp não pode ser o CTA dominante ou primeiro visualmente
- [ ] **ANTI-05**: Não introduzir animação/vídeo pesado novo no hero

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Conteúdo

- **CONTENT-01**: Linha de remote-readiness explícita ("Disponível para posições remotas, colaboração assíncrona") — baixo custo, pode vir depois da estrutura base validada
- **CONTENT-02**: Teaser do stack de IA/gestão linkando para `/sobre` — não bloqueante

### Técnico

- **TECH-01**: Filtro interativo de cases por skill/papel — não justificado no volume atual de conteúdo
- **TECH-02**: Preview de case em vídeo/motion — custo de performance alto, revisitar só depois de resolver o débito de GIFs pesados

## Out of Scope

Explicitly excluded from this phase. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Reescrever `/sobre`, `/trabalho`, `/contato`, `/metodos` ou páginas de projeto individuais | Fora do escopo desta fase — só a home muda; demais páginas continuam como estão |
| Excluir qualquer conteúdo/página/projeto/texto/asset existente | Regra inegociável do usuário — tudo pode ser reorganizado, nada é deletado |
| Trocar o stack técnico (React/TanStack/Tailwind/Vite) | Fixo, confirmado pela pesquisa como suficiente sem novas dependências |
| Adicionar testes automatizados | Débito técnico real (ver `.planning/codebase/CONCERNS.md`), mas não objetivo desta fase |
| Corrigir rota morta `/servicos/*` → `/metodos/*` no `ContextNav` | Bug pré-existente fora do escopo da home; registrado como débito técnico separado |
| Otimizar GIFs pesados de kmillion (91MB) e natrave (66MB) | Fora do escopo da home; registrado como débito técnico separado |
| CMS/gerenciamento de conteúdo dinâmico | Site é intencionalmente hardcoded por design; só revisitar se frequência de atualização aumentar muito |

## Traceability

Empty initially — populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FIX-01, FIX-02, FIX-03 | TBD | Pending |
| HERO-01 a HERO-04 | TBD | Pending |
| PROOF-01, PROOF-02 | TBD | Pending |
| CASE-01 a CASE-03 | TBD | Pending |
| SKILL-01, SKILL-02 | TBD | Pending |
| METHOD-01 | TBD | Pending |
| CONTACT-01 a CONTACT-03 | TBD | Pending |
| ANTI-01 a ANTI-05 | TBD | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 0 (roadmap pending)
- Unmapped: 23 ⚠️ (resolved by `/gsd:roadmap` step next)

---
*Requirements defined: 2026-08-04*
*Last updated: 2026-08-04 after initialization*
