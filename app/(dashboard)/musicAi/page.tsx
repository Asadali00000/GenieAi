"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import { whichCreditAtom } from '@/context/atom';
import { useSetRecoilState } from 'recoil';
import Loading from '@/ui/loading';

const MyComponent = () => {
  const [tone, setTone] = useState("");
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
	const setWhichPage=useSetRecoilState(whichCreditAtom);
	setWhichPage("Music(in secs)")
  const handleGenerateMusic = async () => {
    setLoading(true);
		setAudioSrc("");
    try {
      const response = await axios.get(`/api/music?tone=${tone}&duration=${duration}`);
      setAudioSrc(response.data.output);

    } catch (error) {
			console.error("Error generating music:", error);
    } finally {
			setTone("");
			setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Music Generator</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Tone:</label>
          <input
            type="text"
            value={tone}
            onChange={(e:any) => setTone(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duration (seconds):</label>
          <input
            type="number"
            value={duration}
            onChange={(e:any) => setDuration(Math.max(0,Math.min(8,Number(e.target.value))))}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleGenerateMusic}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
           <Loading/>
          ) : (
            "Generate Music"
          )}
        </button>
        {audioSrc && (
          <div className="mt-4">
            <audio ref={audioRef} src={audioSrc} />
            <button
              onClick={handlePlayPause}
              className="w-full bg-green-500 text-white py-2 rounded mt-2 hover:bg-green-600 transition-colors"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
