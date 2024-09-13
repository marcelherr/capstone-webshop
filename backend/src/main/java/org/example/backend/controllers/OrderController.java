package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.OrderDto;
import org.example.backend.models.Order;
import org.example.backend.services.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<Order> getOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public Order addOrder(@RequestBody OrderDto orderDto) {
        return orderService.saveOrder(orderDto);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }
}
