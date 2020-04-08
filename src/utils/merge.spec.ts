import { merge } from './merge';

describe('utils.merge', () => {
    let obj1: any;
    let obj2: any;
    beforeEach(() => {
        obj1 = {
            sameKey: 'old value',
            otherKey: 'other key value',
            nextedKey: {
                nextedKeyFirstKey: 'nextedKeyFirstKey',
                nextedKeySecondKey: 'nextedKeySecondKey',
            },
        };

        obj2 = {
            sameKey: 'new value',
            nextedKey: {
                nextedKeyFirstKey: 'new value of nextedKeyFirstKey',
            },
        };
    });

    it('will merge into first object', () => {
        const result = merge(obj1, { sameKey: 'new value' });
        expect(result.sameKey).toBe('new value');
    });

    it('will do a deep merge', () => {
        const result = merge(obj1, obj2);
        expect(result).toStrictEqual({
            nextedKey: {
                nextedKeyFirstKey: 'new value of nextedKeyFirstKey',
            },
            otherKey: 'other key value',
            sameKey: 'new value',
        });
    });
});
