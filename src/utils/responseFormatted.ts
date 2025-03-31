// Функция для обработки ответа от OpenAI
const formatResponse = (responseText: string) => {
  // Заменяем маркеры @code@ на <pre><code>...</code></pre>
  responseText = responseText.replace(
    /@code@([\s\S]*?)@end@/g,
    (match, code) => {
      return `<pre><code>${code}</code></pre>`;
    }
  );

  // Заменяем маркеры @list@ на <ul><li>...</li></ul>
  responseText = responseText.replace(
    /@list@([\s\S]*?)@end@/g,
    (match, list) => {
      const listItems = list
        .split("\n")
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ul>${listItems}</ul>`;
    }
  );

  return responseText;
};
