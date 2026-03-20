/**
 * Generic EventEmitter (Observer Pattern)
 *
 * - T defines the event map: { eventName: payloadType }
 * - `on(event, callback)` registers a listener for an event
 * - `emit(event, data)` triggers all listeners for that event
 *
 * - Each event only accepts its correct payload type (type-safe)
 * - Supports async listeners and runs them in parallel
 * - Uses Promise.allSettled → one failing listener won’t break others
 *
 * Example:
 *   type Events = { deposit: Transaction }
 *   emitter.on("deposit", (tx) => { ... })
 *   emitter.emit("deposit", transaction)
 */

export class EventEmitter<T extends Record<string, unknown>> {
  // * this creates a object with the same keys as T and takes data: T[K] and returns void or Promise<void>
  private listeners: {
    [K in keyof T]?: ((data: T[K]) => void | Promise<void>)[]
  } = {}

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void | Promise<void>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]!.push(callback)
  }

  async emit<K extends keyof T>(event: K, data: T[K]) {
    const eventListeners = this.listeners[event]

    if (!eventListeners) return

    await Promise.allSettled(
      eventListeners.map(listener => listener(data))
    )
  }
}