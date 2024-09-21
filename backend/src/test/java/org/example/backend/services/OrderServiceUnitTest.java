package org.example.backend.services;

import org.example.backend.dto.OrderDto;
import org.example.backend.dto.ProductDto;
import org.example.backend.models.Order;
import org.example.backend.models.OrderNotFoundException;
import org.example.backend.models.Product;
import org.example.backend.repositories.OrderRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class OrderServiceUnitTest {

    private final OrderRepository orderRepository = mock(OrderRepository.class);
    private final IdService idService = mock(IdService.class);
    private final OrderService orderService = new OrderService(orderRepository, idService);

    @Test
    void getAllOrders_Test() {
        List<Order> allOrders = List.of(
                new Order("1", LocalDateTime.now(), List.of(new Product("1", "Product 1", 1.0, "description1")), 90),
                new Order("2", LocalDateTime.now(), List.of(new Product("2", "Product 2", 1.5, "description2")), 90)
        );

        when(orderRepository.findAll()).thenReturn(allOrders);
        List<Order> actualOrders = orderService.getAllOrders();

        verify(orderRepository).findAll();
        assertEquals(allOrders, actualOrders);
    }

    @Test
    void getAllOrders_WhenEmpty_ReturnsEmptyList() {
        when(orderRepository.findAll()).thenReturn(new ArrayList<>());
        List<Order> actualOrders = orderService.getAllOrders();

        assertTrue(actualOrders.isEmpty());
    }

    @Test
    void addOrderTest_whenNewOrderAsInput_thenReturnNewOrder() {
        LocalDateTime now = LocalDateTime.now();
        List<ProductDto> productDtos = List.of(new ProductDto("Product 1", 1.0, "description1"));
        OrderDto orderDto = new OrderDto(now, productDtos, 1);
        
        List<Product> products = List.of(new Product("1", "Product 1", 1.0, "description1"));
        Order orderToSave = new Order("1", now, products, 1);

        when(idService.randomId()).thenReturn("1");
        when(orderRepository.save(orderToSave)).thenReturn(orderToSave);

        Order actual = orderService.saveOrder(orderDto);

        verify(orderRepository).save(orderToSave);
        assertEquals(orderToSave, actual);
    }

    @Test
    void getOrder_Test_whenOrderExists_thenReturnOrder() {
        LocalDateTime now = LocalDateTime.now();
        Order order = new Order("1", now, List.of(new Product("1", "Product 1", 1.0, "description1")), 90);
        when(orderRepository.findById("1")).thenReturn(Optional.of(order));

        Order actual = orderService.getOrderById("1");

        verify(orderRepository).findById("1");
        assertEquals(order, actual);
    }

    @Test
    void getOrder_Test_whenOrderDoesNotExist_thenThrow() {
        when(orderRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(OrderNotFoundException.class, () -> orderService.getOrderById("1"));
        verify(orderRepository).findById("1");
    }

    @Test
    void deleteOrder_Test_whenOrderExists_thenDeleteOrder() {
        LocalDateTime now = LocalDateTime.now();
        Order order = new Order("1", now, List.of(new Product("1", "Product 1", 1.0, "description1")), 90);

        when(orderRepository.findById("1")).thenReturn(Optional.of(order));
        doNothing().when(orderRepository).deleteById("1");

        orderService.deleteOrder("1");

        verify(orderRepository).deleteById("1");
    }
}