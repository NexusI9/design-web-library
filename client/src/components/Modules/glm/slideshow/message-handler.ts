import { MODULE_GLM_CHANNEL_SLIDESHOW } from "../lib/constant";
import { messageProcessor } from "../lib/message-processor";
import { moduleInit } from "./index";

messageProcessor.listen(
  MODULE_GLM_CHANNEL_SLIDESHOW, // channel
  ".glm-slideshow", // selector
  moduleInit, // callback
);
