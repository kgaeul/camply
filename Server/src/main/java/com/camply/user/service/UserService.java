package com.camply.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.camply.user.dao.UserDao;
import com.camply.user.vo.UserVO;

@Service
public class UserService {

	@Autowired
	private UserDao userdao;

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public void registerUser(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		userdao.emailRegister(userVO);
	}

	public void registerAdmin(UserVO userVO) {
		userVO.setUSER_PASSWORD(passwordEncoder.encode(userVO.getUSER_PASSWORD()));
		userdao.managerRegister(userVO);
	}

	public UserVO getMemberByUsername(String USER_EMAIL) {
		return userdao.selectEmail(USER_EMAIL);
	}

	public UserVO getUserVOByUsername(String USER_EMAIL) {
		return userdao.selectEmail(USER_EMAIL);
	}

	public Long getUserIdFromUserVO(UserVO userVO) {
		return userVO.getUSER_ID();
	}

	public void deleteUserById(Long USER_ID) {
		userdao.deleteUserById(USER_ID);
	}

	public UserVO getUserById(Long USER_ID) {
		return userdao.selectUserById(USER_ID);
	}

	public void updateUserById(UserVO user) {
		userdao.updateUserById(user);
	}
}
