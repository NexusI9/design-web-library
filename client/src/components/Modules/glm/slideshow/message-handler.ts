import { MODULE_GLM_CHANNEL_SLIDESHOW } from "../lib/constant";
import { messageProcessor } from "../lib/message-processor";

messageProcessor.listen(MODULE_GLM_CHANNEL_SLIDESHOW, ".glm-slideshow");
