// Todo o conteúdo do site (DADOS-01). Fonte: .specs/features/refactor-portfolio/content.md (rev. 2).
// Itens marcados [CONFIRMAR] dependem de aprovação do usuário.
// Caminhos de `imagem` são relativos a src/assets/; `icone` é o id do símbolo em src/assets/icons/tech.svg (sem "i-").

export interface Secao {
  id: string
  rota: string
  marca?: string
  titulo?: string
  sub?: string
}

export interface ItemHistorico {
  periodo: string
  inicio: string // AAAA-MM, para <time datetime>
  selo?: 'Atual' | 'Graduação' | 'Concluído'
  tipo: 'trabalho' | 'estudo'
  titulo: string
  local: string
  itens: string[]
  tags: string[]
}

export interface Projeto {
  nome: string
  ano: number
  stack: string[]
  descricao: string
  repo?: string
  demo?: string
  privado?: boolean
  imagem?: string
  alt?: string
}

export interface Certificado {
  nome: string
  emissor: string
  data?: string // AAAA-MM
  credencial?: string
  url?: string
}

export interface Tecnologia {
  nome: string
  icone: string
}

export interface EtapaPipeline {
  label: string
  file: string
  desc: string
  tags: string[]
  code: string
}

export interface CenarioPipeline {
  id: string
  titulo: string
  etapas: EtapaPipeline[]
}

export const perfil = {
  nome: 'Rômulo Gonçalves',
  sigla: 'RG',
  cargo: 'Desenvolvedor back-end',
  hero: [
    'Desenvolvo APIs em Node.js, TypeScript e MongoDB na AGX Software.',
    'Antes, PHP e Laravel no ERP escolar da Education1.',
  ],
  // [CONFIRMAR] URL pública do PDF (D-16); o arquivo está em public/curriculo.pdf
  curriculo: 'curriculo.pdf',
  foto: {
    alt: 'Foto de Rômulo Gonçalves',
    legenda: 'foto-perfil.avif · 1200×1600', // [CONFIRMAR] texto da legenda
  },
  sysinfo: {
    dev: 'Rômulo Gonçalves',
    primaryStack: 'Node.js / TS / MongoDB',
    secondary: 'PHP / Laravel / MySQL',
    location: 'Sorocaba, SP · Brasil',
    status: '', // D-12: vazio até o usuário aprovar um texto; vazio = linha omitida
  },
  email: 'romulogoncalves13@gmail.com',
  github: 'https://github.com/RomuuloGoncalves',
  linkedin: 'https://www.linkedin.com/in/romuulogoncalves/',
  codigoSite: 'https://github.com/RomuuloGoncalves/portifolio',
}

export const secoes: Secao[] = [
  { id: 'topo', rota: '/' },
  { id: 'sobre', rota: '/sobre', marca: '01_SOBRE', titulo: 'Sobre' },
  { id: 'historico', rota: '/historico', marca: '02_HISTORICO', titulo: 'Histórico', sub: 'Trabalho e graduação acontecendo ao mesmo tempo.' },
  { id: 'arquitetura', rota: '/arquitetura', marca: '03_PIPELINE', titulo: 'Anatomia de uma requisição', sub: 'Escolha um projeto e toque em cada etapa para ver o que acontece nela.' },
  { id: 'projetos', rota: '/projetos', marca: '04_PROJETOS', titulo: 'Projetos em destaque', sub: 'Cinco projetos com API, banco e testes; links para o código.' },
  { id: 'stack', rota: '/stack', marca: '05_STACK', titulo: 'Stack', sub: 'Do núcleo back-end à interface.' },
  { id: 'contato', rota: '/contato', marca: '06_CONTATO', titulo: 'Contato' },
]

export const linksHeader = [
  { href: '#historico', texto: 'Histórico' },
  { href: '#projetos', texto: 'Projetos' },
  { href: '#contato', texto: 'Contato' },
]

export const sobre = {
  lead: 'Sou desenvolvedor back-end. Comecei no técnico da Etec Sales Gomes, em Tatuí, entrei como estagiário na Education1 em 2024 e hoje escrevo APIs na AGX Software.',
  paragrafos: [
    'Na Education1 passei um ano e meio entre estágio e full stack: recebia os tickets do suporte, achava a causa e corrigia no ERP de gestão escolar, nos módulos de matrícula e financeiro.',
    'Faço Engenharia da Computação na Uniso, onde fui reconhecido 5 vezes como Aluno Top. Fora do trabalho, mantenho projetos próprios em Node.js, TypeScript e MongoDB.',
  ],
  principios: [
    { titulo: 'Transação quando não pode ficar pela metade', texto: 'Coleções modeladas para a consulta, índices onde a query pede e transações quando a operação não pode ficar pela metade.' },
    { titulo: 'OpenAPI em todo endpoint', texto: 'APIs REST tipadas em TypeScript, entrada validada antes de chegar ao domínio e endpoints documentados em OpenAPI/Swagger.' },
    { titulo: 'Correção na causa', texto: 'Ticket bom é ticket que não volta: ler o log, reproduzir, achar a origem e corrigir lá.' },
  ],
}

