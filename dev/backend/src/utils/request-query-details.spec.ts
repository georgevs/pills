import RequestQueryDetails from './request-query-details';

describe('Query', () => {
  describe('filter', () => {
    it('should parse q.* key/value pairs', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2', 
        ['q']: 'a,b,c'
      });
      expect(q.filter).toEqual({ a: '1', b: '2' });
    })
    it('should return empty object if no filter', () => {
      const q = new RequestQueryDetails({ 
        ['q']: 'a,b,c'
      });
      expect(q.filter).toBeUndefined();
    })
  })
  describe('fields', () => {
    it('should parse q fields', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2', 
        ['q']: 'a,b,c'
      });
      expect(q.fields).toEqual(['a', 'b', 'c']);
    })
    it('should trim fields', () => {
      const q = new RequestQueryDetails({ 
        ['q']: ' a , b , c '
      });
      expect(q.fields).toEqual(['a', 'b', 'c']);
    })
    it('should return undefined if no fields', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2'
      });
      expect(q.fields).toBeUndefined();
    })
  })
  describe('start', () => {
    it('should parse s number', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2', 
        ['q']: 'a,b,c',
        ['s']: '123'
      });
      expect(q.start).toEqual(123);
    })
    it('should ignore s if NaN', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2', 
        ['q']: 'a,b,c',
        ['s']: 'not a number'
      });
      expect(q.start).toBeUndefined()
    })
    it('should ignore s if zero', () => {
      const q = new RequestQueryDetails({ 
        ['q.a']: '1', 
        ['q.b']: '2', 
        ['q']: 'a,b,c',
        ['s']: '0'
      });
      expect(q.start).toBeUndefined()
    })
  })
});
