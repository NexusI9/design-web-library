export interface IMessageProcessorRequest {
  channel: string;
  attribute: string;
  value: string | number;
}

export const messageProcessor = {
  send: (request: IMessageProcessorRequest) =>
    window.postMessage(request, window.location.origin),

  listen: (channel: string, selector: string) => {
    window.addEventListener("message", (e) => {
      console.log(e);
    });
  },
};