export const historico: ItemHistorico[] = [
  {
    periodo: '04/2026 a hoje', inicio: '2026-04', selo: 'Atual', tipo: 'trabalho',
    titulo: 'Desenvolvedor back-end', local: 'AGX Software, Sorocaba/SP, presencial',
    // [CONFIRMAR] desenha as APIs do zero?
    itens: ['Desenvolvo e mantenho serviços back-end. Analiso e corrijo tickets, crio funcionalidades novas e projeto APIs REST em Node.js e TypeScript, com MongoDB.'],
    tags: [], // COPY-04: a entrada atual não repete em tags o que o texto já diz
  },
  {
    periodo: '11/2025 a 04/2026', inicio: '2025-11', tipo: 'trabalho',
    titulo: 'Desenvolvedor full stack', local: 'Education1, remoto',
    itens: ['Recebia os tickets do suporte, achava a causa e corrigia no ERP de gestão escolar, nos módulos de matrícula e financeiro. Criei telas, escrevi queries SQL e trabalhei na performance de APIs.'],
    tags: ['PHP', 'Laravel', 'JavaScript', 'jQuery', 'MySQL'],
  },
  {
    periodo: '10/2024 a 11/2025', inicio: '2024-10', tipo: 'trabalho',
    titulo: 'Estagiário em Desenvolvimento de Sistemas', local: 'Education1, Sorocaba/SP',
    itens: ['Analisava tickets, corrigia bugs e implantava melhorias no mesmo ERP.'],
    tags: [],
  },
  {
    periodo: '02/2024 a hoje', inicio: '2024-02', selo: 'Graduação', tipo: 'estudo',
    titulo: 'Engenharia da Computação', local: 'Uniso',
    // [CONFIRMAR] semestre/previsão
    itens: ['Graduação em andamento. Reconhecido 5 vezes como Aluno Top da Uniso.'],
    tags: [],
  },
  {
    periodo: '02/2021 a 12/2023', inicio: '2021-02', selo: 'Concluído', tipo: 'estudo',
    titulo: 'Técnico em Desenvolvimento de Sistemas', local: 'Etec Sales Gomes, Tatuí/SP',
    itens: ['Curso técnico integrado ao ensino médio: lógica, estrutura de dados, banco de dados e desenvolvimento web.'],
    tags: [],
  },
]

// [CONFIRMAR] prints aguardando aprovação do usuário (SHOT-03); Moni e projetoAGX sem print (PROJ-04)
export const projetosDestaque: Projeto[] = [
  {
    nome: 'Liftech', ano: 2026,
    stack: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'React', 'Vitest'],
    descricao: 'Monorepo TypeScript com API Express e MongoDB organizada por módulos de domínio, validação por feature e testes com Vitest. Front em React com 7 idiomas.',
    repo: 'https://github.com/RomuuloGoncalves/Liftech',
    demo: 'https://liftech-pi.vercel.app', // [CONFIRMAR]
    imagem: 'projetos/liftech/visao-geral-desktop.webp', alt: 'Tela de visão geral do Liftech',
  },
  {
    nome: 'projetoAGX', ano: 2026,
    stack: ['Deno', 'Express', 'Mongoose', 'JWT', 'Swagger'],
    descricao: 'API de biblioteca com login JWT, permissão por perfil e empréstimo com transação no MongoDB para o estoque não ficar negativo. Tem Swagger e testes de integração.',
    repo: 'https://github.com/RomuuloGoncalves/projetoAGX',
  },
  {
    nome: 'Moni', ano: 2026,
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Vitest'],
    descricao: 'Gestão financeira pessoal: contas, orçamentos, transações recorrentes e metas, com código em repositories e services e testes unitários e de integração.',
    repo: 'https://github.com/RomuuloGoncalves/Moni',
    demo: 'https://ro-moni.vercel.app', // [CONFIRMAR]
  },
  {
    nome: 'soloTrack', ano: 2026,
    stack: ['Laravel', 'TypeScript', 'C++', 'Docker', 'OpenAPI'],
    descricao: 'Projeto em equipe: sensores com firmware em C++ mandam leituras para uma API Laravel, com front em TypeScript. Sobe com docker-compose.',
    repo: 'https://github.com/RomuuloGoncalves/soloTrack',
    demo: 'https://solotrack-beta.vercel.app',
    imagem: 'projetos/solotrack/home-1440.webp', alt: 'Tela inicial do soloTrack',
  },
  {
    nome: 'ONGFlow', ano: 2025,
    stack: ['Laravel 12', 'React', 'Vite', 'GitHub Actions'],
    descricao: 'Projeto em equipe que liga voluntários a ONGs. API em Laravel, front em React e deploy automático pelo GitHub Actions.',
    repo: 'https://github.com/RomuuloGoncalves/ONGFlow',
    demo: 'https://romuulogoncalves.github.io/ONGFlow/',
    imagem: 'projetos/ongflow/home-desktop.webp', alt: 'Página inicial do ONGFlow',
  },
]

