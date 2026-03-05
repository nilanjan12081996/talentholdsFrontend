'use client';

import React, { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";

const Import = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) setFile(selectedFile);
  };

  const handleInputChange = (e) => handleFileChange(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeFile = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ background: 'var(--bg-main)' }}>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-yellow-200 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 rounded-[24px] shadow-xl w-full max-w-[600px] p-12 flex flex-col items-center text-center relative" style={{ background: 'var(--bg-card)' }}>
        <div className="text-center">
          <h1 className="text-[32px] font-bold mb-4 font-['Poppins']" style={{ color: 'var(--text-primary)' }}>
            Import
          </h1>
        </div>

        <form className="w-full space-y-6 text-left">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Add candidates as CSV *
            </label>
            <div className="flex items-center justify-center">
              <div
                className="w-full p-0 rounded-2xl"
                style={{ background: 'var(--bg-card)' }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div
                  className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:border-[#8624F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                  onClick={() => inputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  {!file ? (
                    <div className="text-center">
                      <div className="flex justify-center items-center">
                        <BsUpload className="text-3xl mb-4" style={{ color: 'var(--text-secondary)' }} />
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Click to upload file here or{" "}
                        <span className="text-[#8624F0] font-medium">Browse</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-green-600 dark:text-green-400 font-medium break-all">
                        {file.name}
                      </p>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove File
                      </button>
                    </div>
                  )}
                </div>

                {file && (
                  <button
                    type="button"
                    className="mt-4 w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                    onClick={() => alert("File Ready to Upload")}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Current form link (optional)
            </label>
            <input
              type="text"
              placeholder=""
              className="w-full h-[50px] px-4 rounded-[8px] outline-none focus:ring-2 focus:ring-[#761ed3] transition-all"
              style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            />
          </div>

          <button
            type="submit"
            className="w-full h-[50px] bg-[#210043] dark:bg-[#6d28d9] text-white rounded-[8px] font-semibold hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Import;