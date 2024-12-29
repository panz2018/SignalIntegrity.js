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
      throw new Error(`No function is registered for event "${eventName}: ${JSON.stringify(args)}"`)
    }
  }
}

// Register wait/default cursor
const events = new Events()
let waits = 0
events.on('CursorWait', () => {
  waits += 1
  if (waits > 0) {
    document.body.style.cursor = 'wait'
    // Update cursor for FlowGraph
    const panes = document.querySelectorAll('.vue-flow__pane')
    panes.forEach((pane) => {
      ;(pane as HTMLElement).style.cursor = 'wait'
    })
  }
})
events.on('CursorDefault', () => {
  waits -= 1
  if (waits <= 0) {
    document.body.style.cursor = 'default'
    // Update cursor for FlowGraph
    const panes = document.querySelectorAll('.vue-flow__pane')
    panes.forEach((pane) => {
      ;(pane as HTMLElement).style.cursor = 'grab'
    })
  }
})

export default events
