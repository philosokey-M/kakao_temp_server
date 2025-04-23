const axios = require('axios');

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

module.exports = { getAnswer };