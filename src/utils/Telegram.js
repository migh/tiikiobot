class TgUtils {
  constructor(message) {
    this.message =  message;
  }

  get from() {
    const from = this.message.from;
    return {
      id: from.id,
      fullName: `${from.first_name} ${from.last_name}`
    }
  }

  get chat() {
    const chat = this.message.chat;
    return {
      id: chat.id,
      type: chat.type
    }
  }

  get date() {
    const date = this.message.date * 1000;
    return new Date(date);
  }

  get type() {
    const props = Object.keys(this.message);
    let type = 'text';

    if (props.includes('text')) {
      // todo: check for entities
    };
    if (props.includes('audio')) type = 'audio';
    if (props.includes('document')) type = 'document';
    if (props.includes('game')) type = 'game';
    if (props.includes('photo')) type = 'photo';
    if (props.includes('sticker')) type = 'sticker';
    if (props.includes('video')) type = 'video';
    if (props.includes('voice')) type = 'voice';
    if (props.includes('video_note')) type = 'videoNote';
    if (props.includes('contact')) type = 'contact';
    if (props.includes('location')) type = 'location';
    if (props.includes('venue')) type = 'venue';
    if (props.includes('invoice')) type = 'invoice';

    return type;
  }

  get messageBody() {
    // todo: use an associative array
    if (this.type === 'document') return {
      fileName: this.message.document.file_name,
      fileId: this.message.document.file_id,
      mimeType: this.message.document.mime_type
    }
  }

  parse() {
    return {
      meta: {
        user: this.from,
        chat: this.chat,
        date: this.date,
        type: this.type
      },
      body: this.messageBody
    }
  }
}

module.exports = TgUtils;
