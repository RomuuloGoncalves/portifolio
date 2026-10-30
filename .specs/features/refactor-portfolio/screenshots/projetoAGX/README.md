# projetoAGX — prints

**Nenhum print tirado.** O projeto é só API (Deno + Express + Mongoose), sem front-end (nenhum HTML/JS de UI no repo; só `/api-docs` Swagger, que também exige o app de pé).

Motivo de não subir: `connection/conn.ts:24` lança erro se `MONGO_URI`/`DB_NAME`/`MONGO_URI_MONGOOSE` faltam, e `connection/conn.ts:42` faz `await conectarMongoose(...)` ao importar, e `server.ts` importa tudo isso. Sem banco o app não inicia; pela regra de nunca acessar banco, não foi iniciado. Nada foi instalado nem executado.

Checklist anti-vazamento: n/a (nenhuma imagem gerada).

## O que o dono deve enviar (opcional)
- Print do Swagger (`/api-docs`) ou do Postman/Insomnia chamando `POST /login` e `POST /emprestimo`, com dados fictícios, sem token visível, sem barra de endereço, sem e-mail real.
- Ou usar no portfólio apenas trechos de código (Pipeline Inspector estático).
