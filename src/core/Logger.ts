import { Severity, severity_from_string } from "./Severity";

export type LogEntry = {
    readonly time: Date;
    readonly message: string;
    readonly severity: Severity;
    readonly logger: Logger;
    readonly cause?: any;
};

export type LogHandler = (entry: LogEntry, logger_name: string) => void;

function default_log_handler({ time, message, severity, logger, cause }: LogEntry): void {
    const str = `${time_to_string(time)} [${Severity[severity]}] ${logger.name} - ${message}`;

    /* eslint-disable no-console */
    let method: (...args: any[]) => void;

    switch (severity) {
        case Severity.Trace:
            method = console.trace;
            break;
        case Severity.Debug:
            method = console.debug;
            break;
        case Severity.Info:
            method = console.info;
            break;
        case Severity.Warning:
            method = console.warn;
            break;
        case Severity.Error:
            method = console.error;
            break;
        default:
            method = console.log;
    }

    if (cause == undefined) {
        method.call(console, str);
    } else {
        method.call(console, str, cause);
    }
    /* eslint-enable no-console */
}

export function time_to_string(time: Date): string {
    const hours = time_part_to_string(time.getHours(), 2);
    const minutes = time_part_to_string(time.getMinutes(), 2);
    const seconds = time_part_to_string(time.getSeconds(), 2);
    const millis = time_part_to_string(time.getMilliseconds(), 3);
    return `${hours}:${minutes}:${seconds}.${millis}`;
}

function time_part_to_string(value: number, n: number): string {
    return value.toString().padStart(n, "0");
}

export class Logger {
    private _severity?: Severity;

    get severity(): Severity {
        return this._severity ?? LogManager.default_severity;
    }

    set severity(severity: Severity) {
        this._severity = severity;
    }

    private _handler?: LogHandler;

    get handler(): LogHandler {
        return this._handler ?? LogManager.default_handler;
    }

    set handler(handler: LogHandler) {
        this._handler = handler;
    }

    constructor(readonly name: string) {}

    trace = (message: string, cause?: any): void => {
        this.log(Severity.Trace, message, cause);
    };

    debug = (message: string, cause?: any): void => {
        this.log(Severity.Debug, message, cause);
    };

    info = (message: string, cause?: any): void => {
        this.log(Severity.Info, message, cause);
    };

    warn = (message: string, cause?: any): void => {
        this.log(Severity.Warning, message, cause);
    };

    error = (message: string, cause?: any): void => {
        this.log(Severity.Error, message, cause);
    };

    log(severity: Severity, message: string, cause?: any): void {
        if (severity >= this.severity) {
            this.handler({ time: new Date(), message, severity, logger: this, cause }, this.name);
        }
    }
}

export class LogManager {
    private static readonly loggers = new Map<string, Logger>();

    static default_severity: Severity = severity_from_string(process.env["LOG_LEVEL"] ?? "Info");
    static default_handler: LogHandler = default_log_handler;

    static get(name: string): Logger {
        let logger = this.loggers.get(name);

        if (!logger) {
            logger = new Logger(name);
            this.loggers.set(name, logger);
        }

        return logger;
    }

    static with_default_handler<T>(handler: LogHandler, f: () => T): T {
        const orig_handler = this.default_handler;
        let is_promise = false;

        try {
            this.default_handler = handler;
            const r = f();

            if (r instanceof Promise) {
                is_promise = true;
                return (r.finally(() => (this.default_handler = orig_handler)) as unknown) as T;
            } else {
                return r;
            }
        } finally {
            if (!is_promise) {
                this.default_handler = orig_handler;
            }
        }
    }
}
