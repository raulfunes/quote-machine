import { useEffect } from "react";
import { useState } from "react";
import "./Quotes.css";

export function Quote() {
  const [change, setChange] = useState([true]);
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const URL = "https://api.quotable.io/random";

  const fetchQuote = () => {
    fetch(URL).then((respuesta) =>
      respuesta.json().then((json) => {
        setQuotes([...quotes, { text: json.content, author: json.author }]);
      })
    );
  };

  useEffect(() => {
    let ignore = false;

    fetchQuote();

    return () => {
      ignore = true;
    };
  }, change);

  const handleClick = () => {
    setQuotes([...quotes]);
    setChange([!change[0]]);
    setIndex(quotes.length);
  };

  const handleClickAnterior = () => {
    setIndex(index - 1);
  };
  const handleClickSiguiente = () => {
    setIndex(index + 1);
  };
  return (
    <div id="quote-box">
      <p id="author">{quotes[index] ? quotes[index].author : ""}</p>
      <p id="text">{quotes[index] ? quotes[index].text : ""}</p>
      <div className="buttons">
        <a
          id="tweet-quote"
          href={
            quotes[index]
              ? "https://twitter.com/intent/tweet?text=" + quotes[index].text
              : "https://twitter.com/intent/tweet?"
          }
          target="_blank"
        >
          Twitter
        </a>
        <div>
          <button onClick={handleClickAnterior} disabled={!(index > 0)}>
            Anterior
          </button>
          <button
            onClick={handleClickSiguiente}
            disabled={!(index < quotes.length - 1)}
          >
            Siguiente
          </button>
          <button id="new-quote" onClick={handleClick}>
            Nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
