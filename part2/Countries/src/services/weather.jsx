import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getForCapital = (capital, apiKey) => {
  const request = axios.get(
    `${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`
  );
  return request.then(response => response.data);
};

export default { getForCapital };