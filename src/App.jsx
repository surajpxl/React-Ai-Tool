import React from 'react'
import { useState } from 'react'
import { URL } from './constants'
import Answer from './components/Answers'

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(undefined)

  const askQuestion = async () => {
    if (!question.trim()) return;
  
    const payload = {
      "contents": [{
        "parts": [{ "text": question }]
      }]
    };
  
    try {
      let response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
  
      response = await response.json();
  
      let dataString = response.candidates[0].content.parts[0].text;
      dataString = dataString.split("* ").map(item => item.trim());
  
      setResult(dataString);
      console.log(dataString);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
    
  };
  
  return (
    <div className='grid grid-cols-5 h-screen text-center'>

      <div className='col-span-1 bg bg-zinc-800'>
      </div>

      <div className='col-span-4 p-10'>
        <div className='container h-110 overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className='text-zinc-300'>
            <ul>
              {/*  {result} */}
              {
                result && result.map((item, index) => (
                  <li key={index} className='text-left p-1'> <Answer ans={item} totalResult={result.length} index={index} /></li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' placeholder='Ask me anything' />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
