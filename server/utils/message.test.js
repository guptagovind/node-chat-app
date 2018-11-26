const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'Some text';
    const msg = generateMessage(from, text);
    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, text});
  })
});

describe('generateLocationMessage', () => {
  it('should generate correcct location object', () => {
    let from = 'Deb';
    let lat = 15;
    let long = 16;
    let url = 'https://www.google.com/maps?q=15,16';
    const msg = generateLocationMessage(from, lat, long);
    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, url});
  })
});
