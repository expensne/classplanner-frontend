const NODE_ENV = 'development'; // TODO - get from env

export function log(level, prefix, ...message) {
    if (NODE_ENV !== 'production') {
        if (prefix !== '') {
            prefix = '[' + prefix + ']';
        }
        if (level === 'error') {
            console.error(prefix, ...message);
        } else if (level === 'warn') {
            console.warn(prefix, ...message);
        } else {
            console.log(prefix, ...message);
        }
    }
}
