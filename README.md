# 💰 Controle de Gastos Residenciais
## Enterprise-Level Financial Management System

Sistema completo de Controle de Gastos Residenciais, desenvolvido como desafio técnico utilizando .NET 10 no Back-end e React + TypeScript no Front-end.

O projeto foi construído com foco em:

- Arquitetura limpa e organizada
- Separação clara de responsabilidades
- Aplicação consistente de regras de negócio
- Boas práticas modernas do .NET
- Integração robusta entre API e SPA

---

## 📖 Processo de Desenvolvimento e Decisões Técnicas

O desenvolvimento foi conduzido de forma incremental, priorizando arquitetura antes de implementação funcional.

---

# 1️⃣ Construção do Back-end (.NET 10)

O desenvolvimento iniciou pela camada de Back-end, utilizando .NET 10.

Após a criação da solução e separação em projetos por camada, foram adicionadas apenas as dependências necessárias, mantendo o projeto enxuto e alinhado às boas práticas.

Arquitetura adotada

Foi escolhida uma abordagem baseada em Clean Architecture (simplificada), priorizando:

- Domínio desacoplado de infraestrutura
- Entidades puras
- Regras de negócio centralizadas
- Controllers sem lógica de domínio

---

## 2️⃣ Modelagem das Entidades

Na camada Entities, foi adotado o princípio de mínimo uso de anotações.

Evitei utilizar:

- [Table]
- [Column]
- [ForeignKey]
- [JsonIgnore]
- virtual para Lazy Loading

### Motivo

Manter o domínio:

- Independente do EF Core
- Independente da API
- Testável
- Mais alinhado a padrões corporativos

Toda configuração de persistência foi feita via Fluent API na camada Infra.

---

## 3️⃣ Persistência com Code First

Foi adotada a abordagem Code First com Entity Framework Core.

Isso significa que:

- As tabelas são geradas a partir das entidades
- O versionamento do banco é feito via migrations
- Não foi utilizada engenharia reversa

Comandos utilizados

````bash
dotnet ef migrations add InitialCreate -p Infra -s WebApi
dotnet ef database update -p Infra -s WebApi
````

--- 

## 4️⃣ Configurações no Banco de Dados (Fluent API)

Na camada Infra foram configurados:

- Limitação de tamanho de campos (ex: descrição com 400 caracteres)
- Precision decimal(18,2)
- Conversão segura de enums
- Cascade Delete
- Índices
- Atualização automática de UpdatedAt

As regras de negócio críticas não ficaram apenas no banco — foram reforçadas na camada de Service.

---

## 5️⃣ Camada Service (Regras de Negócio)

A camada Service centraliza toda lógica de domínio:

- Menor de idade (<18) pode registrar apenas DESPESA
- Valor da transação deve ser positivo
- Categoria deve ser compatível com o tipo
- Pessoa deve existir
- Categoria deve existir

Fluxo arquitetural:

````bash
Controller → Service → Repository → Banco
````
Controllers apenas orquestram chamadas.

---

## 6️⃣ Controllers e Endpoints REST

Implementados seguindo padrão REST:

- GET
- POST
- PUT
- DELETE

Com documentação automática via Swagger.

---

## 7️⃣ Integração Back-end ↔ Front-end

Após finalização da API:

- Configuração de CORS
- Ajuste de appsettings.json
- Configuração da variável .env no Front-end

Exemplo:

````bash
VITE_API_URL=http://localhost:7184
````

---

# 🎨 Construção do Front-end (React + TypeScript)

Após finalizar a API, foi iniciado o desenvolvimento do Front-end utilizando:

- React
- TypeScript
- Vite
- Mantine UI
- TanStack React Query
- Axios

---

## 1️⃣ Estrutura Inicial

Primeiramente foi criada a base visual:

- Layout padrão
- Dashboard
- Sidebar colapsável (menu hambúrguer)
- Estrutura de rotas

Essa abordagem permitiu organizar a experiência antes da integração com a API.

---

## 2️⃣ Integração com API

Implementado:

- Camada api com Axios
- Gerenciamento assíncrono com React Query
- Tratamento de loading e erro
- Notificações visuais

---

## 3️⃣ Implementação dos CRUDs

### 👤 Pessoas

- CRUD completo
- Validação de idade
- Exclusão com confirmação

### 🏷 Categorias

- Criação
- Listagem
- Badge de finalidade

### 💸 Transações

- Valor positivo obrigatório
- Bloqueio de Receita para menores de idade
- Filtro automático de categorias compatíveis

---

## 4️⃣ Dashboard e Relatórios

Implementado relatório com:

- Cards KPI (Receitas / Despesas / Saldo)
- Tabela consolidada
- Total geral
- Filtro por tipo:
  - Todos
  - Receitas
  - Despesas
- Filtro simplificado por período:
  - Este mês
  - Últimos 30 dias

---

# 🧠 Decisões Técnicas Relevantes

- Domínio desacoplado de infraestrutura
- Fluent API ao invés de DataAnnotations extensivas
- Uso consistente de CancellationToken
- Enum iniciando em 1 (evita default inválido)
- Precision explícita para valores monetários
- DTOs separados das entidades
- Evitado Lazy Loading

---

# 📊 Modelo de Domínio

### Pessoa

- Id
- Nome (máx. 200)
- Idade
- Relacionamento 1:N com Transações

### Categoria

- Id
- Descrição (máx. 400)
- Finalidade (Despesa / Receita / Ambas)

### Transação

- Id
- Descrição (máx. 400)
- Valor (decimal 18,2)
- Tipo (Despesa / Receita)
- PessoaId
- CategoriaId
- CreatedAt (UTC)
- UpdatedAt

# 🔗 Endpoints

## Pessoas
````bash
GET    /api/pessoas
GET    /api/pessoas/{id}
POST   /api/pessoas
PUT    /api/pessoas/{id}
DELETE /api/pessoas/{id}
````
## Categorias
````bash
GET  /api/categorias
POST /api/categorias
Transações
GET  /api/transacoes
POST /api/transacoes
````
## Relatórios
````bash
GET /api/relatorios/totais-por-pessoa
````

---

## 🚀 Como Executar

### Backend
````bash
dotnet restore
dotnet ef database update
dotnet run
````

Swagger disponível em:
````bash
https://localhost:{porta}/swagger
````

### Front-end

Criar .env:
````bash
VITE_API_URL=http://localhost:{porta-da-api}
````

Executar:
````bash
npm install
npm run dev
````
Acesse:
````bash
http://localhost:5173
````

# 👨‍💻 Autor

Fábio Simones

Projeto desenvolvido como desafio técnico para demonstrar:

- Arquitetura organizada
- Aplicação real de regras de negócio
- Boas práticas em .NET moderno
- Integração API + SPA
- Código limpo e escalável
