function parseArguments(args) {
  return {
    args: Array.from(args).splice(-1, 1),
    force: args[args.length - 1],
  };
}

export class Logger {
  static log(...argumentList) {
    const { args, force } = parseArguments(argumentList);
    if (force || process.env.NODE_ENV !== 'production') {
      console.log('[vue-localizator]', ...args);
    }
  }

  static info(...argumentList) {
    const { args, force } = parseArguments(argumentList);
    if (force || process.env.NODE_ENV !== 'production') {
      console.info('[vue-localizator]', ...args);
    }
  }

  static warn(...argumentList) {
    const { args, force } = parseArguments(argumentList);
    if (force || process.env.NODE_ENV !== 'production') {
      console.warn('[vue-localizator]', ...args);
    }
  }

  static error(...argumentList) {
    const { args, force } = parseArguments(argumentList);
    if (force || process.env.NODE_ENV !== 'production') {
      console.error('[vue-localizator]', ...args);
    }
  }
}
