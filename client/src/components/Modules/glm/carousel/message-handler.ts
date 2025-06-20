import { moduleInit } from "./index";
import { MODULE_GLM_CHANNEL_CAROUSEL } from "../lib/constant";
import { messageProcessor } from "../lib/message-processor";

messageProcessor.listen(
  MODULE_GLM_CHANNEL_CAROUSEL, // channel
  ".glm-carousel-wrapper", // selector
  moduleInit, // callback
);
