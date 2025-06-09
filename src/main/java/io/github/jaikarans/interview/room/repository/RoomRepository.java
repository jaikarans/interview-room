package io.github.jaikarans.interview.room.repository;

import io.github.jaikarans.interview.room.model.Room;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface RoomRepository extends ReactiveCrudRepository<Room, String> {

}
