package io.github.jaikarans.interview.room.service;

import io.github.jaikarans.interview.room.model.Room;
import io.github.jaikarans.interview.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    /**
     * Generates a unique room identifier.
     *
     * @return a String containing an 11-character room ID in the format "xxx-xxx-xxx"
     *           where x is an alphanumeric character (e.g., "a5d-3d0-l9d")
     */
    private String generateRoomId() {
        return (UUID.randomUUID().toString().substring(0, 3) + "-" +
                UUID.randomUUID().toString().substring(0, 3) + "-" +
                UUID.randomUUID().toString().substring(0, 3));
    }

    public Mono<Room> createRoom() {
        Room newRoom = new Room();
        newRoom.setId(generateRoomId());
        newRoom.setCreatedAt(java.time.Instant.now());
        return roomRepository.save(newRoom);
    }

    public Mono<Room> getRoomById(String id) {
        return roomRepository.findById(id);
    }
}
