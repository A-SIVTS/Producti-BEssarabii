import axios from "axios";

export const sendMessageWithTg = (data) => {
  const TOKEN = "5430087725:AAFFYzCPafXTXSYxdYNLdTpTSpKGfsEAczo";
  const CHAT_ID = "-1001875835550";
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const formData = JSON.parse(data);
  const userName = formData.userName;
  const userPhone = formData.userPhone;
  const userSurname = formData.userSurname;
  const userAdress = formData.userAdress;
  const products = formData.products.map((product) => product.title);
  console.log(userName);

  let message = `Заявка с сайта!\n`;
  message += `Имя: ${userName}\n`;
  message += `Телефон: ${userPhone}\n`;
  message += `Фамилия: ${userSurname}\n`;
  message += `Адресс: ${userAdress}\n`;
  message += `Заказ: ${products}\n`;
  console.log(message);

  axios.post(URL_API, {
    chat_id: CHAT_ID,
    parse_mod: "html",
    text: message,
  });
};
