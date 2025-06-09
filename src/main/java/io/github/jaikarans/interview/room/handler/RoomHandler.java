package io.github.jaikarans.interview.room.handler;

import io.github.jaikarans.interview.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@Slf4j
@RequiredArgsConstructor
public class RoomHandler {

    private final RoomService roomService;

    /**
     * Handles the creation of a new room and returns a response containing the created room's details.
     *
     * @param request the server request containing the context and parameters for the room creation
     * @return a {@code Mono<ServerResponse>} representing the HTTP response containing the created room's details
     */
    public Mono<ServerResponse> createRoom(ServerRequest request) {
        return roomService.createRoom()
                .flatMap(room -> ServerResponse.created(URI.create(request.uri()+"/"+room.getId())).bodyValue(room));
    }

    public Mono<ServerResponse> getRoomById(ServerRequest request) {
        return roomService.getRoomById(request.pathVariable("id"))
                .flatMap(room -> ServerResponse.ok().bodyValue(room));
    }

}
