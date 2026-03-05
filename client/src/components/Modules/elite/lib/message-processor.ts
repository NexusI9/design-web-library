export interface IMessageProcessorRequest {
  channel: string;
  attribute: string;
  value: string | number;
}

export const messageProcessor = {
  send: (frame: HTMLIFrameElement, request: IMessageProcessorRequest) =>
    frame.contentWindow?.postMessage(request, "*"),

  listen: (channel: string, selector: string, callback?: () => void) => {
    window.addEventListener("message", (e) => {
      const { data } = e;
      if (channel == data.channel) {
        document.querySelectorAll(selector).forEach((item) => {
          // update data attributes of each frames
          item.setAttribute(data.attribute, data.value);
          // reload target frame in iframe
          if (callback) callback();
        });
      }
    });
  },
};
