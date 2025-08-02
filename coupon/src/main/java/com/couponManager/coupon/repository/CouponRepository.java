package com.couponManager.coupon.repository;

import com.couponManager.coupon.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    
    Optional<Coupon> findByCode(String code);
    
    List<Coupon> findByStoreContainingIgnoreCase(String store);
    
    List<Coupon> findByCategoryContainingIgnoreCase(String category);
    
    List<Coupon> findByIsUsed(Boolean isUsed);
    
    List<Coupon> findByExpiryDateBefore(LocalDate date);
    
    List<Coupon> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT c FROM Coupon c WHERE c.expiryDate >= :today AND c.isUsed = false ORDER BY c.expiryDate ASC")
    List<Coupon> findActiveCoupons(@Param("today") LocalDate today);
    
    @Query("SELECT c FROM Coupon c WHERE " +
           "LOWER(c.code) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.store) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.category) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Coupon> searchCoupons(@Param("searchTerm") String searchTerm);
} 