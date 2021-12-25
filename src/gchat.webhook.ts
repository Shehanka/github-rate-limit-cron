import * as Axios from "axios";
import { appConfig } from "./configs";

export function callGChatWebhook(message: string) {
  Axios.default
    .post(
      appConfig.googleChatWebhookURL,
      {
        text: message,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    )
    .then((res) => console.log(res.data))
    .catch((e) =>
      console.error(`GChat Webhook Call Error : `, e.response.data, e.response.data.error.details[0].fieldViolations)
    );
}
