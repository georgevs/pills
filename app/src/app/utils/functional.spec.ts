import { fold, index, unique } from './functional';

describe('functional', () => {
  describe('index', () => {
    it('should index', () => {
      const [a, b, c] = [
        { key: 1, value: 'a' },
        { key: 1, value: 'b' },
        { key: 2, value: 'c' },
      ];
      const key = ({ key }) => key;
      expect(index(key)([a, b, c])).toEqual([
        [1, a], [1, b], [2, c]])
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
})
