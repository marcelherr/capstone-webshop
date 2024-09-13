package org.example.backend.dto;

import lombok.With;

import java.time.LocalDateTime;
import java.util.List;


@With
public record OrderDto(
        LocalDateTime orderDateTime,
        List<ProductDto> products
) {
}
