const express = require('express');
const axios = require('axios');
const router = express.Router();

// 간단한 응답 라우트 정의
router.post('/hello', async (req, res) => {
    console.log('body :',req.body);
    const body = req.body;
    const question = body.userRequest.utterance;

    answer = await getAnswer(question);

    let parsedAnswer = await getParsedAnswer(answer)

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: parsedAnswer
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
    const url = `http://company.i-bricks.co.kr:8880/_keit/_api/legal`
    
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


  const getParsedAnswer = async(answer) => {
    
    let parsedAnswer =``;

    for(result of answer.results){

        const chapter = result.chapter;
        const article = result.article;
        const title = result.title;
        const contents = result.contents;

        parsedAnswer += `
        <${chapter} ${article}>\n\n
        ${title}\n
        ${contents}\n
        `;
        
    }
    console.log('parsedAnswer :',parsedAnswer);
    

    return parsedAnswer;
  }

module.exports = router;