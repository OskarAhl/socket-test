const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = { from: 'oskar', text: 'avc'}
        const generatedMessage = generateMessage(message.from, message.text);
        
        expect(generatedMessage.from).toBe('oskar');
        expect(generatedMessage.text).toBe('avc');
        expect(generatedMessage.createdAt).toBeA('number');
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        const lat = 15;
        const long = 30;

        const generatedLocationMessage = generateLocationMessage('admin', lat, long);
        expect(generatedLocationMessage.from).toBe('admin');
        expect(generatedLocationMessage.url).toBe(`https://www.google.com/maps?g=${lat}, ${long}`);

    });
});