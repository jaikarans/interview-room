package io.github.jaikarans.interview.roommanager;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jaikarans.interview.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomManager {

    private final RoomService roomService;

    // roomId -> sessions
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();

    // sessionId -> roomId
    private final Map<String, String> sessionToRoom = new ConcurrentHashMap<>();

    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * Add websocket Session to a room
     */
    public Mono<Void> addToRoom(WebSocketMessage webSocketMessage, WebSocketSession session) throws JsonProcessingException {
        String payload = webSocketMessage.getPayloadAsText();
        JsonNode node = mapper.readTree(payload);

        String roomId = node.get("roomId").asText();

        rooms.computeIfAbsent(roomId, k -> new CopyOnWriteArraySet<>()).add(session);
        sessionToRoom.put(session.getId(), roomId);

        Set<WebSocketSession> sessions = rooms.get(roomId);
        final int roomPopulation = sessions.size();

        // Notify all sessions in the room
        return Flux.fromIterable(sessions)
                .flatMap(s -> s.send(
                                Mono.just(s.textMessage(
                                        "{\"type\":\"roomPopulation\", \"msg\": \"" + (roomPopulation - 1) + " people in meeting\"}"
                                )))
                        .onErrorResume(e -> {
                            log.error("Failed to send message to session {}: {}", s.getId(), e.getMessage());
                            return Mono.empty();
                        }))
                .then();
    }

    /**
     * Remove a websocket session when it disconnects
     */
    public void removeSession(WebSocketSession session) {
        String roomId = sessionToRoom.remove(session.getId());

        if (roomId != null) {
            Set<WebSocketSession> sessions = rooms.get(roomId);
            if (sessions != null) {
                sessions.remove(session);
                int roomPopulation = sessions.size();
                log.info("Removed session {} from room {}", session.getId(), roomId);
                Flux.fromIterable(sessions)
                        .flatMap(s -> s.send(Mono.just(
                                s.textMessage("{\"type\":\"roomPopulation\", \"msg\": \"" + (roomPopulation - 1) + " people in meeting\"}")
                        )).onErrorResume(e -> {
                            log.error("Failed to send message to session {}: {}", s.getId(), e.getMessage());
                            return Mono.empty();
                        }))
                        .subscribe();
            }
        } else {
            log.warn("Tried to remove session {} but it was not in any room", session.getId());
        }
    }


    /**
     * Check if a room is empty
     */
    public Mono<Boolean> isRoomEmpty(String roomId) {
        return Mono.just(!rooms.containsKey(roomId));
    }
}
