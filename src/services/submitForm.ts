import { ContactFormType } from "../../types/types";

export const submitFormToNetlify = (contactForm: ContactFormType) => {
  let formPayload: Array<string> = [];
  for (let key in contactForm) {
    if (key === "formName") {
      formPayload.push(`form-name=${contactForm[key]}`);
    } else {
      formPayload.push(`${key}=${encodeURIComponent(contactForm[key])}`);
    }
  }
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `${formPayload.join("&")}`,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => alert(error));
};
