    async function translateText() {
      const sourceLang = document.getElementById("sourceLang").value;
      const targetLang = document.getElementById("targetLang").value;
      const inputText = document.getElementById("inputText").value.trim();
      const outputArea = document.getElementById("outputArea");

      if (!inputText) {
        alert("請輸入要翻譯的文字！");
        return;
      }

      outputArea.textContent = "翻譯中...";

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(inputText)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          const translatedText = data[0].map(item => item[0]).join('');
          outputArea.textContent = translatedText;
        } else {
          outputArea.textContent = "⚠️ 翻譯失敗：無效回應格式。";
        }

      } catch (error) {
        outputArea.textContent = "⚠️ 錯誤：" + error.message;
      }
    }

    function swapLanguages() {
      const sourceSelect = document.getElementById("sourceLang");
      const targetSelect = document.getElementById("targetLang");
      const temp = sourceSelect.value;
      sourceSelect.value = targetSelect.value;
      targetSelect.value = temp;
    }
