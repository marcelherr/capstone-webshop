package org.example.backend.dto;

import lombok.With;

@With
public record ProductDto(
        String name,
        double price,
        String description
) {
}
