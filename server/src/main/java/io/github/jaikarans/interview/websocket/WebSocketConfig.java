package io.github.jaikarans.interview.websocket;

import io.github.jaikarans.interview.websocket.AppWebSocketHandler;
import lombok.extern.slf4j.Slf4j;
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

    @Bean
    public HandlerMapping handlerMapping(AppWebSocketHandler appWebSocketHandler) {
        Map<String, WebSocketHandler> map = new HashMap<>();

        map.put("/ws", appWebSocketHandler);

        log.info("WebSocket handler mapping: {}", map);

        return new SimpleUrlHandlerMapping(map, Ordered.HIGHEST_PRECEDENCE);
    }
}
