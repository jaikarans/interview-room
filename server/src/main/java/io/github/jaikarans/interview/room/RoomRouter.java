package io.github.jaikarans.interview.room;

import io.github.jaikarans.interview.room.handler.RoomHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RoomRouter {

    @Bean
    public RouterFunction<ServerResponse> route(RoomHandler handler) {
        return RouterFunctions.route()
                .POST("/rooms", handler::createRoom)
                .GET("/{id}", handler::serveRoomView)
                .build();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow all origins
        config.addAllowedOrigin("*");
        // Allow all methods (GET, POST, etc.)
        config.addAllowedMethod("*");
        // Allow all headers
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}