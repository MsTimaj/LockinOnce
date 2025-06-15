
const ChatLoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoadingIndicator;
