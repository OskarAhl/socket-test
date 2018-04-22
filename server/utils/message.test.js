const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = { from: 'oskar', text: 'avc'}
        const generatedMessage = generateMessage(message.from, message.text);
        
        expect(generatedMessage.from).toBe('oskar');
        expect(generatedMessage.text).toBe('avc');
        expect(generatedMessage.createdAt).toBeA('number');
        
    });
});