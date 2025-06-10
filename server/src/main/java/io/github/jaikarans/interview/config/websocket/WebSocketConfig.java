package io.github.jaikarans.interview.config.websocket;

import io.github.jaikarans.interview.webrtc.WebRtcHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Configuration
@Slf4j
public class WebSocketConfig {
//    @Bean
//    public HandlerMapping handlerMapping(
//            @Qualifier("WebRtcHandler") WebSocketHandler webRtcHandler,
//            @Qualifier("ChatHandler") WebSocketHandler chatHandler) {
//        Map<String, WebSocketHandler> map = new HashMap<>();
//
//        map.put("/ws/webrtc", webRtcHandler);
//        map.put("/ws/chat", chatHandler);
//
//        log.info("WebSocket handler mapping: {}", map);
//
//        return new SimpleUrlHandlerMapping(map, Ordered.HIGHEST_PRECEDENCE);
//    }

    @Bean
    public HandlerMapping handlerMapping(WebSocketHandler webRtcHandler) {
        Map<String, WebSocketHandler> map = new HashMap<>();

        map.put("/ws/webrtc", webRtcHandler);
//        map.put("/ws/chat", chatHandler);

        log.info("WebSocket handler mapping: {}", map);

        return new SimpleUrlHandlerMapping(map, Ordered.HIGHEST_PRECEDENCE);
    }
}
