const eventNames = ['Error', 'CursorWait', 'CursorDefault'] as const
type EventName = (typeof eventNames)[number]

class Events {
  private listeners = Object.fromEntries(
    eventNames.map((key: EventName) => [key as EventName, new Set<(...args: any[]) => void>()])
  ) as Record<EventName, Set<(...args: any[]) => void>>

  on(eventName: EventName, listener: (...args: any[]) => void): void {
    this.listeners[eventName].add(listener)
  }

  emit(eventName: EventName, ...args: any[]): void {
    if (this.listeners[eventName].size > 0) {
      this.listeners[eventName].forEach((listener) => listener(...args))
    } else {
      throw new Error(`No function is registered for event "${eventName}: ${args}"`)
    }
  }
}

export default new Events()
