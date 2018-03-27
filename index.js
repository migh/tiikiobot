//let request = require('request');

exports.tiikioBot = (req, res) => {
  const message = req.body;

  console.log(JSON.stringify(req.body));
  res.send('Some res');
  // request({
  //     url: 'https://api.telegram.org/bot334872078:AAFnkVK0MDRWAQ-NBwLTu0XqGiZ8d3jF6gQ/sendMessage',
  //     method: "POST",
  //     json: {
  //       chat_id: message.message.chat.id,
  //       text: 'It fuckin works!'
  //     }
  // }, function(error, response, body){
  //   if (!error && response.statusCode == 200) {
  //     console.log('Cool...');
  //     res.status(200).end();
  //   } else {
  //     console.log('Something happened...');
  //     console.log(error);
  //     res.status(400).send('Something happened!');
  //   }
  // });

};
