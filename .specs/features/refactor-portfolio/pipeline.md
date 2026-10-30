# Pipeline Inspector: análise de arquitetura por projeto (T5)

Análise só por leitura do código real (nenhum app de back-end executado, nenhum banco acessado). Detalhes, árvores e trechos com `repo/arquivo:linha` em `research/arch-<projeto>.md`.

| Projeto | Back-end rastreável | Caso de uso | Etapas | Observação |
| --- | --- | --- | --- | --- |
| projetoAGX | Sim | `POST /emprestimo` | 6 (rota, autenticação JWT, autorização admin, validação, regra + transação, persistência + resposta) | Camadas reais Controller → Service → Repository; Inspector estático (exigiria MongoDB ao vivo) |
| Liftech | Sim | `POST /api/telemetry` (sensor → incidente → máquina em alerta) | 6 | Cadeia Router/Controller/Service/Repository não vale para machine/auth (módulos de funções); decidir 4 ou 6 etapas |
| Moni | Sim, com ressalva | criação de transação | 5 | Server Actions + services + repositories (Next.js), não é API HTTP: rotular como action, sem endpoint |
| soloTrack | Sim | Login | 7 | Laravel sem camada service/repo: rota → FormRequest → Controller → Eloquent; alternativa `POST /areas-plantio` |
| ONGFlow | Sim | `POST /api/projetos` | 6 | Laravel 12, sem service/repository; o FormRequest de Projeto existe mas não é usado no `store` |
| lauressucrier | Não (landing estática Vite + Three.js + GSAP) | pedido via WhatsApp (build-time) | 5 | Aba opcional de "fluxo de front-end"; depende de decisão do usuário |

## Decisões em aberto (D-18)

- Abas finais: os 5 projetos com back-end; incluir lauressucrier como aba de front-end ou deixá-lo fora?
- Liftech: 4 ou 6 etapas. soloTrack: Login ou `POST /areas-plantio`.
- Números de linha marcados `[CONFIRMAR]` nos arch-*.md (ex.: projetoAGX etapas 4 e 5) devem ser reconferidos ao copiar cada trecho.
