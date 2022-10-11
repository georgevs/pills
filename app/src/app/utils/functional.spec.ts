import { compose } from 'redux';
import { fold, index, pair, remap, unique } from './functional';

describe('functional', () => {
  describe('pair', () => {
    it('should pair', () => {
      const [a, b, c] = [
        { key: 1, value: 'a' },
        { key: 1, value: 'b' },
        { key: 2, value: 'c' },
      ];
      const fn = ({ key }) => [key];
      expect(pair(fn)([a, b, c])).toEqual([
        [1, a], [1, b], [2, c]])
    })
  })

  describe('index', () => {
    it('should index', () => {
      const [a, b, c] = [
        { key: 1, value: 'a' },
        { key: 1, value: 'b' },
        { key: 2, value: 'c' },
      ];
      const fn = ({ key }) => [key];
      expect(index(fn)([a, b, c])).toEqual(new Map([
        [1, [a, b]], [2, [c]]
      ]))
    })
  })

  describe('fold', () => {
    it('should fold', () => {
      const [a, b, c] = [
        { value: 'a' },
        { value: 'b' },
        { value: 'c' },
      ];
      const xs = [[1, a], [1, b], [2, c]];
      expect(fold(xs)).toEqual(new Map([
        [1, [a, b]], [2, [c]]
      ]))
    })
  })

  describe('unique', () => {
    it('should return the same object for equal key', () => {
      const [a, b, c] = [
        { key: 1, value: 'a' },
        { key: 1, value: 'b' },
        { key: 2, value: 'c' },
      ];
      const key = ({ key }) => key;
      expect([a, b, c].map(unique(key))).toEqual([a, a, c]);
    })
  })

  describe('compose', () => {
    expect([1, 2, 3].map(compose<any>(x => x + 1, x => x * 2)))
      .toEqual([3, 5, 7]);
  })

  describe('remap', () => {
    it('should remap', () => {
      const fn = (x) => 'abc'.charAt(x);
      const m1 = new Map([
        [100, 0],
        [200, 1],
        [300, 2]
      ]);
      const m2 = new Map([
        [100, 'a'],
        [200, 'b'],
        [300, 'c']
      ])
      expect(remap(fn)(m1)).toEqual(m2);
    })
  })
})
