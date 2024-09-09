package org.example.backend.products.dto;

import lombok.With;

@With
public record ProductDto(
        String name,
        double price,
        String description
) {
}
