package io.github.jaikarans.interview.room;

import io.github.jaikarans.interview.room.handler.RoomHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RoomRouter {

    /**
     * Defines the routing for HTTP requests related to room operations, such as creating a new room
     * and retrieving a room by its identifier.
     *
     * @param handler an instance of {@code RoomHandler} that provides the logic for handling HTTP requests
     * @return a {@code RouterFunction<ServerResponse>} containing the defined routes for room operations
     */
    @Bean
    public RouterFunction<ServerResponse> route(RoomHandler handler) {
        return RouterFunctions.route()
                .POST("/rooms", handler::createRoom)
                .GET("/{id}", handler::serveRoomView)
                .build();
    }
}
