import React, { useState } from 'react';
import { Icons } from './Icon';
import { generateImage } from '../services/geminiService';

export const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const images = await generateImage(prompt, aspectRatio);
      setGeneratedImages(prev => [...images, ...prev]);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto p-6 md:p-12">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Image Studio</h1>
          <p className="text-slate-400">Create stunning visuals with Gemini 2.5 Flash Image.</p>
        </div>

        {/* Controls */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="space-y-3">
             <label className="text-sm font-medium text-slate-300">Prompt</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="A futuristic city with flying cars at sunset, cyberpunk style..."
               className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none h-32"
             />
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 block">Aspect Ratio</label>
              <div className="flex gap-3">
                {[
                  { id: "1:1", label: "Square (1:1)" },
                  { id: "16:9", label: "Landscape (16:9)" },
                  { id: "9:16", label: "Portrait (9:16)" }
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      aspectRatio === ratio.id 
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                 isGenerating || !prompt
                 ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95'
              }`}
            >
              {isGenerating ? <Icons.Refresh className="animate-spin w-5 h-5" /> : <Icons.Sparkles className="w-5 h-5" />}
              {isGenerating ? 'Dreaming...' : 'Generate'}
            </button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {generatedImages.map((src, idx) => (
             <div key={idx} className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-square shadow-lg">
                <img src={src} alt={`Generated ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end justify-between">
                   <a 
                     href={src} 
                     download={`nebula-generated-${Date.now()}.png`}
                     className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white transition-colors"
                     title="Download"
                   >
                     <Icons.Download className="w-5 h-5" />
                   </a>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
