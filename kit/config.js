import chalk from 'chalk';
import logger from './logger.js';
const production = (process.env.NODE_ENV === 'production');

export function defineConfig(config) {
  // Check title
  if (!config.title) {
    config.title = 'kit';
  }
  // Check site
  if (config.site) {
    // Clean the site value
    //   1. Make lowercase (e.g., input: PMUS)
    //   2. Remove hyphens/dashes (e.g., input: pm-uk)
    let site = config.site.toLowerCase(); // #1
    site = site.replace('-', ''); // #2
    // Test whether the site is any of the allowed values
    let sites = ['pmus', 'pmuk', 'g4us', 'g4uk'];
    if (sites.some(s => s === site)) {
      config.site = site;
    } else {
      logger.warn(`kit.site value '${config.site}' may not be supported. Supported values: ${sites.join(', ')}`);
    }
  } else {
    throw new Error(`kit.site required. Supported values: ${sites.join(', ')}`);
  }
  // Handle mode (dev vs prod)
  if (!config.mode) {
    // If no user-defined override, set mode now
    config.mode = production ? 'production' : 'development';
  }
  
  // Handle base path for assets
  // Note: KIT_ASSETS holds the environment specific value relative to kit.base,
  //       while KIT_BASE holds the value based on the user defined value (regardless of kit.mode).
  if (!config.base) {
    logger.warn(`kit.base value not set. In production, this will result in a base path of '/' which is typically not what you want for SFCC projects.`);
    // Report no base path set (will cause issues when running build command)
    config.base = '/';  
  }

  config.assets = config.base;
  if (config.mode === 'production' || production) {
    if (!config.base.endsWith('/')) {
      config.assets += '/';
    } 
  } else {
    // For dev, we don't need a prepended base path (vite will expect '/')
    config.assets = '/';
  }

  // Handle user defined, project specific environment variables
  if (config.env) {
    for (const [key, value] of Object.entries(config.env)) {
      let envKey = 'KIT_APP_';
      envKey += key.replace(/[A-Z]/g, char => `_${char}`);
      envKey = envKey.toUpperCase();
      process.env[envKey] = value.toString();
    }
  }

  process.env.KIT_VERSION = process.env.npm_package_version
  process.env.KIT_TITLE = config.title;
  process.env.KIT_ENV = config.mode;
  process.env.KIT_SITE = config.site;
  process.env.KIT_BASE = config.base;
  process.env.KIT_ASSETS = config.assets;
  logSettings(config);
  return config;
}

function logSettings(config) {
  const { mode, site, base } = config;
  let f = (str) => chalk.green.bold(str);
  logger.info(`${f(site)} in ${f(mode)}${mode === 'production' ? ` using base path ${f(base)}` : ''}`);
}