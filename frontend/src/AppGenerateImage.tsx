import React, { useState } from "react";
import axios from "axios";

interface Data {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

const AppGenerateImage: React.FC = () => {
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setImagePrompt(event.target.value);
  };

  const generateImage = async () => {
    if (!imagePrompt) {
      alert("Please enter a prompt.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/falai/generate-image",
        {
          prompt: imagePrompt,
        }
      );
      setData(response.data[0]);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false); // Đảm bảo set lại trạng thái loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        App Generate Image
      </h1>
      <div className="w-full max-w-lg mb-6">
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Mô tả
        </label>
        <textarea
          id="description"
          value={imagePrompt}
          onChange={handlePromptChange}
          placeholder="Nhập mô tả bức ảnh bạn muốn tạo. Càng chi tiết thì độ chính xác càng cao."
          className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          rows={5}
        ></textarea>
      </div>
      <div className="w-full max-w-lg mb-6">
        <button
          onClick={generateImage}
          disabled={isLoading}
          className={`w-full py-3 ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400`}
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      {data && data.url ? (
        <div
          className="p-4 bg-white shadow-lg rounded-lg flex justify-center items-center"
          style={{
            width: `${data.width}px`,
            height: `${data.height}px`,
          }}
        >
          <img
            src={data.url}
            alt="Generated from prompt"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="w-[1024px] h-[768px] bg-gray-300 rounded-lg flex justify-center items-center text-gray-500">
          No Image
        </div>
      )}
    </div>
  );
};

export default AppGenerateImage;
