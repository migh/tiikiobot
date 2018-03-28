const TgBot = require('node-telegram-bot-api');
const gh = require('octonode');
const yaml = require('js-yaml');

const TgUtils = require('./utils/Telegram');

class Bot {
  constructor(localOptions){
    this._state = {
      token: localOptions.token,
      ghToken: localOptions.ghToken
    };
  }

  reply(msg) {
    const tgParser = new TgUtils(msg);
    const { meta, body } = tgParser.parse();

    const isAllowed = this.isAllowed(meta);

    if (isAllowed) {
      if ( meta.type === 'document' ) {
        if ( body.mimeType === 'text/x-markdown' || body.mimeType === 'text/markdown' ) {
          const tgbot = new TgBot(this._state.token, {polling: false});
          const fileStream = tgbot.getFileStream(body.fileId);
          let content = '';

          // todo: check if file already has front matter
          const fmOptions = {
            title: body.fileName,
            date: meta.date,
            categories: [
              'prueba',
              'test',
              'algo mas'
            ]
          };

          const fm = this.createFrontMatter(fmOptions);
          content += fm;

          fileStream.on('data', (data) => {
            content += data;
          });

          fileStream.on('end', () => {
            // octonode chaange the file to base64 by itself
            // const fileToCommit = Buffer.from(content).toString('base64');
            const ghClient = gh.client(this._state.ghToken);
            const ghrepo = ghClient.repo('migh/test');
            ghrepo.createContents(`files/${body.fileName}`, `Create ${body.fileName} file.`, content, (err, data) => {
              if (err) return console.error(err);
              console.log(data);
            });
            // send to github
          });
        } else {
          this.logError('MIME type not supported.', `We only accept markdown documents for now.`);
        }
      } else {
        this.logError('Feature not supported.', `We only accept documents for now.`);
      }
    } else {
      this.logError('Unauthorized access.', `User: ${meta.user.fullName}, id: ${meta.user.id}`);
    }
  }

  isAllowed(meta) {
    return true;
  }

  createFrontMatter(options) {
    const delimiter = '---\n';
    return `${delimiter}${yaml.safeDump(options)}${delimiter}`;
  }

  logError(type, message) {
    console.log(type);
    console.log(message);
  }
}

module.exports = Bot;
