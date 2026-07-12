import {AnalyticsEngineDataset, D1Database} from "@cloudflare/workers-types"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
    namespace App {
        // interface Locals {}
        // interface PageData {}
        // interface Error {}
        interface Platform {
            env?: {
                PAGES_REQUESTS?: AnalyticsEngineDataset;
                DB: D1Database;
            },
            context?: {
                /**
                 * Waits for the promise to complete without blocking.
                 * @param promise The promise that is ensured completion
                 */
                waitUntil: (promise: Promise) => void
            },
            cf?: IncomingRequestCfProperties,
            caches: CacheStorage
        }
    }
}
