import getUserFromToken from "./getUser";
import api from "./api";
export const handleOrderCreationAndGenerateMessage = (formData) => {
  const {
    bouquets,
    isSelfRecipient,
    anonymously,
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    deliveryZone,
    address,
    comment,
  } = formData;
  const bouquetLines = bouquets.map((b) => {
    return `${b.name}\nКоличество: ${b.quantity}\nРазмер: ${b.size}\nЦена: ${b.total} ₸\n`;
  });

  const totalSum = bouquets.reduce((sum, b) => sum + b.total, 0);

  let message = `🧺 Новый заказ\n\n`;
  message += `🌸 Букеты:\n${bouquetLines.join("\n")}`;
  message += `\n💰 Общая сумма: ${totalSum} ₸`;

  message += `\n\n👤 Получатель: ${
    isSelfRecipient ? "Покупатель" : recipientName || "Не указано"
  }`;

  if (!isSelfRecipient) {
    message += `\n📞 Тел. получателя: ${recipientPhone || "Не указано"}`;
  }

  message += `\n\n🧑 Покупатель: ${senderName || "Не указано"}`;
  message += `\n📞 Тел. покупателя: ${senderPhone || "Не указано"}`;
  message += `\n📦 Доставка: ${deliveryZone || "Не выбрано"}`;
  message += `\n📍 Адрес: ${address || "Не указано"}`;

  if (anonymously) {
    message += `\n🙈 Анонимно`;
  }

  if (comment) {
    message += `\n📝 Комментарий: ${comment}`;
  }

  const user = getUserFromToken();
  if (user) {
    api
      .post("/order/creatOrder", {
        formData,
      })
      .catch((err) => {});
  }
  return message;
};

export const generateMessagePhoneContact = (phone) => {
  let message = `🧺 Заявка на контакт\n\n`;
  message += `\nНомер телефона: ${phone}`;
  return message;
};

export const sendTelegramMessage = async (message) => {
  try {
    await fetch("/api/basket/senBasketInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    });
  } catch {}
};
