const express = require('express');

const router = express.Router();

// 간단한 응답 라우트 정의
router.get('/hello', (req, res) => {
    console.log('body :',req.body);
    

    res.send('Hello, this is a response from hello.js!');
});


router.post('/sayHello', function(req, res) {
    console.log('body :',req.body);

    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "hello I'm Ryan"
            }
          }
        ]
      }
    };
  
    res.status(200).send(responseBody);
  });


module.exports = router;