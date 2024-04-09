import React, { useState } from 'react';
import axios from 'axios';

const ChatComponentTest = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    // Make a request to the ChatGPT API with the user input
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input },
        ],
        model: "gpt-3.5-turbo"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
          'OpenAI-Organization': 'org-Zoq0Vo0ZOAvCp7XF7d7KYVfD'
        }
      }
    );

    // Update the conversation history with the response from ChatGPT
    setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);

    // Clear the input field
    setInput('');
  };

  return (
    <div class="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
      <div class="flex sm:flex-row flex-col gap-5 w-full">
        <div class="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                      border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
          <span class="min-w-max pr-2 border-r border-box-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>                                                                 
          </span>
          <input type="text" value={input} onChange={handleInputChange} name="" id="" placeholder="shortcut to import libraries" class="w-full py-3 outline-none bg-transparent"/>
          <button onClick={handleSendMessage} class={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                      after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                      bg-primary border-transparent relative after:bg-[#172554] hover:border-[#172554]
                      hover:after:opacity-100 hover:after:scale-[2.5] min-w-max text-white`}>
            <span class="hidden sm:flex relative z-[5]">Search</span>
            <span class="flex sm:hidden relative z-[5]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>                                      
            </span>            
          </button>        
        </div>
      </div>
    </div>
  );
};
export default ChatComponentTest;