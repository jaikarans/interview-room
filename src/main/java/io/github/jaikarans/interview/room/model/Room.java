package io.github.jaikarans.interview.room.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("rooms")
public class Room implements Persistable<String> {
    @Id
    private String id; // room id format xxx-xxx-xxx
    private Instant createdAt;

    /**
     * Implementation is crucial for R2DBC's save() operation as it determines whether
     * to perform an INSERT or UPDATE operation in the database. When true is returned,
     * R2DBC will perform an INSERT; otherwise, it will perform an UPDATE.
     *
     * @return {@code true} if the entity should be inserted as a new record,
     *         {@code false} if it should update an existing record
     * @see org.springframework.data.domain.Persistable#isNew()
     */
    @Override
    public boolean isNew() {
        return true;
    }
}
