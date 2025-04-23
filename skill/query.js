const express = require('express');
const axios = require('axios');
const router = express.Router();
const { encodeData, decodeData } = require('../utils/compress');
const { setCache, getCache } = require('../utils/cache');
const { nanoid } = require('nanoid'); // 고유 ID 생성
const { getAnswer } = require('../utils/call'); 


router.post('/test', async (req, res) => {

    let question = req.body.question

    let params = null;

    const key = nanoid(8); // 예: 'aB3eT91k'
    setCache(key, question);

    const url = `http://localhost:3000/api/skill/query/view?key=${key}`; // company.i-bricks.co.kr:8880
    res.status(200).send(url);
})

/** 
 *  출처(Retreiver 청크)를 보여주는 html 반환 
 */
router.get('/view', async (req, res) => {
    const key = req.query.key; // URL에서 key 추출
    const question = getCache(key); // 캐시에서 질문 가져오기

    if (!question) {
        return res.status(404).send('Question not found in cache.');
    }

    answer = await getAnswer(question);

    let ref_html = '';

    for(result of answer.results) {
        ref_html += `
        <p>
            <span><strong>[ ${result.chapter} ${result.section} ]</strong></span> <br>
            <span><strong>${result.title} </strong></span><br>
            <span>${result.contents} </span>
        </p>
        `    
    }


    let html = `
    <html>
        <head>
            <title>IB LLM TEST</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <h1>답변 참고 사항</h1>
            <div id="answer">${ref_html}</div>
    </html>

    `

    res.status(200).send(html);
    
})

/** 
 *  Retriever 결과를 포함한 LLM 응답 요청
 */
router.post('/answer', async (req, res) => {

    let question = req.body.userRequest.utterance
    // let question = req.body.question


    const key = nanoid(8); // 예: 'aB3eT91k'
    setCache(key, question);

    const dns = `https://port-0-kakao-temp-server-m9rsf6jkb4b1a214.sel4.cloudtype.app` // localhost:3000
    const url = `${dns}/api/skill/query/view?key=${key}`; // company.i-bricks.co.kr:8880

    let tmp_text = `
        참고: ${url} \n\n

        요약
        - test1
        - test2

        결론
        - 아직 keit서버에 직접 작업한게 아니라 따로 호스팅중인 서버다보니 LLM 답변을 받는 과정은 생략했습니다.\n
        경로 클릭시 문서 내용은 보실수 있습니다.
    `;
    
    res.status(200).send(tmp_text);
})


module.exports = router;