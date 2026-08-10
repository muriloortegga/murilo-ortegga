# Phase 3 — Prior Art from Discarded Branch

## Why this file exists

Consolidação de branches (2026-08-10): o repositório tinha uma branch solta,
`claude/portfolio-homepage-restructure-jgx1iv` (PR #1, aberto, nunca mergeado,
criada em 2026-07-16 — **antes** do processo de fases/GSD existir), com uma
reescrita completa e independente da home feita de uma vez só, sem checkpoints
de aprovação. Ela sobrepunha o que as Fases 1-2 (já aprovadas, já em `main`)
implementaram, e também **antecipava boa parte do escopo da Fase 3** (ainda
TBD no ROADMAP: PROOF-01/02, SKILL-01/02, CONTACT-01/02/03).

Decisão do usuário: descartar a branch (fechar o PR, apagar a branch) e não
fazer merge bruto — mas preservar o conteúdo dela aqui como referência/insumo
para quando a Fase 3 for planejada de verdade pelo fluxo GSD normal (com
aprovação do usuário nos checkpoints). **Nada aqui está aprovado.** É
material de partida, não um plano.

A branch original ficou baseada no `main` de antes da Fase 1 (SHA `7343a52`),
então a implementação de hero/index.tsx dela não se aplica mais como está —
o hero, os cases e a estrutura de CTA já mudaram nas Fases 1-2. As peças
abaixo são as que ainda fazem sentido como ponto de partida.

## Ideias reaproveitáveis

### 1. Bloco de contato final (CONTACT-01/02/03)
A branch adicionava um "Recruiter CTA Block" no `Footer.tsx`, **antes** do
bloco freelancer existente (mantido verbatim), com LinkedIn + CV como ação
primária e e-mail como secundária. Mesma lógica aplicada em `contato.tsx`:
bloco recrutador (Currículo / LinkedIn / e-mail) acima do bloco freelancer
existente (WhatsApp / Agendar Call), que permanece intocado.

Trecho de referência (`Footer.tsx`, precisa reestilizar pro design atual):
```tsx
{/* Recruiter CTA Block (primary) */}
<div className="site-section border-t-0">
  <div className="site-container">
    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-6 block">
      Para recrutadores
    </span>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-7">
        <h2 className="line-height-tight">
          Vamos conversar sobre<br />
          <span className="text-secondary font-medium">a próxima vaga?</span>
        </h2>
      </div>
      <div className="lg:col-span-5 flex flex-col gap-6 items-start lg:items-end">
        <div className="flex flex-wrap gap-4">
          <a href="/cv/..." download className="btn btn-primary px-8 py-4 rounded-full flex items-center gap-2">
            Baixar Currículo <Download size={16} />
          </a>
          <a href="https://linkedin.com/in/muriloortega" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-8 py-4 rounded-full">
            LinkedIn
          </a>
        </div>
        <a href="mailto:contato@muriloortega.com" className="text-sm font-bold tracking-tight hover:text-secondary transition-colors">
          contato@muriloortega.com
        </a>
      </div>
    </div>
  </div>
</div>
```

### 2. Header: link direto pro Currículo (fora de escopo formal, mas barato)
A branch trocava o item "Contato" do nav de um link WhatsApp externo para
`/contato`, e adicionava um item "Currículo" apontando pro PDF com download
direto. Vale avaliar como parte do CONTACT-01, já que hoje o header não tem
nenhum caminho de CV.

### 3. Contexto nos logos de clientes (PROOF-01/02)
Array `socialProofContext` — uma linha de contexto/resultado por logo, exibida
como grid abaixo do marquee de marcas, em vez de logos "pelados":
```ts
const socialProofContext = [
  { name: "NaTrave", note: "Ecossistema completo pro futebol amador" },
  { name: "Solid+", note: "Identidade para expansão internacional" },
  { name: "Symplice", note: "Sistema visual que simplifica o complexo" },
  { name: "Kapyi", note: "2,5 anos de liderança criativa em agência" },
  { name: "Milgrows", note: "Social media e educação em saúde" },
];
```
Só cobre 5 dos 13 logos do marquee atual — Fase 3 precisa decidir se
completa os outros 8 ou usa uma framing qualitativa pros que não têm métrica
(conforme já previsto no critério de sucesso da Fase 3 no ROADMAP).

