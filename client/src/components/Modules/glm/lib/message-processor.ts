export interface IMessageProcessorRequest {
  channel: string;
  attribute: string;
  value: string | number;
}

export const messageProcessor = {
  send: (frame: HTMLIFrameElement, request: IMessageProcessorRequest) =>
    frame.contentWindow?.postMessage(request, "*"),

  listen: (channel: string, selector: string) => {
    window.addEventListener("message", (e) => {
      const { data } = e;
      if (channel == data.channel) {
        // update data attributes of each items
        document.querySelectorAll(selector).forEach((item) => {
          item.setAttribute(data.attribute, data.value);
        });
      }
    });
  },
};
