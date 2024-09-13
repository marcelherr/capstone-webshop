package org.example.backend.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.OrderDto;
import org.example.backend.models.Order;
import org.example.backend.models.OrderNotFoundException;
import org.example.backend.models.Product;
import org.example.backend.repositories.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final IdService idService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order saveOrder(OrderDto orderDto) {

        List<Product> products = orderDto.products().stream()
                .map(productDto -> new Product(
                        idService.randomId(),
                        productDto.name(),
                        productDto.price(),
                        productDto.description()
                ))
                .collect(Collectors.toList());

        Order orderToSave = new Order(
                idService.randomId(),
                orderDto.orderDateTime(),
                products
        );
        return orderRepository.save(orderToSave);
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("No order found with id: " + id));
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
