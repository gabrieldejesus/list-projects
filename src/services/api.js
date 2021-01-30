import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;

// IOS com emulador: localhost
// IOS com dispositivo físico: IP da máquina

// Android com Emulador: localhost (utilizando o adb reverse: ``adb reverse tcp:3333 tcp:3333``)
// Android com Emulador: 10.0.2.2 (Android studio)
// Android com Emulador: 10.0.3.2 (Genymotion)
// Android com físico: IP da máquina
