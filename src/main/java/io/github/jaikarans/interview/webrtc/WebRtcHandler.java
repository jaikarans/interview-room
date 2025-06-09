package io.github.jaikarans.interview.webrtc;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class WebRtcHandler implements WebSocketHandler {

    @Override
    public Mono<Void> handle(@NonNull WebSocketSession session) {
        return Mono.empty();
    }
}
