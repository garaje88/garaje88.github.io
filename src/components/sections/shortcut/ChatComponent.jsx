import React, { useState } from 'react';
import { createPayload, callChatGPTAPI } from '@utils/apiChatGpt';
import MessageComponent from './MessageComponent.jsx';
import Toast from '@components/shared/Toast.jsx';
import Spinner from '@components/shared/Spinner.jsx';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput('');
  }; 

  const handleSendMessage = async () => {
    try {
      
      if (!input.trim()) {
          throw new Error("Input is empty. Please provide some text.");
      }
      
      setLoading(true);

      const basePrompt = "Provide the information as a JSON string. The information should include keyboard shortcuts to " +
        input
      + " in different popular IDEs such as IntelliJ IDEA, Eclipse, Visual Studio Code, etc. Structure the JSON string as follows: [{ \"nameide\": \"IDE_NAME\", \"shortcuts\": [{ \"so\": \"Windows/Linux\", \"shortcut\": \"SHORTCUT\" }], \"note\": \"Any relevant note.\" }]";

      const messages = [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: basePrompt }
      ];

      const payload = createPayload(messages);
      const response = await callChatGPTAPI(payload);

      const contentResponse = response.data.choices[0].message.content;
      const newMessage = JSON.parse(contentResponse.replace(/```json\n|```|\n/g, ""));
      
      //const newMessage = JSON.parse("[\n    {\n        \"nameide\": \"IntelliJ IDEA\",\n        \"shortcuts\": [\n            { \"so\": \"Windows/Linux\", \"shortcut\": \"Alt + Enter\" },\n            { \"so\": \"macOS\", \"shortcut\": \"Option + Enter\" }\n        ],\n        \"note\": \"Pressing the shortcut will suggest imports for unresolved classNamees in your Java file.\"\n    },\n    {\n        \"nameide\": \"Eclipse\",\n        \"shortcuts\": [\n            { \"so\": \"Windows/Linux\", \"shortcut\": \"Ctrl + Shift + O\" },\n            { \"so\": \"macOS\", \"shortcut\": \"Cmd + Shift + O\" }\n        ],\n        \"note\": \"Using this shortcut will organize imports in your Java className.\"\n    },\n    {\n        \"nameide\": \"Visual Studio Code\",\n        \"shortcuts\": [\n            { \"so\": \"Windows/Linux\", \"shortcut\": \"Ctrl + Shift + I\" },\n            { \"so\": \"macOS\", \"shortcut\": \"Cmd + Shift + I\" }\n        ],\n        \"note\": \"Triggering this shortcut will organize imports in your Java file.\"\n    }\n]");
      setMessages(newMessage);	 
      
    } catch (error) {
      setToastMessage(error.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
      clearInput();
    }
  };

  return (
      <div className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12`}>   
       {loading && <Spinner />}
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 ">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
        </div>
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-primary to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
        lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">

          {showToast && <Toast message={toastMessage} type='error' />}  
          <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
            <div className="flex sm:flex-row flex-col gap-5 w-full">
              <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                            border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                <span className="min-w-max pr-2 border-r border-box-border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>                                                                 
                </span>
                <input type="text" required value={input} onChange={handleInputChange} name="" id="" placeholder="import libraries in a Java className" className="w-full py-3 outline-none bg-transparent"/>
                <button onClick={handleSendMessage} className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                            bg-primary border-transparent relative after:bg-[#172554] hover:border-[#172554]
                            hover:after:opacity-100 hover:after:scale-[2.5] min-w-max text-white`}>
                  <span className="hidden sm:flex relative z-[5]">Search</span>
                  <span className="flex sm:hidden relative z-[5]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>                                      
                  </span>            
                </button>        
              </div>
            </div>
          </div>

          {Array.isArray(messages) && messages.length > 0 && (
            <div className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 space-y-8 md:sapce-y-10`}>
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-heading-1 font-semibold text-2xl sm:text-3xl md:text-4xl">
                AI generated results
                </h1>
                <p className={`md:text-lg text-heading-3`}>
                  results are generated for the following IDEs
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {
                  messages.map((message, index) => (
                    <MessageComponent key={index} message={message} />
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
  );
};
export default ChatComponent;