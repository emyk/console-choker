const methods = 'assert,clear,count,debug,dir,dirxml,error,exception,group,' +
    'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
    'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn'.split(',');

function consoleMethods() {
    return Object.keys(console).filter(method => methods.indexOf(method) !== -1);
}

function printEntry(entry) {
    entry.fn.apply(console, entry.arguments);
}

export default {
    start() {
        this.logEntries = [];
        this.consoleBackup = {};

        consoleMethods().forEach((method) => {
            const original = console[method];

            console[method] = (...rest) => {
                this.logEntries.push({
                    method,
                    fn: original,
                    arguments: rest
                });
            };

            this.consoleBackup[method] = original;
        });
    },

    flush(print) {
        if (!this.logEntries.length) { return; }

        if (print === true) {
            this.logEntries.forEach(entry => printEntry(entry));
        } else if (typeof print === 'number') {
            if (print >= 0 && this.logEntries[print]) {
                printEntry(this.logEntries[print]);
            } else if (this.logEntries[this.logEntries.length + print]) {
                printEntry(this.logEntries[this.logEntries.length + print]);
            }
        }

        this.logEntries.length = 0;

        this.restore();
    },

    restore() {
        consoleMethods().forEach((method) => {
            console[method] = this.consoleBackup[method];
        });
    }
}
