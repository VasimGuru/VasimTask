import React, { useState, useEffect } from 'react';

const Download = ({ fileUrl }) => {
  const [progress, setProgress] = useState(0);
  const [remainingSize, setRemainingSize] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const downloadFile = async () => {
      const response = await fetch(fileUrl);
      const totalSize = response.headers.get('content-length');

      if (response.ok) {
        const reader = response.body.getReader();
        let downloadedSize = 0;
        let start = Date.now();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          downloadedSize += value.length;
          const currentProgress = Math.floor((downloadedSize / totalSize) * 100);
          const currentRemainingSize = totalSize - downloadedSize;
          const currentElapsedTime = (Date.now() - start) / 1000;
          const currentPercentage = currentProgress;

          setProgress(currentProgress);
          setRemainingSize(currentRemainingSize);
          setElapsedTime(currentElapsedTime);
          setPercentage(currentPercentage);
        }
      }
    };

    downloadFile();
  }, [fileUrl]);

  return (
    <div>
      <div>Downloading... {progress}%</div>
      <div>Remaining size: {remainingSize} bytes</div>
      <div>Elapsed time: {elapsedTime} seconds</div>
      <div>Percentage: {percentage}%</div>
    </div>
  );
};

export default Download;
