export const recognition = new SpeechRecognition();

recognition.addEventListener("result", (event) => {
    console.log(event)
    const color = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${color}.`;
    bg.style.backgroundColor = color;
  });

  recognition.start()