# 🏦 Exercise: Bank Account System CLI

Build a CLI-based bank system in TypeScript that manages multiple accounts and supports async operations. This directly builds on the parking lot project but pushes significantly further.

---

## Core Requirements

### Entities to model

- **`Account`** — has an ID, owner name, account type (`checking | savings | investment`), balance, and a transaction history
- **`Transaction`** — has an ID, type (`deposit | withdrawal | transfer`), amount, timestamp, and status (`pending | completed | failed`)

### Operations to implement

| Method | Description |
|---|---|
| `createAccount(owner, type, initialDeposit)` | Returns a new account |
| `deposit(accountId, amount)` | Async, simulates processing delay |
| `withdraw(accountId, amount)` | Async, must validate sufficient funds |
| `transfer(fromId, toId, amount)` | Async, must be **atomic** (if either side fails, neither goes through) |
| `getStatement(accountId)` | Returns all transactions for an account |
| `getBalance(accountId)` | Returns current balance |

---

## TypeScript Requirements

These are specifically meant to push you further than the parking lot project:

- **Generics** — create a generic `Result<T>` type (`{ success: true, data: T } | { success: false, error: string }`) and have all async operations return `Promise<Result<T>>` instead of throwing or rejecting
- **Abstract classes** — create an abstract `BaseAccount` class with shared logic, then extend it with `SavingsAccount` (which enforces a minimum balance) and `CheckingAccount` (which allows a small overdraft)
- **Access modifiers** — use `private`, `protected`, and `readonly` meaningfully. For example, `balance` should not be directly settable from outside the class
- **Method overriding** — `SavingsAccount` and `CheckingAccount` should each override a `canWithdraw(amount)` method differently
- **Generic utility types** — use at least one of `Partial`, `Pick`, or `Omit` for something like updating account metadata

### Interface vs Class note

Since `balance` needs to be protected inside the class, your interface should describe the **public API** rather than raw properties. Expose balance via `getBalance()` instead of a public property, and use `protected` inside the class so subclasses can still access it:

```typescript
abstract class BaseAccount implements IAccount {
  protected balance: number

  getBalance(): number {
    return this.balance
  }

  protected updateBalance(amount: number): void {
    this.balance += amount
  }
}
```

---

## Design Pattern Requirements

### Observer Pattern
Implement a simple event system so you can subscribe to account events:
- `onDeposit`
- `onWithdrawal`
- `onTransferComplete`

The logger should hook into this event system.

### Repository Pattern
Create an `AccountRepository` that abstracts storage. Use an in-memory array/map internally, but behind an interface so it could be swapped for a real database later.

---

## Async Requirements

- All mutating operations (`deposit`, `withdraw`, `transfer`) must be `async` with real `await` usage — no raw `setTimeout` inside a `new Promise()` wrapper. Use a small helper and `await` it directly:
  ```typescript
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
  ```
- `transfer` must handle the case where the withdrawal succeeds but the deposit fails — **roll back the withdrawal**
- Use `Promise.allSettled` somewhere meaningful, for example batch-processing multiple deposits at startup

---

## Suggested File Structure

```
src/
  models/
    BaseAccount.ts         ← abstract class
    CheckingAccount.ts
    SavingsAccount.ts
  interfaces/
    IAccount.ts
    ITransaction.ts
    IRepository.ts
  repositories/
    AccountRepository.ts
  services/
    bankService.ts
  events/
    EventEmitter.ts        ← your observer implementation
  types/
    Result.ts              ← generic Result<T>
  utils/
    delay.ts
  app.ts
```

### Folder responsibilities

| Folder | Purpose |
|---|---|
| `interfaces/` | Pure TypeScript contracts — no runtime code, just type definitions |
| `models/` | Classes that implement those interfaces |
| `repositories/` | Data access abstraction |
| `services/` | Business logic |
| `events/` | Observer pattern implementation |
| `types/` | Shared generic types |
| `utils/` | Small helper functions |

---

## Stretch Goals *(optional but recommended)*

- Write unit tests for `SavingsAccount` and `CheckingAccount` using **vitest**
- Persist transaction history to a JSON file using `fs/promises`
- Add an `interestAccrual(accountId)` method on `SavingsAccount` only, using TypeScript to make this inaccessible on `CheckingAccount` at compile time

---

## Key Concepts to Focus On

The main leaps from the parking lot project are:

1. **`Result<T>` pattern** instead of throw/reject for async error handling
2. **Class hierarchy** with abstract methods and access modifiers
3. **Observer pattern** for decoupled event handling
4. **Atomic transfer** with rollback on failure

Good luck — these four together will give you a solid workout on async patterns, OOP, and advanced TypeScript features.
