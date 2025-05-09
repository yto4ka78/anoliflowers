export const validateFormData = (formData) => {
  const {
    bouquets,
    isSelfRecipient,
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    deliveryZone,
    address,
  } = formData;

  const errors = [];
  if (!bouquets || bouquets.length === 0)
    errors.push("Вы не добавили ни одного букета");
  if (!senderName.trim()) errors.push("Укажите имя покупателя");
  if (!senderPhone.trim()) errors.push("Укажите телефон покупателя");

  if (!isSelfRecipient) {
    if (!recipientName.trim()) errors.push("Укажите имя получателя");
    if (!recipientPhone.trim()) errors.push("Укажите телефон получателя");
  }

  if (!deliveryZone) errors.push("Выберите зону доставки");

  if (!address.trim()) errors.push("Укажите адрес доставки");
  if (errors.length > 0) {
    return errors;
  } else {
    return true;
  }
};
