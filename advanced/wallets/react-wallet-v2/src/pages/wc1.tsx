// pages/base64params.js
import { useEffect, useState } from 'react';

const Base64ParamsPage = () => {
  const [originalParams, setOriginalParams] = useState('');
  const [encodedParams, setEncodedParams] = useState('');
  const [decodedParams, setDecodedParams] = useState('');

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

  useEffect(() => {
    // 获取当前页面的完整URL
    const currentUrl = new URL(window.location.href);

    // 获取 query 参数部分
    const queryParams = currentUrl.searchParams.toString();
    setOriginalParams(queryParams);

    // 对 query 参数部分进行 Base64 编码
    const encoded = base64Encode(queryParams);
    setEncodedParams(encoded);

    // 对编码后的参数进行解码
    const decoded = base64Decode(encoded);
    setDecodedParams(decoded);


  }, []); // 依赖为空数组，意味着只在初次渲染时运行一次


  return (
    <div>
      <h1>Base64 Encoder and Decoder for URL Params</h1>
      <p>
        <strong>Original Params:</strong> {originalParams}
      </p>
      <p>
        <strong>Base64 Encoded Params:</strong> {encodedParams}
      </p>
      <p>
        <strong>Decoded Params:</strong> {decodedParams}
      </p>
      <button onClick={}></button>
    </div>
  );
};

export default Base64ParamsPage;