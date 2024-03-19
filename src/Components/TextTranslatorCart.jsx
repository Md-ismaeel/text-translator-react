import React, { useState, useEffect } from "react";
import axios from 'axios';

export const TextTranslatorCart = () => {
    const languageOptions = [
        { code: 'en', name: 'English' },
        { code: 'id', name: 'Indonesian' },
        { code: 'fr', name: 'French' },
        { code: 'es', name: 'Spanish' },
        { code: 'de', name: 'German' },
        { code: 'ar', name: 'Arabic' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'it', name: 'Italian' },
        { code: 'tr', name: 'Turkish' },
        { code: 'nl', name: 'Dutch' },
        { code: 'pl', name: 'Polish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'hi', name: 'Hindi' },
        { code: 'bn', name: 'Bengali' },
        { code: 'ta', name: 'Tamil' },
        { code: 'te', name: 'Telugu' },
        { code: 'gu', name: 'Gujarati' },
        { code: 'kn', name: 'Kannada' },
        { code: 'mr', name: 'Marathi' },
        { code: 'pa', name: 'Punjabi' },
        { code: 'or', name: 'Odia' },
        { code: 'ml', name: 'Malayalam' },
        { code: 'as', name: 'Assamese' },
        { code: 'mr', name: 'Marathi' },
        { code: 'ur', name: 'Urdu' },
        { code: 'kok', name: 'Konkani' },
        { code: 'bho', name: 'Bhojpuri' },
        { code: 'mai', name: 'Maithili' },
        { code: 'ne', name: 'Nepali' },
        { code: 'mni', name: 'Manipuri' },
        { code: 'sik', name: 'Sikkimese' },
        { code: 'doi', name: 'Dogri' },
        { code: 'kas', name: 'Kashmiri' },
        { code: 'san', name: 'Sanskrit' },
    ];

    const [text, setText] = useState('');
    const [data, setData] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en'); 
    const [targetLanguage, setTargetLanguage] = useState('hi');

    useEffect(() => {
        const translateText = async () => {
            const encodedParams = new URLSearchParams();
            encodedParams.set('source_language', sourceLanguage);
            encodedParams.set('target_language', targetLanguage);
            encodedParams.set('text', data);

            const options = {
                method: 'POST',
                url: 'https://text-translator2.p.rapidapi.com/translate',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '0edd3c5f5amsh76ef575b7cc6257p11e06bjsnff4359940055',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                },
                data: encodedParams,
            };

            try {
                const response = await axios.request(options);
                setText(response.data.data.translatedText);
            } catch (error) {
                console.error(error);
            }
        };

        if (data) {
            translateText();
        }
    }, [sourceLanguage, targetLanguage, data]);

    return (
        <div className="container">
            <div className="select-box">
                <label htmlFor="sourceLanguage">Source Language </label>
                <select
                    id="sourceLanguage"
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                >
                    {languageOptions.map((language, index) => (
                        <option key={index} value={language.code}>{language.name}</option>
                    ))}
                </select>
            </div>

            <div className="select-box">
                <label htmlFor="targetLanguage">Target Language </label>
                <select
                    id="targetLanguage"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                >
                    {languageOptions.map((language, index) => (
                        <option key={index} value={language.code}>{language.name}</option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                <input
                    name="data"
                    className="input-val"
                    placeholder="Enter text here"
                    onChange={(e) => setData(e.target.value)}
                />
            </div>

            <div>
                <input className="input-val" value={text} readOnly />
            </div>
        </div>
    );
};
