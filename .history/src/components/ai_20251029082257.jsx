import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Send } from "lucide-react";
// import { useLoaderData } from "react-router";

const Ai = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const data = useLoaderData();
  //   console.log(data);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://bazaar-track-server.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gemini",
            messages: newMessages,
          }),
        }
      );

      const data = await res.json();
      const reply = data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (err) {
      alert("AI থেকে উত্তর আনতে সমস্যা হয়েছে।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Chat with AI</h2>

      <div className="h-64 max-w-3xl mx-auto overflow-y-auto border rounded-lg p-4 mb-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-4 flex ${
              m.role === "user"
                ? "justify-end text-right"
                : "justify-start text-left"
            }`}
          >
            <div className="max-w-[80%]">
              {/* <strong className="block mb-1">
                {m.role === "user" ? "You" : " "}:
              </strong> */}
              <div
                className={`prose prose-sm max-w-none ${
                  m.role === "user" ? "" : ""
                } p-2 rounded-lg`}
              >
                <ReactMarkdown
                  children={m.content}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex max-w-3xl mx-auto gap-2">
        <textarea
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write something..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  );
};

export default Ai;
