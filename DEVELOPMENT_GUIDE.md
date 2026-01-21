# Centrotea Backend - Guia Técnico de Desenvolvimento 📖

Este documento estabelece os padrões técnicos, arquiteturais e de segurança para o desenvolvimento e manutenção do backend do projeto Centrotea. O cumprimento destas diretrizes é obrigatório para garantir a integridade, escalabilidade e segurança do sistema.

## 🏛️ Arquitetura (DDD + Arquitetura Hexagonal)

O projeto adota os princípios de Domain-Driven Design (DDD) e Arquitetura Hexagonal. Cada módulo deve ser dividido rigorosamente nas seguintes camadas:

### 1. Domain (Domínio) - `src/modules/[module]/domain`
- **Entidades**: Representam os objetos de negócio e suas regras fundamentais. Devem ser agnósticas a frameworks ou bibliotecas externas.
- **Interfaces de Repositório**: Contratos que definem as operações de persistência e recuperação de dados.
- **Value Objects**: Objetos imutáveis que representam atributos específicos do domínio.

### 2. Application (Aplicação) - `src/modules/[module]/application`
- **Use Cases (Casos de Uso)**: Implementam a lógica de negócio específica da aplicação, orquestrando o fluxo de dados entre o domínio e as camadas externas.
- **DTOs (Data Transfer Objects)**: Definem as estruturas de dados para entrada e saída da camada de aplicação.

### 3. Infrastructure (Infraestrutura) - `src/modules/[module]/infrastructure`
- **Controllers**: Implementam os endpoints da API (REST/HTTP).
- **Mappers**: Responsáveis pela conversão de dados entre os modelos de persistência (TypeORM) e as entidades de domínio.
- **Persistence**: Contém as entidades do banco de dados e as implementações concretas dos repositórios.

---

## 🔐 Segurança e Proteção de Dados

1.  **Criptografia de Dados Sensíveis**: Informações armazenadas no campo `metadata` (JSONB) devem ser obrigatoriamente criptografadas.
2.  **AES-256-GCM**: O padrão de criptografia utilizado é o AES-256-GCM.
3.  **EncryptionService**: Toda operação de criptografia deve utilizar o `EncryptionService` localizado em `src/shared/infrastructure/security`.
4.  **Responsabilidade dos Mappers**: A lógica de criptografia (ao persistir) e descriptografia (ao recuperar) deve ser isolada nos Mappers da camada de infraestrutura.

---

## 🎭 Controle de Acesso Baseado em Funções (RBAC)

O acesso às rotas deve ser restrito através de Guards de autenticação e autorização.

**Roles Utilizadas**: `admin`, `therapist`, `staff`, `coordinator`, `workshop_host`.

**Exemplo de Implementação**:
```typescript
@Roles(UserRole.ADMIN, UserRole.THERAPIST)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get()
findAll() { ... }
```

---

## 🛠️ Procedimento para Novos Módulos

Ao implementar uma nova funcionalidade ou módulo, siga esta ordem de desenvolvimento:
1. Modelagem da **Entidade de Domínio**.
2. Definição da **Interface do Repositório**.
3. Implementação da **Camada de Persistência** (TypeORM + Repositório Concreto).
4. Desenvolvimento do **Mapper** de dados (incluindo segurança, se aplicável).
5. Implementação dos **Casos de Uso**.
6. Criação dos **Controllers** e definição de rotas.
7. Registro do módulo no arquivo principal da aplicação.

---

## 📜 Boas Práticas e Código Limpo

- **Comentários**: Utilize comentários para explicar a intenção (o "porquê"), evitando redundâncias sobre o que o código já expressa.
- **Nomenclatura**: Utilize nomes descritivos e alinhados à linguagem onipresente do negócio.
- **Testes**: A implementação de novos casos de uso deve ser acompanhada por testes automatizados de unidade ou integração.
