package com.couponManager.coupon.service;

import com.couponManager.coupon.model.Coupon;
import com.couponManager.coupon.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {
    
    private final CouponRepository couponRepository;
    public Coupon createCoupon(Coupon coupon) {

        if (couponRepository.findByCode(coupon.getCode()).isPresent()) {
            throw new RuntimeException("Coupon code already exists: " + coupon.getCode());
        }
        return couponRepository.save(coupon);
    }
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }
    public Optional<Coupon> getCouponById(Long id) {
        return couponRepository.findById(id);
    }
    public Optional<Coupon> getCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }
    public Coupon updateCoupon(Long id, Coupon couponDetails) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found with id: " + id));
        if (!coupon.getCode().equals(couponDetails.getCode())) {
            Optional<Coupon> existingCoupon = couponRepository.findByCode(couponDetails.getCode());
            if (existingCoupon.isPresent()) {
                throw new RuntimeException("Coupon code already exists: " + couponDetails.getCode());
            }
        }
        
        coupon.setCode(couponDetails.getCode());
        coupon.setDescription(couponDetails.getDescription());
        coupon.setStore(couponDetails.getStore());
        coupon.setDiscountPercentage(couponDetails.getDiscountPercentage());
        coupon.setCategory(couponDetails.getCategory());
        coupon.setExpiryDate(couponDetails.getExpiryDate());
        coupon.setIsUsed(couponDetails.getIsUsed());
        coupon.setNotes(couponDetails.getNotes());
        
        return couponRepository.save(coupon);
    }
    public void deleteCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found with id: " + id));
        couponRepository.delete(coupon);
    }
    public Coupon markAsUsed(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found with id: " + id));
        coupon.setIsUsed(true);
        return couponRepository.save(coupon);
    }
    public List<Coupon> getActiveCoupons() {
        return couponRepository.findActiveCoupons(LocalDate.now());
    }
    public List<Coupon> getCouponsByStore(String store) {
        return couponRepository.findByStoreContainingIgnoreCase(store);
    }
    public List<Coupon> getCouponsByCategory(String category) {
        return couponRepository.findByCategoryContainingIgnoreCase(category);
    }
    public List<Coupon> getUsedCoupons() {
        return couponRepository.findByIsUsed(true);
    }
    public List<Coupon> getUnusedCoupons() {
        return couponRepository.findByIsUsed(false);
    }
    public List<Coupon> getExpiredCoupons() {
        return couponRepository.findByExpiryDateBefore(LocalDate.now());
    }
    public List<Coupon> searchCoupons(String searchTerm) {
        return couponRepository.searchCoupons(searchTerm);
    }
    public List<Coupon> getCouponsExpiringSoon() {
        LocalDate today = LocalDate.now();
        LocalDate weekFromNow = today.plusDays(7);
        return couponRepository.findByExpiryDateBetween(today, weekFromNow);
    }
} 