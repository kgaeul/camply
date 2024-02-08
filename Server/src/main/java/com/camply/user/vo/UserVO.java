package com.camply.user.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserVO{
	
	@JsonProperty("USER_ID")
	private Long USER_ID;

	@JsonProperty("USER_EMAIL")
	private String USER_EMAIL;
	
	@JsonProperty("USER_PASSWORD")
	private String USER_PASSWORD;
	
	@JsonProperty("USER_NAME")
	private String USER_NAME;
	
	@JsonProperty("USER_NICKNAME")
	private String USER_NICKNAME;

	@JsonProperty("USER_ADDRESS")
	private String USER_ADDRESS;
	
	@JsonProperty("USER_TYPE")
	private String USER_TYPE;

	@JsonProperty("USER_BUSINESSADDRESS")
	private String USER_BUSINESSADDRESS;
	
	@JsonProperty("USER_BUSINESSNUMBER")
	private String USER_BUSINESSNUMBER;

	@JsonProperty("USER_BUSINESSPHONE")
	private String USER_BUSINESSPHONE;


	
}