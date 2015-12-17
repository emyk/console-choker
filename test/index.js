import expect from 'expect';
import sinon from 'sinon';

import choker from '../src/choker';

describe('console-choker', () => {
    it('should suppress any console output', () => {
        const logSpy = sinon.spy(console, 'log');

        choker.start();

        console.log('logging');

        choker.flush();

        console.log.restore();

        expect(logSpy.callCount).toBe(0);
    });

    it('should print all suppressed output when being told so', () => {
        const logSpy = sinon.spy(console, 'log');

        choker.start();

        console.log('logging');
        console.log('logging some more');

        expect(logSpy.callCount).toBe(0);

        choker.flush(true);

        console.log.restore();

        expect(logSpy.callCount).toBe(2);
    });

    it('should print a single line when provided an index', () => {
        const logSpy = sinon.spy(console, 'log');

        choker.start();

        console.log('one');
        console.log('two');
        console.log('three');

        choker.flush(-1);

        console.log.restore();

        expect(logSpy.callCount).toBe(1);
        expect(logSpy.calledWithExactly('three'));
    })
});