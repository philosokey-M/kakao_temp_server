const express = require('express');
const axios = require('axios');
const router = express.Router();

// 간단한 응답 라우트 정의
router.post('/hello', async (req, res) => {
    console.log('body :',req.body);
    const body = req.body;
    const question = body.userRequest.utterance;

    answer = await getAnswer(question);

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: answer
                    }
                }
            ]
        }
    };
    

    res.status(200).send(responseBody);
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



  const getAnswer = async(question) => {
    // RAG API URL - 법령
    const url = `http://192.168.0.42:8880/_keit/_api/legal`
    
    // body
    const data={
        question: question,
        size:3
    }
    
    let response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log('response.data :',response.data);
    
    return response.data;

  }
module.exports = router;