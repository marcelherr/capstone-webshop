package org.example.backend.products.models;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("products")

public record Product(
        String id,
        String name,
        double price,
        String description
) {
}
