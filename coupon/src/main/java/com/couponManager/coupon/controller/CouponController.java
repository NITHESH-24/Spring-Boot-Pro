package com.couponManager.coupon.controller;

import com.couponManager.coupon.model.Coupon;
import com.couponManager.coupon.service.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupons")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;


    @PostMapping
    public ResponseEntity<?> createCoupon(@Valid @RequestBody Coupon coupon) {
        System.out.println("📥 Received coupon from frontend: " + coupon); // Debug log

        try {
            Coupon createdCoupon = couponService.createCoupon(coupon);
            System.out.println("✅ Coupon saved: " + createdCoupon); // Confirm save
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCoupon);
        } catch (RuntimeException e) {
            System.out.println("❌ Error while saving coupon: " + e.getMessage()); // Error log
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        return ResponseEntity.ok(couponService.getAllCoupons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable Long id) {
        return couponService.getCouponById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Coupon> getCouponByCode(@PathVariable String code) {
        return couponService.getCouponByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable Long id, @Valid @RequestBody Coupon couponDetails) {
        try {
            Coupon updatedCoupon = couponService.updateCoupon(id, couponDetails);
            return ResponseEntity.ok(updatedCoupon);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        try {
            couponService.deleteCoupon(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/mark-used")
    public ResponseEntity<Coupon> markAsUsed(@PathVariable Long id) {
        try {
            Coupon updatedCoupon = couponService.markAsUsed(id);
            return ResponseEntity.ok(updatedCoupon);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Coupon>> getActiveCoupons() {
        return ResponseEntity.ok(couponService.getActiveCoupons());
    }

    @GetMapping("/store/{store}")
    public ResponseEntity<List<Coupon>> getCouponsByStore(@PathVariable String store) {
        return ResponseEntity.ok(couponService.getCouponsByStore(store));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Coupon>> getCouponsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(couponService.getCouponsByCategory(category));
    }

    @GetMapping("/used")
    public ResponseEntity<List<Coupon>> getUsedCoupons() {
        return ResponseEntity.ok(couponService.getUsedCoupons());
    }

    @GetMapping("/unused")
    public ResponseEntity<List<Coupon>> getUnusedCoupons() {
        return ResponseEntity.ok(couponService.getUnusedCoupons());
    }

    @GetMapping("/expired")
    public ResponseEntity<List<Coupon>> getExpiredCoupons() {
        return ResponseEntity.ok(couponService.getExpiredCoupons());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Coupon>> searchCoupons(@RequestParam String q) {
        return ResponseEntity.ok(couponService.searchCoupons(q));
    }

    @GetMapping("/expiring-soon")
    public ResponseEntity<List<Coupon>> getCouponsExpiringSoon() {
        return ResponseEntity.ok(couponService.getCouponsExpiringSoon());
    }
}