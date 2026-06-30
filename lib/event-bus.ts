/**
 * @lib eventBus
 * @category lib/event
 * @since 0.2.0
 * @description 全局事件总线 / Global event bus for cross-component communication
 * @example
 * eventBus.on('user:login', (user) => console.log(user));
 * eventBus.emit('user:login', { name: 'John' });
 * eventBus.off('user:login');
 */

type EventHandler<T = unknown> = (payload: T) => void;

class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  /**
   * Subscribe to an event / 订阅事件
   * @param event Event name
   * @param handler Event handler
   * @returns Unsubscribe function
   */
  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler as EventHandler);

    return () => this.off(event, handler);
  }

  /**
   * Subscribe to an event once (auto-unsubscribe after first call) / 订阅一次
   */
  once<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    const wrapper: EventHandler<T> = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  /**
   * Unsubscribe from an event / 取消订阅
   * @param event Event name
   * @param handler Specific handler (if omitted, removes all handlers for the event)
   */
  off<T = unknown>(event: string, handler?: EventHandler<T>): void {
    if (!handler) {
      this.handlers.delete(event);
      return;
    }
    this.handlers.get(event)?.delete(handler as EventHandler);
  }

  /**
   * Emit an event / 触发事件
   */
  emit<T = unknown>(event: string, payload?: T): void {
    const handlers = this.handlers.get(event);
    if (!handlers) return;
    handlers.forEach((handler) => {
      try {
        handler(payload);
      } catch (error) {
        console.error(`[EventBus] Error in handler for "${event}":`, error);
      }
    });
  }

  /**
   * Remove all handlers for an event (or all events) / 清除所有处理器
   */
  clear(event?: string): void {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }

  /**
   * Get all registered event names / 获取所有事件名
   */
  events(): string[] {
    return Array.from(this.handlers.keys());
  }

  /**
   * Get handler count for an event / 获取事件处理器数量
   */
  listenerCount(event: string): number {
    return this.handlers.get(event)?.size ?? 0;
  }
}

/** Global event bus instance / 全局事件总线实例 */
export const eventBus = new EventBus();

export { EventBus };
