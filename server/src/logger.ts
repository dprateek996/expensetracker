type LogMetadata = Record<string, unknown> | undefined;

const serializeMetadata = (metadata: LogMetadata): string => {
  if (!metadata) {
    return '';
  }

  try {
    return ` ${JSON.stringify(metadata)}`;
  } catch (error) {
    return ` Could not serialize metadata: ${(error as Error).message}`;
  }
};

const formatMessage = (level: string, message: string, metadata?: LogMetadata) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${serializeMetadata(metadata)}`;
};

const logger = {
  info(message: string, metadata?: LogMetadata) {
    console.log(formatMessage('info', message, metadata));
  },
  warn(message: string, metadata?: LogMetadata) {
    console.warn(formatMessage('warn', message, metadata));
  },
  error(message: string, metadata?: LogMetadata) {
    console.error(formatMessage('error', message, metadata));
  },
  debug(message: string, metadata?: LogMetadata) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatMessage('debug', message, metadata));
    }
  }
};

export default logger;
