import { dynamicImport } from "./dynamicImport";

/**
 * Loads a module from the given URL
 * @param {string} url - URL to load the module from
 * @returns {Promise<{mountModule: Function, componentStore: Object}|null>} Module exports or null if loading fails
 */
async function fetchModuleFromUrl(url) {
    try {
         const module = await dynamicImport(url);
         return module;
    } catch (err) {
        console.error(`Failed to load module from ${url}:`, err);
        throw err;
    }
}

/**
 * Loads an ESM module, attempting local development server first if available
 * @param {Object} params - Module loading parameters
 * @param {string} params.moduleName - Name of the module to load
 * @throws {Error} If required parameters are missing
 * @returns {Promise<{mountModule: Function, componentStore: Object}|null>} Module exports or null if loading fails
 *
*/
export async function loadEsmModule({ moduleName, localMode = true }) {
    if (!moduleName) {
        throw new Error('Required parameter missing: moduleName is required');
    }
    const env = ['alpha', 'beta'].includes(window.env) ? 'nightly/' : '';

    /** FIXME: | cleanup local setup once the change is verified in alpha */
    if(localMode) {
        return fetchModuleFromUrl(`http://localhost:3000/fa.book.of.business/src/mounted.ts`);
    }
    const remoteUrl = `${window.location.host}/${moduleName}/${env}/module/module.es.js`;
    return fetchModuleFromUrl(remoteUrl);
}
