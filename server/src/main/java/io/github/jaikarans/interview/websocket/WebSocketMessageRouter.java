package io.github.jaikarans.interview.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jaikarans.interview.roommanager.RoomManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;


@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketMessageRouter {

    private final RoomManager roomManager;

    public Mono<Void> route(WebSocketMessage webSocketMessage, WebSocketSession session) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String payload = webSocketMessage.getPayloadAsText();
        JsonNode node = mapper.readTree(payload);
        String type = node.get("type").asText();

        switch (type) {
            case "enter":
                return roomManager.addToRoom(webSocketMessage, session);
//            case "offer", "answer":
////                return roomManager.broadCastWebRtcSignal(message, session);
//            case "chat":
//                break;
//            case "code":
//                break;
//            case "whiteboard":
//                break;
//            case "leave":
//                break;
//
        }

        return Mono.empty();
    }
    public void removeSession(WebSocketSession session) {
        roomManager.removeSession(session);
    }

}
