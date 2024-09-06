// pages/base64params.js
import { useEffect, useState } from 'react';

const Base64ParamsPage = () => {
  const [originalParams, setOriginalParams] = useState('');
  const [encodedParams, setEncodedParams] = useState('');
  const [decodedParams, setDecodedParams] = useState('');
  const [startAppUrl, setStartAppUrl] = useState('');

  // Base64 编码和解码函数
  const base64Encode = (str) => btoa(encodeURIComponent(str));
  const base64Decode = (str) => {
    try {
      return decodeURIComponent(atob(str));
    } catch (e) {
      console.error('Invalid Base64 string:', e);
      return '';
    }
  };

  const hexEncode = (str) => {
    return str
      .split('')
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  };
  
  const hexDecode = (hexStr) => {
    const hexArray = hexStr.match(/.{1,2}/g) || [];
    return hexArray
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join('');
  };

  useEffect(() => {
    // 获取当前页面的完整URL
    const currentUrl = new URL(window.location.href);

    // 获取 query 参数部分
    const queryParams = currentUrl.searchParams.toString();
    setOriginalParams(queryParams);
    console.log('queryParams',queryParams)

    // 对 query 参数部分进行 Base64 编码
    const encoded = hexEncode(queryParams);
    setEncodedParams(encoded);

    // 对 query 参数部分进行 Base64 编码
    const decode = hexDecode(encoded);
    setDecodedParams(decode);
    console.log('decode',decode)

    // 构建拼接后的 startapp URL
    const telegramUrl = `https://t.me/devin2077_bot/tgw_wc?startapp=${encoded}`;
    setStartAppUrl(telegramUrl);
  }, []); // 依赖为空数组，意味着只在初次渲染时运行一次

  return (
    <div>
      <h1>Base64 Encoder for URL Params with Telegram Redirect</h1>
      <p>
        <strong>Original Params:</strong> {originalParams}
      </p>
      <p>
        <strong>Base64 Encoded Params:</strong> {encodedParams}
      </p>
      <p>
        <strong>Base64 Decoded Params:</strong> {decodedParams}
      </p>
      <p>
        <strong>Telegram URL with Encoded Params:</strong>{' '}
        <a href={startAppUrl} target="_blank" rel="noopener noreferrer">
          {startAppUrl}
        </a>
      </p>
      <button
        onClick={() => window.open(startAppUrl, '_blank')}
        style={{ padding: '10px 20px', marginTop: '20px' }}
      >
        Open in Telegram
      </button>
    </div>
  );
};

export default Base64ParamsPage;