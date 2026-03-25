# 🏦 Bank Account System CLI

A CLI-based bank system built in TypeScript as a learning exercise. It manages multiple bank accounts, supports async operations with simulated processing delays, and demonstrates several intermediate-to-advanced TypeScript and software design patterns.

> **Note:** This project was built as a hands-on practice exercise focused on TypeScript OOP, design patterns, and async error handling. It is not intended for production use.

---

## Features

- Create **Checking** and **Savings** accounts with distinct withdrawal rules
- **Deposit**, **Withdraw**, and **Transfer** funds between accounts (with async simulation)
- **Atomic transfers** with automatic rollback if the operation fails mid-way
- **Observer Pattern** via a generic, type-safe `EventEmitter` for account/transaction events
- **Repository Pattern** with in-memory storage behind interfaces
- `Result<T>` pattern for consistent, exception-free error handling across all async operations
- **Winston** logger integration, hooked into the event system
- Interactive **CLI menu** built with Node's `readline/promises`

---

## Project Structure

```
src/
├── app.ts                        ← Entry point & CLI menu wiring
├── cli/
│   ├── handlers.cli.ts           ← User input handlers for each operation
│   ├── listeners.cli.ts          ← Event listeners (logger hooks)
│   ├── menu.cli.ts               ← Generic reusable menu system
│   └── index.ts
├── events/
│   ├── EventEmitter.event.ts     ← Generic type-safe EventEmitter (Observer Pattern)
│   ├── BankEventEmitter.event.ts ← Bank-specific emitter instance
│   └── index.ts
├── factories/
│   ├── createAccount.factory.ts  ← Account factory
│   ├── createTransaction.factory.ts
│   ├── createLogger.factory.ts
│   └── index.ts
├── interfaces/
│   ├── IAccount.interface.ts
│   ├── IAccountRepository.interface.ts
│   ├── IBankService.iterface.ts
│   ├── ILogger.interface.ts
│   ├── ITransaction.interface.ts
│   ├── ITransactionRespository.interface.ts
│   └── index.ts
├── models/
│   ├── BaseAccount.model.ts      ← Abstract base class
│   ├── CheckingAccount.model.ts  ← Allows small overdraft
│   ├── SavingsAccount.model.ts   ← Enforces minimum balance
│   ├── Transaction.model.ts
│   └── index.ts
├── plugins/
│   ├── cli.plugin.ts             ← readline wrapper
│   ├── delay.plugin.ts           ← Async delay helper
│   ├── get-id.plugin.ts          ← UUID generator
│   ├── logger.plugin.ts          ← Winston instance
│   └── index.ts
├── repositories/
│   ├── account.reposity.ts       ← In-memory account store
│   ├── transaction.repository.ts ← In-memory transaction store
│   └── index.ts
├── services/
│   ├── BankService.service.ts    ← Core business logic
│   └── index.ts
└── types/
    ├── result.type.ts            ← Generic Result<T>
    ├── accountStatus.type.ts
    ├── bankEventMap.type.ts
    ├── transactionOptions.type.ts
    ├── transactionStatus.type.ts
    ├── transactionType.type.ts
    └── index.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Running in development

```bash
npm run dev
```

### Building and running for production

```bash
npm start
```

---

## Key TypeScript Concepts Practiced

| Concept | Where |
|---|---|
| `Result<T>` generic type | `types/result.type.ts`, all service methods |
| Abstract classes & `protected` | `BaseAccount` → `CheckingAccount`, `SavingsAccount` |
| Method overriding | `canWithdraw()` in both account subclasses |
| Generic `EventEmitter<T>` | `events/EventEmitter.event.ts` |
| Private class fields (`#`) | `Transaction`, `CheckingAccount`, `SavingsAccount` |
| `readonly` modifiers | Account and Transaction IDs |
| Discriminated union types | `TransactionOptions`, `Result<T>` |
| Observer Pattern | `BankEventEmitter` + `initListeners` |
| Repository Pattern | `InMemoryAccountRepository`, `InMemoryTransactionRepository` |
| Factory Pattern | `createAccount`, `createTransaction`, `createLogger` |
| Async/await with rollback | `transfer()` in `BankService` |

---

## Account Rules

| Account Type | Rule |
|---|---|
| **Checking** | Allows up to $15 overdraft |
| **Savings** | Requires a minimum balance of $15 at all times |

---

## Logging

Operations are logged to two files in the project root via **Winston**:

- `combined.log` — all log levels
- `error.log` — errors only

---

## Dependencies

| Package | Purpose |
|---|---|
| `uuid` | Generates unique IDs for accounts and transactions |
| `winston` | Structured logging to files |
| `typescript` | Language |
| `ts-node` | Run TypeScript directly in development |
| `nodemon` | Auto-restart on file changes |