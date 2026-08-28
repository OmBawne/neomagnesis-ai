/**
 * lib/system.ts — Neomagnesis AI Local System Service
 *
 * ARCHITECTURE:
 * This service is the single source of truth for all local system metrics
 * consumed by dashboard components (Sidebar, OverviewPage, etc.).
 *
 * BROWSER BEHAVIOR (current):
 * Browsers cannot safely expose CPU, RAM, or Storage metrics without
 * user permission or native APIs. All functions return honest loading
 * states rather than invented values.
 *
 * TAURI MIGRATION (future):
 * When migrating to the Tauri desktop shell, replace each function body
 * with the corresponding Rust invoke() call. Dashboard components remain
 * unchanged — only this file needs updating.
 *
 * PRIVACY:
 * This service NEVER accesses:
 *   - Documents, Photos, Downloads
 *   - Passwords, Keychain, Credentials
 *   - Browser history or cookies
 *   - Clipboard contents
 *   - Email or messaging apps
 * It exposes ONLY: CPU usage, RAM usage, Storage usage, Engine status.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type EngineStatus = 'active' | 'inactive' | 'detecting'

export interface SystemMetrics {
  /** CPU usage percentage string, e.g. "22%" or "Detecting CPU…" */
  cpu: string
  /** RAM usage percentage string, e.g. "64%" or "Detecting Memory…" */
  ram: string
  /** Storage usage percentage string, e.g. "45%" or "Detecting Storage…" */
  storage: string
  /** Local engine process status */
  engineStatus: EngineStatus
}

// ─── CPU Usage ────────────────────────────────────────────────────────────────

/**
 * Returns current CPU usage as a formatted percentage string.
 *
 * TODO (Tauri):
 * Replace with Rust command:
 *   import { invoke } from '@tauri-apps/api/tauri'
 *   const usage: number = await invoke('get_cpu_usage')
 *   return `${Math.round(usage)}%`
 */
export function getCpuUsage(): string {
  // Browser cannot safely read CPU usage without a native API.
  // Return a truthful detecting state until Tauri migration.
  return 'Detecting…'
}

// ─── RAM Usage ────────────────────────────────────────────────────────────────

/**
 * Returns current RAM usage as a formatted percentage string.
 *
 * TODO (Tauri):
 * Replace with Rust command:
 *   import { invoke } from '@tauri-apps/api/tauri'
 *   const usage: number = await invoke('get_ram_usage')
 *   return `${Math.round(usage)}%`
 */
export function getRamUsage(): string {
  // Browser cannot safely read RAM usage without a native API.
  // Return a truthful detecting state until Tauri migration.
  return 'Detecting…'
}

// ─── Storage Usage ────────────────────────────────────────────────────────────

/**
 * Returns current storage usage as a formatted percentage or size string.
 *
 * TODO (Tauri):
 * Replace with Rust command:
 *   import { invoke } from '@tauri-apps/api/tauri'
 *   const usage: { used_gb: number; total_gb: number } = await invoke('get_storage_usage')
 *   return `${usage.used_gb.toFixed(1)} GB`
 */
export function getStorageUsage(): string {
  // Browser cannot safely read disk usage without a native API.
  // Return a truthful detecting state until Tauri migration.
  return 'Detecting…'
}

// ─── Engine Status ────────────────────────────────────────────────────────────

/**
 * Returns the status of the local Neomagnesis engine process.
 *
 * TODO (Tauri):
 * Replace with Rust command:
 *   import { invoke } from '@tauri-apps/api/tauri'
 *   const running: boolean = await invoke('get_engine_status')
 *   return running ? 'active' : 'inactive'
 */
export function getEngineStatus(): EngineStatus {
  // In the browser context, we cannot query local processes.
  // Return 'detecting' until Tauri migration provides a real process check.
  return 'detecting'
}

// ─── Composite helper ─────────────────────────────────────────────────────────

/**
 * Returns all system metrics as a single object.
 * Useful for components that need multiple values at once.
 *
 * TODO (Tauri):
 * Consider batching into a single Rust command for performance:
 *   const metrics: SystemMetrics = await invoke('get_all_system_metrics')
 */
export function getAllSystemMetrics(): SystemMetrics {
  return {
    cpu: getCpuUsage(),
    ram: getRamUsage(),
    storage: getStorageUsage(),
    engineStatus: getEngineStatus(),
  }
}
