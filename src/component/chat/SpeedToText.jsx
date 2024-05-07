import React, { useState, useEffect, useRef } from 'react';
import { IoIosMicOff, IoIosMic } from 'react-icons/io';

const SpeechToText = (props) => {
  const [transcription, setTranscription] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const last = event.results.length - 1;
        setTranscription(event.results[last][0].transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    } else {
      console.error('Browser do not support Web Speech API.');
    }
  }, []);

  useEffect(() => {
    props.updateInput(transcription);
  }, [transcription]);

  const toggleListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    } else if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div onClick={toggleListening}>
      {!isListening ? (
        <IoIosMicOff color="light blue" size={30} />
      ) : (
        <IoIosMic color="light blue" size={30} />
      )}
    </div>
  );
};

export default SpeechToText;
