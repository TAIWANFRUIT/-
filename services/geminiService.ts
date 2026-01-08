
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMealRecommendation(userInput: string, menu: Product[]): Promise<string> {
  const menuContext = menu.map(item => `${item.name} ($${item.price}): ${item.description}`).join('\n');
  
  const prompt = `
    你是一位「帝國雞」專業點餐服務人員。
    以下是我們的菜單內容：
    ${menuContext}

    用戶說： "${userInput}"

    請根據用戶的需求，從菜單中挑選 1-3 個最適合的品項推薦給他們。
    你的回答應該親切、專業，並簡短說明推薦理由。
    如果用戶沒有具體需求，請推薦我們的「招牌炸雞」或「帝國秘製滷肉飯便當」。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "很抱歉，我現在無法給予建議，請直接瀏覽我們的菜單。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 助手目前忙碌中，請稍後再試。";
  }
}
