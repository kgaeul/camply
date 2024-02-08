package com.camply.camp.dips.controller;

import com.camply.camp.board.vo.BoardVO;
import com.camply.camp.dips.service.DipsService;
import com.camply.user.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/camp/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class DipsController {

    @Autowired
    private DipsService dipsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/add/dips")
    public ResponseEntity<String> addCampDips(@RequestBody BoardVO boardVO) {
        try {
            dipsService.addCampDips(boardVO);
            return ResponseEntity.status(HttpStatus.CREATED).body("찜하기 추가 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    @DeleteMapping("/delete/dips/{camp_id}")
    public ResponseEntity<String> unbookmarkCamp(@PathVariable Long camp_id) {
        dipsService.removeCampDips(camp_id);
        return ResponseEntity.status(HttpStatus.OK).body("찜하기 해제");
    }
}