export const outrosProjetos: Projeto[] = [
  {
    nome: 'lauressucrier', ano: 2026, privado: true,
    stack: ['Vite', 'Three.js', 'GSAP', 'Vitest'],
    descricao: 'Landing page 3D feita como freela, com Three.js, GSAP e testes em Vitest.',
    // [CONFIRMAR] URL da demo (D-16); repo privado (D-10)
    imagem: 'projetos/lauressucrier/desktop-hero.webp',
  },
  {
    nome: 'ATOMOX', ano: 2024,
    stack: ['ESP32', 'C++', 'JavaScript'],
    descricao: 'Monitor de qualidade do ar com ESP32 e interface web com dados em tempo real.',
    repo: 'https://github.com/RomuuloGoncalves/Projeto-Integrador',
    imagem: 'projetos/atomox.webp',
  },
  {
    nome: 'Mini interpretador', ano: 2025,
    stack: ['Python', 'PLY'],
    descricao: 'Trabalho de compiladores: análise léxica e sintática com PLY, tabela de símbolos e tratamento de erros.',
    repo: 'https://github.com/RomuuloGoncalves/calculadora_compiladores',
    imagem: 'projetos/calculadora-lexica.webp',
  },
]

// TODO(T11): cenários e etapas vêm de pipeline.md / research/arch-*.md (PIPE-04..07), com código conferido no repo
export const pipeline: CenarioPipeline[] = []

export const marquee: Tecnologia[] = [
  { nome: 'Node.js', icone: 'nodedotjs' },
  { nome: 'TypeScript', icone: 'typescript' },
  { nome: 'MongoDB', icone: 'mongodb' },
  
  { nome: 'Express', icone: 'express' },
  { nome: 'Deno', icone: 'deno' },
  { nome: 'PHP', icone: 'php' },
  { nome: 'Laravel', icone: 'laravel' },
  { nome: 'MySQL', icone: 'mysql' },
  { nome: 'Docker', icone: 'docker' },
  { nome: 'Git', icone: 'git' },
  { nome: 'Linux', icone: 'linux' },
  { nome: 'Vitest', icone: 'vitest' },
  { nome: 'Swagger', icone: 'swagger' },
  { nome: 'Vue.js', icone: 'vuedotjs' },
  { nome: 'React', icone: 'react' },
  { nome: 'Next.js', icone: 'nextdotjs' },
]

export const matrizStack = [
  { grupo: 'Back-end', itens: ['Node.js', 'TypeScript', 'Express', 'Deno', 'PHP', 'Laravel', 'Lumen', 'API REST'] },
  { grupo: 'Persistência', itens: ['MongoDB', 'Mongoose', 'Aggregation Framework', 'índices', 'modelagem NoSQL', 'MySQL', 'SQL'] },
  { grupo: 'Infra e qualidade', itens: ['Docker', 'Linux', 'Git', 'GitHub', 'Vitest', 'Supertest', 'OpenAPI/Swagger', 'Scrum', 'Kanban'] },
  { grupo: 'Interface', itens: ['React', 'Next.js', 'Vue.js', 'Angular', 'Ionic', 'JavaScript', 'HTML/CSS'] },
]

// [CONFIRMAR] URLs públicas das credenciais MongoDB
export const certificados: Certificado[] = [
  { nome: 'MongoDB Node.js Developer Path', emissor: 'MongoDB', data: '2026-05', credencial: 'MDBz8yqgb1ahv' },
  { nome: 'MongoDB Data Modeling Path', emissor: 'MongoDB', data: '2026-04', credencial: 'MDBjqyw6ftv4n' },
  { nome: 'Introduction to MongoDB', emissor: 'MongoDB', data: '2026-04', credencial: 'MDBst43cbdxts' },
  { nome: 'Curso de Docker', emissor: 'Udemy', data: '2026-02' },
  { nome: 'Aluno Top da Uniso, 5 vezes', emissor: 'Universidade de Sorocaba' },
]
