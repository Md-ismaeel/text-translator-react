import React, { useState, useEffect } from "react";
import axios from 'axios';

export const TextTranslatorCart = () => {

    const [text, setText] = useState('');
    const [data, setData] = useState('');
    const [language, setLanguage] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('hi');


    // console.log(language);

    /*************************************************************
    * get Method Api fetching to get each language options
    * ************************************************************/

    useEffect(() => {
        const selectOptionType = async () => {

            const options = {
                method: 'GET',
                url: 'https://text-translator2.p.rapidapi.com/getLanguages',
                headers: {
                    'X-RapidAPI-Key': '3d354d49f7msh0a665b556642d97p119884jsn2a364c9db072',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                // console.log(response.data.data.languages);
                setLanguage(response.data.data.languages)
            } catch (error) {
                console.error(error);
            }

        }

        if (language) {
            selectOptionType()
        }
    }, [language])


    /*************************************************************
     * post Method Api fetching to get translated text from backend
     * ************************************************************/

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
                    'X-RapidAPI-Key': '3d354d49f7msh0a665b556642d97p119884jsn2a364c9db072',
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
                    {language.map((language, index) => (
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
                    {language.map((language, index) => (
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
