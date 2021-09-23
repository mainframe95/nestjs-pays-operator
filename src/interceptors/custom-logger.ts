import { LoggerService } from '@nestjs/common';
// const fs = require('fs')
import * as fs from 'fs';

/**
 * @see https://docs.nestjs.com/techniques/logger
 */

export class CustomLogger implements LoggerService {

    dir = '../tmp';

    constructor() {
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }

    }
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        if (!fs.existsSync('./tmp/log')) {
            fs.writeFile(`./tmp/log`, `${message}\n`, { flag: 'w+' }, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        } else {
            const date = new Date()
            console.log(date)
            fs.appendFile('./tmp/log', `-> ${date} ${message}\n` ,function(err){
                if(err) throw err;
                console.log('IS WRITTEN')
                });
        }

    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        console.log('error', message)

    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        console.log('warn', message)

    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        console.log('debug', message)

    }

    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        console.log('verbose', message)
    }
}