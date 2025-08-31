package io.github.jaikarans.interview.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
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
        return session.receive()
            .flatMap(msg -> {
                try {
                    return router.route(msg, session);  // returns Mono<WebSocketMessage>
                } catch (Exception e) {
                    return Mono.just(session.textMessage("Error: " + e.getMessage()));
                }
            })
            .then()
            .doFinally(signalType -> {
                log.info("Closing session {} due to {}", session.getId(), signalType);
                router.removeSession(session);
            })
            .then();

    }

}
