package io.github.jaikarans.interview.websocket;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class AppWebSocketHandler implements WebSocketHandler {

    private final WebSocketMessageRouter router;

    @Override
    public Mono<Void> handle(@NonNull WebSocketSession session) {
        Flux<String> input = session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .doOnNext(msg -> router.route(msg, session)); // Route each message

        // Optional output stream (not needed if you send manually via session.send)
        return input.then();
    }

}
