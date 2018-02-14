class Logger {
  parseArguments(args) {
    return {
      args: Array.from(args).splice(-1,1),
      force: args[args.length - 1],
    };
  }

  log() {
    const { args, force } = this.parseArguments(arguments);
    if (force || process.env.NODE_ENV !== 'production') {
      console.log(`[vue-localizator]`, ... args);      
    }
  }

  info() {
    const { args, force } = this.parseArguments(arguments);
    if (force || process.env.NODE_ENV !== 'production') {
      console.info(`[vue-localizator]`, ... args);      
    }
  }

  warn() {
    const { args, force } = this.parseArguments(arguments);
    if (force || process.env.NODE_ENV !== 'production') {
      console.warn(`[vue-localizator]`, ... args);      
    }
  }
  error() {
    const { args, force } = this.parseArguments(arguments);
    if (force || process.env.NODE_ENV !== 'production') {
      console.error(`[vue-localizator]`, ... args);      
    }
  }
}

export const logger = new Logger();