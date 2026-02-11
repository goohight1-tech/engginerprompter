
import React, { useState } from 'react';
import { generateOptimizedPrompt } from './services/geminiService';
import { PromptResponse, AppStatus } from './types';

// Components
const Navbar = () => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Prompt Master
        </span>
      </div>
      <div className="hidden md:block text-sm text-slate-500 font-medium">
        Biến ý tưởng thành Prompt chuyên nghiệp
      </div>
    </div>
  </nav>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 focus-ring"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Đã chép
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Sao chép
        </>
      )}
    </button>
  );
};

export default function App() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<PromptResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === AppStatus.LOADING) return;

    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const data = await generateOptimizedPrompt(input);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi khi tối ưu prompt. Vui lòng thử lại sau.');
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Trạm Kỹ Nghệ <span className="text-indigo-600">Prompt</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nâng cấp ý tưởng của bạn thành những câu lệnh AI sắc bén, giúp khai thác tối đa sức mạnh của Gemini, GPT và các mô hình ngôn ngữ lớn khác.
          </p>
        </header>

        {/* Input Form */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 mb-16 card-hover">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="prompt-input" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Mô tả ý tưởng hoặc nhiệm vụ của bạn
              </label>
              <textarea
                id="prompt-input"
                className="w-full min-h-[160px] p-5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 text-lg leading-relaxed shadow-sm"
                placeholder="Ví dụ: Tôi muốn tạo một kịch bản video ngắn về du lịch Đà Lạt dành cho Gen Z..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={status === AppStatus.LOADING || !input.trim()}
              className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all flex items-center justify-center gap-3 shadow-lg ${
                status === AppStatus.LOADING
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 active:scale-[0.98]'
              }`}
            >
              {status === AppStatus.LOADING ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang thiết kế Prompt...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Tối ưu ngay lập tức
                </>
              )}
            </button>
          </form>
        </section>

        {/* Results Section */}
        {error && (
          <div className="p-5 mb-10 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Goal Analysis */}
            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-20 h-20 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                 </svg>
               </div>
              <h3 className="text-indigo-900 font-bold text-xl mb-4 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Phân tích chiến lược
              </h3>
              <p className="text-indigo-800 leading-relaxed text-lg italic relative z-10">
                "{result.analysis}"
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Concise Prompt */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm card-hover">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-sm font-black">01</span>
                    Bản rút gọn (Concise)
                  </h3>
                  <CopyButton text={result.concisePrompt} />
                </div>
                <div className="flex-1 bg-slate-50 rounded-2xl p-6 text-[15px] text-slate-700 font-mono whitespace-pre-wrap leading-relaxed overflow-auto border border-slate-100 max-h-[400px]">
                  {result.concisePrompt}
                </div>
              </div>

              {/* Deep Prompt */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm card-hover">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black">02</span>
                    Bản chuyên sâu (Deep)
                  </h3>
                  <CopyButton text={result.deepPrompt} />
                </div>
                <div className="flex-1 bg-slate-50 rounded-2xl p-6 text-[15px] text-slate-700 font-mono whitespace-pre-wrap leading-relaxed overflow-auto border border-slate-100 max-h-[400px]">
                  {result.deepPrompt}
                </div>
              </div>
            </div>

            {/* Clarifying Questions */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-8">
              <h3 className="text-amber-900 font-bold text-xl mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Câu hỏi tư vấn bổ sung
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {result.clarifyingQuestions.map((q, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-amber-100 shadow-sm items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <p className="text-amber-900 text-[15px] font-medium leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-900">AI Prompt Master</span>
              </div>
              <p className="text-sm text-slate-500">
                Nâng tầm sự tương tác giữa con người và máy móc qua nghệ thuật đặt câu lệnh.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">Tài liệu</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Ví dụ</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Hỗ trợ</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            &copy; 2024 AI Prompt Master. Built with precision and care.
          </div>
        </div>
      </footer>
    </div>
  );
}
