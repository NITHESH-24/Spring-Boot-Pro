package com.couponManager.coupon.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Code is required")
    @Column(unique = true, nullable = false)
    private String code;

    @NotBlank(message = "Description is required")
    @Column(nullable = false)
    private String description;

    @NotBlank(message = "Store/Website is required")
    @Column(nullable = false)
    private String store;

    @NotNull(message = "Discount percentage is required")
    @Positive(message = "Discount percentage must be positive")
    @Column(nullable = false)
    private Double discountPercentage;

    @Column
    private String category;

    @Column
    private LocalDate expiryDate;

    @Column
    private Boolean isUsed = false;

    @Column
    private String notes;

    @Column(nullable = false)
    private LocalDate createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }


    public Coupon(String code, String description, String store, Double discountPercentage) {
        this.code = code;
        this.description = description;
        this.store = store;
        this.discountPercentage = discountPercentage;
    }


    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", store='" + store + '\'' +
                ", discountPercentage=" + discountPercentage +
                ", category='" + category + '\'' +
                ", expiryDate=" + expiryDate +
                ", isUsed=" + isUsed +
                ", notes='" + notes + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}