### 4. Skills condensadas (SKILL-01/02)
Duas listas — hard skills (ferramentas, com logos já existentes em `/sobre`)
e soft skills (ícones `lucide-react` + label curto), sem barra de
percentual/proficiência (proibido pelo critério de sucesso da Fase 3):
```ts
const hardSkillsGlance = [
  { name: "Photoshop", logo: "/assets/about/logos/ps.png" },
  { name: "Illustrator", logo: "/assets/about/logos/ai.png" },
  { name: "Figma", logo: "/assets/about/logos/fi.png" },
  { name: "After Effects", logo: "/assets/about/logos/ae.png" },
  { name: "Premiere", logo: "/assets/about/logos/pr.png" },
  { name: "Claude AI", logo: "/assets/about/logos/claude.png" },
  { name: "GPT/Gemini", logo: "/assets/about/logos/gpt.png" },
  { name: "Lovable", logo: "/assets/about/logos/lovable.png" },
  { name: "Asana", logo: "/assets/about/logos/asana.png" },
  { name: "Notion", logo: "/assets/about/logos/notion.png" },
];

const softSkills = [
  { label: "Liderança criativa", icon: Users },
  { label: "Autonomia em time remoto assíncrono", icon: Globe2 },
  { label: "Comunicação estratégica com stakeholders", icon: MessageSquare },
  { label: "Gestão de múltiplos projetos em paralelo", icon: ClipboardList },
];
```
Precisa confirmar com o usuário se esses logos existem mesmo em
`/assets/about/logos/*` no `main` atual antes de reusar.

### 5. Métodos reframe (METHOD-01)
A branch adicionava um eyebrow "Competências em prática" e um parágrafo de
transição antes do `MethodsSection`, reforçando que as mesmas competências
se aplicam tanto dentro de um time quanto como parceiro sob demanda — sem
alterar o conteúdo dos métodos em si. Compatível com o requisito METHOD-01
("copy e hierarquia mudam, conteúdo dos métodos não").

## O que NÃO reaproveitar

- Toda a reestruturação do hero (`index.tsx`) dessa branch — já superada
  pela Fase 2 (foto real, H1 de duas linhas, cluster de CTA aprovado via
  `02-COPY.md`/`02-UI-SPEC.md`). Não reabrir essa decisão sem pedido
  explícito do usuário.
- O rename do PDF do currículo para `curriculo-murilo-ortega.pdf` — a Fase 1
  já resolveu FIX-01/02 apontando pro arquivo real existente
  (`public/cv/CV MURILO ORTEGA 2026.pdf`). Rename é possível no futuro por
  higiene de URL, mas é decisão separada, não decorre desta consolidação.
- Os 5 "featured cases" com copy própria — a Fase 2 já sourced e aprovou a
  copy P→A→R definitiva em `02-CASE-SOURCES.md`/`02-COPY.md`. Não substituir.
- Título/descrição de SEO da home e de `/contato` propostos pela branch — Fase
  3/4 deve tratar SEO/meta como parte do próprio processo (ANTI-01 e Fase 4),
  não herdar copy não revisada.

## Branches de origem (consolidadas em 2026-08-10)

- `claude/portfolio-homepage-restructure-jgx1iv` — PR #1 fechado sem merge,
  branch apagada. Conteúdo preservado neste arquivo.
- `feature/home-recruiter-redesign` — já era ancestral direto de `main`
  (sem commits únicos); branch apagada, nada a preservar.
