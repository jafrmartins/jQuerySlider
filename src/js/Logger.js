
window.loggerOptions = {
    messageLoggerStyle: 'background-color: #fefefe; color: goldenrod;',
    errorLoggerStyle: 'background: #fefefe; color: brown;',
    warningLoggerStyle: 'background: #fefefe; color: orange;',
    successLoggerStyle: 'background: #fefefe; color: green;',
    infoLoggerStyle: 'background: #fefefe; color: #123;',
}


export default class Logger {
    
    message(msg=undefined, style=window.loggerOptions.messageLoggerStyle) {
        
        if(msg==undefined) {
            throw new Error(`message undefined`);
        }

        console.log(`%c${msg}`, style);

    }

    static getInstance(options) {
        return new Logger(options);
    }

    log(msg=undefined, style=window.loggerOptions.messageLoggerStyle) {
        this.message(msg, style);
    }

    info(msg=undefined, style=window.loggerOptions.infoLoggerStyle) {
        console.log("i", style)
        this.message(msg, style);
    }   

    warning(msg=undefined, style=window.loggerOptions.warningLoggerStyle) {
        this.message(msg, style);
    }

    error(msg=undefined, style=window.loggerOptions.errorLoggerStyle) {
        this.message(msg, style);
    }

    success(msg=undefined, style=window.loggerOptions.successLoggerStyle) {
        this.message(msg, style);
    }

}