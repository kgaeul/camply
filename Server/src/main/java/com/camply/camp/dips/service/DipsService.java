package com.camply.camp.dips.service;

import com.camply.camp.board.vo.BoardVO;
import com.camply.camp.dips.dao.DipsDAO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class DipsService {

    @Autowired
    private DipsDAO dipsDAO;
    public void addCampDips(BoardVO boardVO) {
        dipsDAO.insertCampDips(boardVO);
    }

    public void removeCampDips(Long camp_id) {
        dipsDAO.deleteCampDips(camp_id);
    }
}
