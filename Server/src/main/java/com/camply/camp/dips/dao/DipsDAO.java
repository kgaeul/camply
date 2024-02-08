package com.camply.camp.dips.dao;

import com.camply.camp.board.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DipsDAO {
    void insertCampDips(BoardVO boardVO);
    void deleteCampDips(Long camp_id);
}
