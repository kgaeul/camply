package com.camply.camp.reserve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.reserve.service.ReserveService;
import com.camply.camp.reserve.vo.ReserveVO;

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class ReserveController {

	@Autowired
	private ReserveService reserveservice;
	
	@PostMapping("/reserve")
	public ResponseEntity<String> reserveCamp(@RequestBody ReserveVO reserveVO) {
		try {
			reserveservice.insertReserveCamp(reserveVO);
			return ResponseEntity.ok("insert Success");
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("reserve Error: " + e.getMessage());
		}
	}
	
	
}
