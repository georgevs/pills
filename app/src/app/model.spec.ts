import { hello } from './model';

describe('model', () => {
  describe('hello', () => {
    it('should greet', () => {
      expect(hello('joe')).toEqual('Hello, joe.');
    })
  })
});
