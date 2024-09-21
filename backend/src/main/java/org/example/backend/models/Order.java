package org.example.backend.models;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@With
@Document("orders")
public record Order(
        String id,
        LocalDateTime orderDateTime,
        List<Product> products,
        double totalPrice) {
}
